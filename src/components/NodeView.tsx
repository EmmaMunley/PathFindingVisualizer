import * as React from 'react';
import { getNodeCSSClass } from '../utils';
import { Coordinate } from '../interfaces/Grid';
interface Props {
  col: number;
  row: number;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isPath: boolean;
  isWall: boolean;
  // distance: number;
  // previousNode: null;
  transformNode: (coordinate: Coordinate) => void;
}

//must pass in all the props
const NodeView: React.FC<Props> = (props: Props) => {
  const {
    row,
    col,
    transformNode,
    isStart,
    isEnd,
    isPath,
    isVisited,
    isWall,
  } = props;
  const coord = { x: row, y: col };

  return (
    <td
      key={`x:${row},y:${col}`}
      onClick={() => transformNode(coord)}
      className={getNodeCSSClass(isStart, isEnd, isPath, isVisited, isWall)}
    ></td>
  );
};

export default NodeView;
