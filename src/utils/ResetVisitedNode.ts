import { Grid } from '../interfaces/Grid';

// resets visited nodes and path nodes
function resetVisitedNodes(grid: Grid): Grid {
  const nodes = grid.nodes.map(row =>
    row.map(node => ({ ...node, isVisited: false, isPath: false }))
  );

  return {
    nodes,
    columnLength: grid.columnLength,
    rowLength: grid.rowLength,
  };
}

export default resetVisitedNodes;
