import { Grid, Node, Coordinate } from '../interfaces/Grid';

function createGrid(
  ROW: number,
  COL: number,
  startCoord: Coordinate,
  endCoord: Coordinate
): Grid {
  const nodes: Node[][] = [];
  for (let i = 0; i < COL; i++) {
    const row: Node[] = [];
    for (let j = 0; j < ROW; j++) {
      let isStart = false;
      let isEnd = false;
      if (startCoord.x === j && startCoord.y === i) {
        isStart = true;
      }
      if (endCoord.x === j && endCoord.y === i) {
        isEnd = true;
      }
      const node: Node = {
        row: j,
        col: i,
        distance: Infinity,
        isStart,
        isEnd,
        isVisited: false,
        isWall: false,
        isPath: false,
        weight: 1,
        previousNode: undefined,
      };

      row.push(node);
    }
    nodes.push(row);
  }
  return { nodes, columnLength: COL, rowLength: ROW };
}

export default createGrid;
