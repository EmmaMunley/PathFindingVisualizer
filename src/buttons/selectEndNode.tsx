import * as React from 'react';
import { ClickType } from '../enums/ClickType';

interface Props {
  selectClickType: (clickType: ClickType) => void;
}

const SelectEndNode: React.FC<Props> = props => (
  <button onClick={() => props.selectClickType(ClickType.selectEndNode)}>
    Select End Node
  </button>
);

export default SelectEndNode;
