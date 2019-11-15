import { Grid, Coordinate } from './Grid';
export interface SearchAlgo {
  (grid: Grid, startNode: Coordinate, endNode: Coordinate): PathResult;
}

export interface PathResult {
  pathFromNode?: Coordinate[];
  visitedInOrder: Coordinate[];
}
