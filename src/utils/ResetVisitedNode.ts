import { Grid } from '../interfaces/Grid';

// resets visited nodes and path nodes
function resetVisitedNodes(
  grid: Grid,
  resetWalls = false,
  resetWeights = false
): Grid {
  const nodes = grid.nodes.map(row =>
    row.map(node => ({
      ...node,
      isVisited: false,
      isPath: false,
      weight: resetWeights ? 1 : node.weight,
      isWall: node.isWall && !resetWalls,
    }))
  );

  return {
    nodes,
    columnLength: grid.columnLength,
    rowLength: grid.rowLength,
  };
}

export default resetVisitedNodes;
