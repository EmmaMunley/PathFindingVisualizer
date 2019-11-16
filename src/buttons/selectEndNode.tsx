import * as React from 'react';
import { ClickType } from '../enums/ClickType';

interface Props {
  selectClickType: (clickType: ClickType) => void;
  enabled: boolean;
}

const SelectEndNode: React.FC<Props> = props => (
  <button
    disabled={!props.enabled}
    onClick={() => props.selectClickType(ClickType.selectEndNode)}
  >
    Select End Node
  </button>
);

export default SelectEndNode;
