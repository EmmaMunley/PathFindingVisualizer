import { Grid, Node, Coordinate } from '../interfaces/Grid';
import { PathResult, SearchAlgo } from '../interfaces/SearchAlgo';
import isNotEmpty from '../typeguards/notEmpty';
import { copyGrid, getNodeAtCoords } from '../utils/';

export const breadthFirstSearch: SearchAlgo = (
  _grid: Grid,
  start: Coordinate,
  end: Coordinate
): PathResult => {
  const startNode: Node = getNodeAtCoords(start, _grid);
  const endNode: Node = getNodeAtCoords(end, _grid);
  startNode.isStart = true;
  endNode.isEnd = true;

  const grid = copyGrid(_grid);
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
      if (!node.isVisited && !node.isWall) {
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

  return neighbors;
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
