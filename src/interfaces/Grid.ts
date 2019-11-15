export interface Grid {
  nodes: Node[][];
  columnLength: number;
  rowLength: number;
}

export interface Node {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  isWall: boolean;
  isPath: boolean;
  distance: number;
  previousNode?: Node;
}

export interface Coordinate {
  x: number;
  y: number;
}
