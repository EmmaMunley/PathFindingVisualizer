import * as React from 'react';
import { ClickType } from '../enums';

interface Props {
  selectClickType: (clickType: ClickType) => void;
}

const SelectWall: React.FC<Props> = props => (
  <button onClick={() => props.selectClickType(ClickType.selectWall)}>
    Select Wall
  </button>
);

export default SelectWall;
