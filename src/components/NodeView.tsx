import * as React from 'react';
import { getNodeCSSClass } from '../utils';

interface Props {
  col: number;
  row: number;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isPath: boolean;
  // isWall: boolean;
  // distance: number;
  // previousNode: null;
}

//must pass in all the props
const NodeView: React.FC<Props> = (props: Props) => {
  return (
    <td
      key={`x:${props.row},y:${props.col}`}
      className={getNodeCSSClass(
        props.isStart,
        props.isEnd,
        props.isPath,
        props.isVisited
      )}
    ></td>
  );
};

export default NodeView;
