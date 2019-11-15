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

// const nodeClassNames = className(
//   'start-node',
//   'end-node',
//   {
//     'start': this.props.startNode
//     'end': !this.props.showBulkActions
//   }
// );

//must pass in all the props
const NodeView: React.FC<Props> = (props: Props) => {
  // props.col
  return (
    <td
      key={`x:${props.row},y:${props.col}`}
      className={props.isPath ? 'node-shortest-path' : 'node'}
    ></td>
  );
};

export default NodeView;
