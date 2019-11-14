import * as React from 'react';

interface Props {
  col: number;
  row: number;
  isStart?: boolean;
  isFinish?: boolean;
  isVisited?: boolean;
}

//must pass in all the props

const Node: React.FC<Props> = (props: Props) => {
  // props.col
  console.log('Node');
  return <td key={`x:${props.row},y:${props.col}`}>hi</td>;
};

export default Node;
