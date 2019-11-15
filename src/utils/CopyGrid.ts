import { Grid } from '../interfaces/Grid';

function copyGrid(grid: Grid): Grid {
  const nodes = grid.nodes.map(row => row.map(node => ({ ...node })));

  return {
    nodes,
    columnLength: grid.columnLength,
    rowLength: grid.rowLength,
  };
}

export default copyGrid;
