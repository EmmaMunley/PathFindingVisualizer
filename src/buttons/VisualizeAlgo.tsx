import * as React from 'react';

interface Props {
  findPath: () => void;
}

const VisualizeAlgo: React.FC<Props> = props => (
  <button onClick={() => props.findPath()}>Visualize</button>
);

export default VisualizeAlgo;
