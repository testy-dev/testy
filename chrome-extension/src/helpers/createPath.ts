import { Edge } from "@testy/shared";

function createPath(edges: Edge[], path: string[], selected: string): string[] {
  const result: string[] = [selected];
  let actualBlock = selected;

  // Add all single edges before selected
  while (true) {
    const before = edges.filter(([_from, to]) => to === actualBlock);
    if (before.length === 1) {
      actualBlock = before[0][0];
      result.unshift(actualBlock);
    } else {
      break;
    }
  }

  // Add all single edges after selected
  actualBlock = selected;
  while (true) {
    const after = edges.filter(([from, _to]) => from === actualBlock);
    if (after.length === 1) {
      actualBlock = after[0][1];
      result.push(actualBlock);
    } else {
      break;
    }
  }

  // Extend path
  const headIndex = path.indexOf(result[0]);
  if (headIndex !== -1) {
    result.unshift(...path.slice(0, headIndex));
  }

  const tailIndex = path.indexOf(result[result.length - 1]);
  if (tailIndex !== -1) {
    result.push(...path.slice(tailIndex + 1));
  }

  return result;
}

export default createPath;
