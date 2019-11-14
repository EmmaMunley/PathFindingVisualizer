import Node from '../../interfaces/Node';

function dijkstraAlgo(grid: Node, startNode: Node, finishNode: Node): boolean {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  return true;
}

export default dijkstraAlgo;
