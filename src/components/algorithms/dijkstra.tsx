import NodeInterface from '../../interfaces/NodeInterface';

function dijkstraAlgo(
  grid: NodeInterface,
  startNode: NodeInterface,
  finishNode: NodeInterface
): boolean {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  return true;
}

export default dijkstraAlgo;
