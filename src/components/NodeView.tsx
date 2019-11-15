import * as React from 'react';

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

function getClassName(
  isStart: boolean,
  isFinish: boolean,
  isPath: boolean,
  isVisited: boolean
): string {
  if (isStart) {
    return 'start-node';
  } else if (isFinish) {
    return 'end-node';
  } else if (isPath) {
    return 'node-shortest-path';
  } else if (isVisited) {
    return 'visited-node';
  }
  return 'node';
}

//must pass in all the props
const NodeView: React.FC<Props> = (props: Props) => {
  // props.col
  return (
    <td
      key={`x:${props.row},y:${props.col}`}
      className={getClassName(
        props.isStart,
        props.isFinish,
        props.isPath,
        props.isVisited
      )}
    ></td>
  );
};

export default NodeView;
