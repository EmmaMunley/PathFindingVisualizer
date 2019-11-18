import * as React from 'react';

interface Props {
  findPath: () => void;
}

const VisualizeAlgo: React.FC<Props> = props => (
  <button id="rainbow" onClick={() => props.findPath()}>
    Visualize
  </button>
);

export default VisualizeAlgo;
