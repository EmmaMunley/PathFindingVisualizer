import { Grid, Node, Coordinate } from '../interfaces/Grid';
import { PathResult, SearchAlgo } from '../interfaces/SearchAlgo';
import isNotEmpty from '../typeguards/notEmpty';
import {
  copyGrid,
  getNodeAtCoords,
  compareNodes,
  getNeighbors,
} from '../utils/';

export const dijkstra: SearchAlgo = (
  _grid: Grid,
  start: Coordinate,
  end: Coordinate
): PathResult => {
  const grid = copyGrid(_grid);
  const startNode: Node = getNodeAtCoords(start, grid);
  const endNode: Node = getNodeAtCoords(end, grid);
  startNode.isStart = true;
  endNode.isEnd = true;
  startNode.distance = 0;

  const visitedInOrder: Coordinate[] = [];
  const unvisitedNodes: Node[] = grid.nodes.flat(2);

  while (isNotEmpty(unvisitedNodes)) {
    unvisitedNodes.sort(compareNodes);
    const currentNode: Node = unvisitedNodes.shift();
    if (currentNode.isWall) {
      continue;
    }
    if (currentNode.isVisited) {
      continue;
    }

    if (currentNode.distance === Infinity) {
      return { visitedInOrder };
    }
    currentNode.isVisited = true;
    visitedInOrder.push({ x: currentNode.row, y: currentNode.col });

    if (currentNode === endNode) {
      const pathFromNode = getPathFromNode(endNode);
      return { pathFromNode, visitedInOrder };
    }
    updateUnvisitedNeighbors(grid, currentNode);
  }
  //no path was found
  return { visitedInOrder };
};

// called once you successfully find endNode node
function getPathFromNode(endNode: Node): Coordinate[] {
  const path: Coordinate[] = [];
  let currentNode: Node | undefined = endNode;

  while (currentNode !== undefined) {
    path.unshift({ x: currentNode.row, y: currentNode.col });
    currentNode = currentNode.previousNode;
  }
  return path;
}

function updateUnvisitedNeighbors(grid: Grid, currentNode: Node): void {
  const neighbors = getNeighbors(grid, currentNode);

  neighbors.forEach(node => {
    if (!node.isWall) {
      const hasPrev = node.previousNode;
      const currentDistIsShorter =
        node.previousNode && node.previousNode.distance > currentNode.distance;
      if (!hasPrev || currentDistIsShorter) {
        node.previousNode = currentNode;
        node.distance = currentNode.distance + node.weight;
      }
    }
  });
}
