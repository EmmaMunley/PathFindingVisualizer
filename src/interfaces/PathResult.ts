import Coordinate from './Coordinate';

export default interface PathResult {
  pathFromNode?: Coordinate[];
  visitedInOrder: Coordinate[];
}
