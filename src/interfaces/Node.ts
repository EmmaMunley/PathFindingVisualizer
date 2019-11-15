export default interface Node {
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
