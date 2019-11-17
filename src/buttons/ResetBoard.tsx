import * as React from 'react';

interface Props {
  reset: () => void;
  disabled: boolean;
}

// Clears everything except start and finish node
const ResetBoard: React.FC<Props> = props => (
  <button onClick={() => props.reset()} disabled={props.disabled}>
    Reset
  </button>
);

export default ResetBoard;
