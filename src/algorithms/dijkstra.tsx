import { Grid, Node, Coordinate } from '../interfaces/Grid';
import { PathResult, SearchAlgo } from '../interfaces/SearchAlgo';
import isNotEmpty from '../typeguards/notEmpty';
import { copyGrid, getNodeAtCoords, compareNodes } from '../utils/';

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

    if (currentNode.distance === Infinity) {
      return { visitedInOrder };
    }
    currentNode.isVisited = true;
    visitedInOrder.push({ x: currentNode.row, y: currentNode.col });

    if (currentNode === endNode) {
      console.log('endNode', endNode);
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
  console.log('path', path);
  let currentNode: Node | undefined = endNode;
  while (currentNode !== undefined) {
    console.log('currentcoords', { x: currentNode.row, y: currentNode.col });

    path.push({ x: currentNode.row, y: currentNode.col });
    currentNode = currentNode.previousNode;
  }
  console.log('pathend', path);
  return path;
}

function getNeighbors(grid: Grid, currentNode: Node): Node[] {
  const neighbors: Node[] = [];
  const nodes = grid.nodes;
  const x = currentNode.row;
  const y = currentNode.col;
  const maxX = grid.rowLength - 1;
  const maxY = grid.columnLength - 1;
  const neighborCoords: { x: number; y: number }[] = [
    { x: x - 1, y }, //left
    { x: x + 1, y }, //right
    { x, y: y - 1 }, //up
    { x, y: y + 1 }, //down
  ];

  neighborCoords.forEach(coord => {
    if (isInBounds(coord.x, coord.y, maxX, maxY)) {
      const node = nodes[coord.y][coord.x];
      neighbors.push(node);
    }
  });

  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function updateUnvisitedNeighbors(grid: Grid, currentNode: Node): void {
  const neighbors = getNeighbors(grid, currentNode);
  console.log('currentNode', currentNode);
  console.log('neighbors', neighbors);
  neighbors.forEach(node => {
    if (!node.isWall) {
      const hasPrev = node.previousNode;
      const currentDistIsShorter =
        node.previousNode && node.previousNode.distance > currentNode.distance;
      if (!hasPrev || currentDistIsShorter) {
        node.previousNode = currentNode;
      }
    }
    node.distance = currentNode.distance + node.weight;
  });
  console.log('currentNode 2', currentNode);
  console.log('neighbors2', neighbors);
}

function isInBounds(
  x: number,
  y: number,
  maxX: number,
  maxY: number,
  minX = 0,
  minY = 0
): boolean {
  return x >= minX && x <= maxX && y >= minY && y <= maxY;
}
