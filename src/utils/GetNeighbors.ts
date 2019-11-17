import { Grid, Node } from '../interfaces/Grid';
import { isInBounds } from './IsInBounds';

export function getNeighbors(grid: Grid, currentNode: Node): Node[] {
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
