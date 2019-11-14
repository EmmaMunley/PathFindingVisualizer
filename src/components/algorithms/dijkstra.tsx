import { Node } from '../../interfaces/index';
import { Grid } from '../types';

function dijkstraAlgo(grid: Grid, startNode: Node, finishNode: Node): boolean {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  return true;
}

export default dijkstraAlgo;
