import { Block, Edge, RecState, UUID } from "../types";

export function read(
  keys: string | string[] | Record<string, any> | null
): Promise<Record<string, any>> {
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
export function write(items: Record<string, any>): Promise<void> {
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

export async function setStatus(status: RecState) {
  await write({ status });
}

/**
 * Resets application to original state.
 */
export async function reset() {
  await write({ status: "off", blocks: [], edges: [], active: null });
}

/**
 * Adds a codeblock to the array of code blocks and updates Chrome local storage.
 * @param newBlock
 */
export async function pushBlock(newBlock: Block): Promise<Block> {
  const { active, blocks, edges } = (await read([
    "active",
    "blocks",
    "edges",
  ])) as { active: UUID | null; blocks: Block[]; edges: Edge[] };

  let last: Block | undefined;

  if (active) {
    last = blocks.find(b => b.id === active);

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
    const edgesToLast = edges.filter(e => e[1] === active);
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
  await write({ blocks, edges, active: newBlock.id });
  console.debug("Write to storage: ", { blocks, edges, active: newBlock.id });

  return newBlock;
}
