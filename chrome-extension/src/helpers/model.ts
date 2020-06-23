import { Block, Edge, RecState, UUID } from "@testy/shared";
import { Data } from "@testy/chrome-ext/helpers/useLocalStorage";

export interface StorageValues {
  projectName?: string;
  status?: RecState;
  activeBlock?: UUID | null;
  blocks?: Block[];
  edges?: Edge[];
}

export function read(
  keys: string | string[] | Record<string, any> | null
): Promise<StorageValues> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, result => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else {
        resolve(result);
      }
    });
  });
}

/**
 * Promise to write to storage.local
 * @param items
 */
export function write(items: StorageValues): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(items, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve();
    });
  });
}

export async function getStatus() {
  return (await read("status"))?.status as RecState;
}

export const setStatus = async (status: RecState) => write({ status });

/** Resets application to original state. */
export async function reset() {
  await write({ status: "off", blocks: [], edges: [], activeBlock: null });
}

/**
 * Adds a codeblock to the array of code blocks and updates Chrome local storage.
 * @param newBlock
 */
export async function pushBlock(newBlock: Block): Promise<Block> {
  const { activeBlock = null, blocks = [], edges = [] } = (await read([
    "activeBlock",
    "blocks",
    "edges",
  ])) as Omit<Data, "status">;

  let last: Block | undefined;

  if (activeBlock) {
    last = blocks.find(b => b.id === activeBlock);

    // If last and actual block is type to same element => add type value to previous block
    if (
      last &&
      last.command === "type" &&
      newBlock.command === "type" &&
      last.selector === newBlock.selector
    ) {
      last.parameter += newBlock.parameter || "";

      await write({ blocks });
      return last;
    }

    // If last block is click and actual is type to same element => remove click and add type
    const edgesToLast = edges.filter(e => e[1] === activeBlock);
    if (
      last &&
      last.command === "click" &&
      newBlock.command === "type" &&
      last.selector === newBlock.selector &&
      edgesToLast.length === 1
    ) {
      blocks.splice(blocks.indexOf(last), 1); // Remove last block
      edges.splice(edges.indexOf(edgesToLast[0]), 1); // Remove edge to this block

      const lastID = edgesToLast[0][0];
      last = blocks.find(b => b.id === lastID);
    }
  }

  // Else add block
  blocks.push(newBlock);
  if (last) edges.push([last.id, newBlock.id]);
  await write({ blocks, edges, activeBlock: newBlock.id } as StorageValues);
  console.debug("Write to storage: ", {
    blocks,
    edges,
    activeBlock: newBlock.id,
  });

  return newBlock;
}

export async function deleteBlock(blockID: UUID) {
  const { active = null, blocks = [], edges = [] } = (await read([
    "active",
    "blocks",
    "edges",
  ])) as { active: UUID | null; blocks: Block[]; edges: Edge[] };

  const incomingEdges = edges.filter(([, target]) => target === blockID);
  const outgoingEdges = edges.filter(([source]) => source === blockID);

  if (incomingEdges.length === 1 && outgoingEdges.length === 1) {
    edges.push([incomingEdges[0][0], outgoingEdges[0][1]]);
  }

  await write({
    activeBlock: active === blockID ? null : active,
    blocks: blocks.filter(({ id }) => id !== blockID),
    edges: edges.filter(([i, o]) => i !== blockID && o !== blockID),
  } as StorageValues);
}

export async function createEdge(from: UUID, to: UUID) {
  const { blocks = [], edges = [] } = (await read(["blocks", "edges"])) as {
    blocks: Block[];
    edges: Edge[];
  };

  if (
    blocks.find(b => b.id === from) &&
    blocks.find(b => b.id === to) &&
    !edges.find(([i, o]) => i === from && o === to)
  ) {
    edges.push([from, to]);
    await write({ edges });
    return true;
  } else {
    return false;
  }
}
