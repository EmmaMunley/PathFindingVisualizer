import * as React from 'react';
import { GetNodeClassName } from '../utils/GetNodeClassName';

interface Props {
  col: number;
  row: number;
  isVisited: boolean;
  isStart: boolean;
  isFinish: boolean;
  isPath: boolean;
  // isWall: boolean;
  // distance: number;
  // previousNode: null;
}

//must pass in all the props
const NodeView: React.FC<Props> = (props: Props) => {
  // props.col
  return (
    <td
      key={`x:${props.row},y:${props.col}`}
      className={GetNodeClassName(
        props.isStart,
        props.isFinish,
        props.isPath,
        props.isVisited
      )}
    ></td>
  );
};

export default NodeView;
