import { Node } from '../interfaces/Grid';

function compareNodes(nodeA: Node, nodeB: Node): number {
  return nodeA.distance - nodeB.distance;
}

export default compareNodes;
