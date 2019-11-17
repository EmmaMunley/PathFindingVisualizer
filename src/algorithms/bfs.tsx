import { Grid, Node, Coordinate } from '../interfaces/Grid';
import { PathResult, SearchAlgo } from '../interfaces/SearchAlgo';
import isNotEmpty from '../typeguards/notEmpty';
import { copyGrid, getNodeAtCoords, getNeighbors } from '../utils/';

export const breadthFirstSearch: SearchAlgo = (
  _grid: Grid,
  start: Coordinate,
  end: Coordinate
): PathResult => {
  const grid = copyGrid(_grid);
  const startNode: Node = getNodeAtCoords(start, grid);
  const endNode: Node = getNodeAtCoords(end, grid);
  startNode.isStart = true;
  endNode.isEnd = true;

  const visitedInOrder: Coordinate[] = [];
  const queue = [startNode];

  while (isNotEmpty(queue)) {
    const currentNode: Node = queue.shift();
    if (currentNode.isVisited) {
      continue;
    }
    if (currentNode.isWall) {
      continue;
    } else {
      currentNode.isVisited = true;
      visitedInOrder.push({ x: currentNode.row, y: currentNode.col });
    }
    if (currentNode.col === endNode.col && currentNode.row === endNode.row) {
      return {
        pathFromNode: getPathFromNode(currentNode),
        visitedInOrder,
      };
    }
    const neighbors = getNeighbors(grid, currentNode);
    neighbors.forEach(node => {
      if (!node.isWall) {
        node.previousNode = currentNode;
        queue.push(node);
      }
    });
  }
  //no path was found
  return { visitedInOrder };
};

// called once you successfully find endNode node
function getPathFromNode(node: Node): Coordinate[] {
  const path: Coordinate[] = [{ x: node.row, y: node.col }];

  while (node.previousNode !== undefined && !node.isWall) {
    node = node.previousNode!;
    path.unshift({ x: node.row, y: node.col });
  }
  return path;
}
