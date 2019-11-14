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

  return <td key={`x:${props.row},y:${props.col}`}>''</td>;
};

export default Node;
