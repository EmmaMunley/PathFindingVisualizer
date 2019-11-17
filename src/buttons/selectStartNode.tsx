import * as React from 'react';
import { ClickType } from '../enums';

interface Props {
  selectClickType: (clickType: ClickType) => void;
}

const SelectStartNode: React.FC<Props> = props => (
  <button onClick={() => props.selectClickType(ClickType.selectStartNode)}>
    Select Start Node
  </button>
);

export default SelectStartNode;
