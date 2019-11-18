import { breadthFirstSearch } from '../algorithms';
import { dijkstra } from '../algorithms/dijkstra';
import { SearchAlgo } from '../interfaces/SearchAlgo';

export enum AlgoType {
  bfs = 'Breadth First Search',
  dijkstra = "Dijkstra's",
}

const algorithms: Record<AlgoType, SearchAlgo> = {
  [AlgoType.bfs]: breadthFirstSearch,
  [AlgoType.dijkstra]: dijkstra,
};

export function getAlgo(type: AlgoType): SearchAlgo | undefined {
  return algorithms[type];
}
