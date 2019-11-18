import * as React from 'react';
import { ClickType } from '../enums';

interface Props {
  selectClickType: (clickType: ClickType) => void;
  currentClickType?: ClickType;
}
const CLICK_TYPE = ClickType.selectStartNode;

const SelectStartNode: React.FC<Props> = props => (
  <button
    onClick={() => props.selectClickType(CLICK_TYPE)}
    className={props.currentClickType === CLICK_TYPE ? 'btn-selected' : ''}
  >
    Select Start
  </button>
);

export default SelectStartNode;
