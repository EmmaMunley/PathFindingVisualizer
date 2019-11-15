import Grid from '../interfaces/Grid';
import Node from '../interfaces/Node';
import Coordinate from '../interfaces/Coordinate';
import PathResult from '../interfaces/PathResult';
import SearchAlgo from '../interfaces/SearchAlgo';
import isNotEmpty from '../typeguards/notEmpty';

export function copyGrid(grid: Grid): Grid {
  const nodes = grid.nodes.map(row => row.map(node => ({ ...node })));

  return {
    nodes,
    columnLength: grid.columnLength,
    rowLength: grid.rowLength,
  };
}

export const breadthFirstSearch: SearchAlgo = (
  _grid: Grid,
  startNode: Node,
  target: Node
): PathResult => {
  startNode.isStart = true;
  target.isFinish = true;
  const grid = copyGrid(_grid);
  const visitedInOrder: Coordinate[] = [];
  const queue = [startNode];

  while (isNotEmpty(queue)) {
    const currentNode: Node = queue.shift();
    if (currentNode.isVisited) {
      continue;
    }
    currentNode.isVisited = true;
    visitedInOrder.push({ x: currentNode.row, y: currentNode.col });

    if (currentNode.col === target.col && currentNode.row === target.row) {
      return {
        pathFromNode: getPathFromNode(currentNode),
        visitedInOrder,
      };
    }
    const neighbors = getNeighbors(grid, currentNode);
    neighbors.forEach(node => {
      if (!node.isVisited) {
        node.previousNode = currentNode;
        queue.push(node);
      }
    });
  }
  //no path was found
  return { visitedInOrder };
};

// called once you successfully find target node
function getPathFromNode(node: Node): Coordinate[] {
  const path: Coordinate[] = [{ x: node.row, y: node.col }];

  while (node.previousNode !== undefined) {
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
