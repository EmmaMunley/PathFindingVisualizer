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

  nodes[2][0].isWall = true;
  nodes[3][0].isWall = true;
  nodes[4][0].isWall = true;
  nodes[5][0].isWall = true;
  nodes[6][0].isWall = true;
  nodes[7][0].isWall = true;

  nodes[0][2].isWall = true;
  nodes[1][2].isWall = true;
  nodes[1][3].isWall = true;
  nodes[1][4].isWall = true;
  nodes[1][5].isWall = true;
  nodes[1][6].isWall = true;
  nodes[1][7].isWall = true;
  nodes[2][7].isWall = true;
  nodes[3][7].isWall = true;
  nodes[4][7].isWall = true;
  nodes[5][7].isWall = true;

  nodes[6][2].weight = 2;
  nodes[6][3].weight = 2;
  nodes[6][4].weight = 2;
  nodes[6][5].weight = 2;
  nodes[6][6].weight = 2;
  nodes[6][7].weight = 2;
  nodes[6][8].weight = 2;
  nodes[6][9].weight = 2;

  nodes[2][2].weight = 2;
  nodes[2][3].weight = 2;
  nodes[2][4].weight = 2;
  nodes[2][5].weight = 2;
  nodes[2][6].weight = 2;
  nodes[2][7].weight = 2;
  nodes[9][1].weight = 2;
  nodes[8][1].weight = 2;
  nodes[7][1].weight = 2;
  nodes[6][1].weight = 2;

  nodes[6][10].isWall = true;
  nodes[7][10].isWall = true;
  nodes[8][10].isWall = true;
  nodes[9][10].isWall = true;
  nodes[10][1].weight = 2;
  nodes[10][2].weight = 2;
  nodes[10][3].weight = 2;
  nodes[10][4].weight = 2;
  nodes[10][5].weight = 2;
  nodes[10][6].weight = 2;
  nodes[10][7].weight = 2;
  nodes[10][8].weight = 2;
  nodes[10][9].weight = 2;

  return { nodes, columnLength: COL, rowLength: ROW };
}

export default createGrid;
