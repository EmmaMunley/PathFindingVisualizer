import * as React from 'react';
import { ClickType } from '../enums';

interface Props {
  selectClickType: (clickType: ClickType) => void;
  enabled: boolean;
}

const SelectStartNode: React.FC<Props> = props => (
  <button
    disabled={!props.enabled}
    onClick={() => props.selectClickType(ClickType.selectStartNode)}
  >
    Select Start Node
  </button>
);

export default SelectStartNode;
