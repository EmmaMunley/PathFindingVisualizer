import Grid from './Grid';
import PathResult from './PathResult';
import Node from './Node';

export default interface SearchAlgo {
  (grid: Grid, startNode: Node, endNode: Node): PathResult;
}
