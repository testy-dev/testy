import { Block, Edge, UUID } from "./types";

function getPaths(edges: Edge[]): UUID[][] {
  const paths: UUID[][] = [];

  const startingEdges = edges.filter(
    ([from]) => !edges.find(([, to]) => to === from)
  );

  function generatePath(currentPath: UUID[]): void {
    const lastEdge = currentPath[currentPath.length - 1];
    const next = edges.filter(([from]) => from === lastEdge);
    if (!next.length) {
      paths.push(currentPath);
    } else {
      next.forEach(edge => {
        generatePath([...currentPath, edge[1]]);
      });
    }
  }

  startingEdges.forEach(edge => generatePath([edge[0], edge[1]]));

  return paths;
}

export default getPaths;
