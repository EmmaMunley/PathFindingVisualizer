import { Grid, Node, Coordinate } from '../interfaces/Grid';

function getNodeAtCoords(coord: Coordinate, grid: Grid): Node {
  return grid.nodes[coord.y][coord.x];
}

export default getNodeAtCoords;
