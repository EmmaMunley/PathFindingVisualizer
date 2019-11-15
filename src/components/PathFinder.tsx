import * as React from 'react';
import { Grid, Coordinate } from '../interfaces/Grid';
import { PathResult, SearchAlgo } from '../interfaces/SearchAlgo';
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
const ROW = 25;
const COL = 25;
const SEARCH_STEP_INTERVAL = 50;
const TRACE_STEP_INTERVAL = 50;
const START_COORD = { x: 3, y: 8 };
const TARGET_COORD = { x: 9, y: 1 };

class PathFinder extends React.Component<Props, State> {
  state: State = {
    grid: CreateGrid(ROW, COL),
    startCoord: START_COORD,
    endCoord: TARGET_COORD,
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
    const result = selectedAlgo(grid, START_COORD, TARGET_COORD);
    this.markVisited(grid, result);
  }

  markVisited(grid: Grid, result: PathResult) {
    let stepCounter = 0;
    result.visitedInOrder.forEach((coord, i) => {
      stepCounter++;
      this.animate('isVisited', coord, stepCounter, SEARCH_STEP_INTERVAL);
    });

    const foundNode: Coordinate[] | undefined = result.pathFromNode;
    if (foundNode) {
      this.foundPath(foundNode, stepCounter, TRACE_STEP_INTERVAL);
    }
  }

  foundPath(foundNode: Coordinate[], stepCounter: number, interval: number) {
    for (let i = 0; i < foundNode.length; i++) {
      stepCounter++;
      const coord = foundNode[i];
      this.animate('isPath', coord, stepCounter, TRACE_STEP_INTERVAL);
    }
  }
  render() {
    const { grid } = this.state;
    this.findPath();
    return <GridView nodes={grid.nodes} />;
  }
}
export default PathFinder;
