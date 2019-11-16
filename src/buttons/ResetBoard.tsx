import * as React from 'react';

interface Props {
  reset: () => void;
  enabled: boolean;
}

// Clears everything except start and finish node
const ResetBoard: React.FC<Props> = props => (
  <button onClick={() => props.reset()} disabled={!props.enabled}>
    Reset
  </button>
);

export default ResetBoard;
