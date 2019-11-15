import * as React from 'react';
import config from '../config/default';
import { Grid, Coordinate } from '../interfaces/Grid';
import { SearchAlgo } from '../interfaces/SearchAlgo';
import GridView from './GridView';
import { breadthFirstSearch } from '../algorithms/bfs';
import { CopyGrid, CreateGrid, GetNodesAtCoords } from '../utils';

interface Props {}

interface State {
  grid: Grid;
  startCoord: Coordinate;
  endCoord: Coordinate;
  algos: Record<string, SearchAlgo>; //obj
  selectedAlgo: SearchAlgo;
}
const { rows, cols, startCoord, targetCoord } = config.grid;
const searchInterval: number = config.stepIntervals.search;
const traceInterval: number = config.stepIntervals.trace;

class PathFinder extends React.Component<Props, State> {
  state: State = {
    grid: CreateGrid(rows, cols),
    startCoord: startCoord,
    endCoord: targetCoord,
    algos: {
      bfs: breadthFirstSearch,
    },
    selectedAlgo: breadthFirstSearch,
  };

  animate(
    property: string,
    coord: Coordinate,
    stepCounter: number,
    interval: number
  ) {
    setTimeout(() => {
      const { grid } = this.state;
      const newGrid = CopyGrid(grid);
      const node = GetNodesAtCoords(coord, newGrid);
      if (property === 'isVisited') {
        node.isVisited = true;
      } else if (property === 'isPath') {
        node.isPath = true;
      }
      this.setState({ grid: newGrid });
    }, interval * stepCounter);
  }

  findPath() {
    const { grid, selectedAlgo, startCoord, endCoord } = this.state;
    const result = selectedAlgo(grid, startCoord, endCoord);
    const stepCounter = this.markVisited(result.visitedInOrder);
    if (result.pathFromNode) {
      this.markPath(result.pathFromNode, stepCounter, traceInterval);
    }
  }

  markVisited(visited: Coordinate[]): number {
    let stepCounter = 0;
    visited.forEach((coord, i) => {
      stepCounter++;
      this.animate('isVisited', coord, stepCounter, searchInterval);
    });
    return stepCounter;
  }

  markPath(foundNode: Coordinate[], stepCounter: number, interval: number) {
    for (let i = 0; i < foundNode.length; i++) {
      stepCounter++;
      const coord = foundNode[i];
      this.animate('isPath', coord, stepCounter, traceInterval);
    }
  }
  render() {
    const { grid } = this.state;
    this.findPath();
    return <GridView nodes={grid.nodes} />;
  }
}
export default PathFinder;
