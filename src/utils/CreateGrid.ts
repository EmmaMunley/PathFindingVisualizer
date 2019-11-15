import { Grid, Node } from '../interfaces/Grid';

function createGrid(ROW: number, COL: number): Grid {
  const nodes: Node[][] = [];
  for (let i = 0; i < COL; i++) {
    const row: Node[] = [];
    for (let j = 0; j < ROW; j++) {
      const node: Node = {
        row: j,
        col: i,
        distance: Infinity,
        isFinish: false,
        isStart: false,
        isVisited: false,
        isWall: false,
        isPath: false,
      };
      row.push(node);
    }
    nodes.push(row);
  }
  return { nodes, columnLength: COL, rowLength: ROW };
}

export default createGrid;
