import * as React from 'react';
import { ClickType } from '../enums';

interface Props {
  selectClickType: (clickType: ClickType) => void;
  currentClickType?: ClickType;
}

const CLICK_TYPE = ClickType.selectWall;

const SelectWall: React.FC<Props> = props => (
  <button
    onClick={() => props.selectClickType(CLICK_TYPE)}
    className={props.currentClickType === CLICK_TYPE ? 'btn-selected' : ''}
  >
    Select Wall
  </button>
);

export default SelectWall;
