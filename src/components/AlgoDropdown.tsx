import * as React from 'react';
import { getNodeCSSClass } from '../utils';
import { AlgoType } from '../enums/AlgoType';
import { SearchAlgo } from '../interfaces/SearchAlgo';

interface Props {
  selectedAlgo: AlgoType;
  selectAlgo: (algoType: AlgoType) => void;
}

//must pass in all the props
const AlgoDropdown: React.FC<Props> = (props: Props) => {
  const { selectedAlgo, selectAlgo } = props;

  return (
    <select
      name="breadth first search"
      value={props.selectedAlgo}
      // todo: find better event typing
      onChange={event => props.selectAlgo(event.target.value as AlgoType)}
    >
      <option value={AlgoType.bfs}>Breadth First Search</option>
      <option value={AlgoType.dijkstra}>Dijkstra</option>
    </select>
  );
};

export default AlgoDropdown;
