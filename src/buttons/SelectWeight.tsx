import * as React from 'react';
import { ClickType } from '../enums';

interface Props {
  selectClickType: (clickType: ClickType) => void;
}

const SelectWeight: React.FC<Props> = props => (
  <button onClick={() => props.selectClickType(ClickType.selectWeight)}>
    Select Weight
  </button>
);

export default SelectWeight;
