import * as React from 'react';
import config from '../config/default';
import { Grid, Coordinate, Node } from '../interfaces/Grid';
import { SearchAlgo } from '../interfaces/SearchAlgo';
import GridView from './GridView';
import { breadthFirstSearch } from '../algorithms/bfs';
import { copyGrid, createGrid, getNodeAtCoords } from '../utils';
import {
  SelectStartNode,
  SelectEndNode,
  SelectWall,
  SelectWeight,
  VisualizeAlgo,
  ResetBoard,
} from '../buttons';
import { ClickType } from '../enums';
import resetVisitedNodes from '../utils/ResetVisitedNode';
import { dijkstra } from '../algorithms/dijkstra';

interface Props {}

interface State {
  grid: Grid;
  startCoord: Coordinate;
  endCoord: Coordinate;
  algos: Record<string, SearchAlgo>; //obj
  selectedAlgo: SearchAlgo;
  clickType?: ClickType;
  isRunning: boolean;
}

const { rows, cols, startCoord, endCoord } = config.grid;
const searchInterval: number = config.stepIntervals.search;
const traceInterval: number = config.stepIntervals.trace;

class PathFinder extends React.Component<Props, State> {
  state: State = {
    grid: createGrid(rows, cols, startCoord, endCoord),
    startCoord: startCoord,
    endCoord: endCoord,
    algos: {
      bfs: breadthFirstSearch,
    },
    clickType: undefined,
    selectedAlgo: dijkstra,
    isRunning: false,
  };

  constructor(props: Props) {
    super(props);
    this.selectClickType = this.selectClickType.bind(this);
    this.transformNode = this.transformNode.bind(this);
    this.findPath = this.findPath.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
  }

  transformNode(coord: Coordinate): void {
    if (this.state.isRunning) {
      return;
    }
    const clickType = this.state.clickType;
    const grid = resetVisitedNodes(this.state.grid);
    const clickedNode: Node = getNodeAtCoords(coord, grid);
    if (clickType === ClickType.selectStartNode) {
      if (clickedNode.isWall) {
        return;
      }
      const oldStartNode = getNodeAtCoords(this.state.startCoord, grid);
      oldStartNode.isStart = false;
      clickedNode.isStart = true;
      this.setState({ startCoord: coord, grid });
    } else if (clickType === ClickType.selectEndNode) {
      if (clickedNode.isWall) {
        return;
      }
      const oldEndNode = getNodeAtCoords(this.state.endCoord, grid);
      oldEndNode.isEnd = false;
      clickedNode.isEnd = true;
      this.setState({ endCoord: coord, grid });
    } else if (clickType === ClickType.selectWall) {
      if (clickedNode.isStart || clickedNode.isEnd) {
        return;
      }
      clickedNode.isWall = !clickedNode.isWall;
      this.setState({ grid });
    } else if (clickType === ClickType.selectWeight) {
      if (clickedNode.isStart || clickedNode.isEnd || clickedNode.isWall) {
        return;
      }
      clickedNode.weight === 1
        ? (clickedNode.weight = 2)
        : (clickedNode.weight = 1);
      this.setState({ grid });
    }
  }

  selectClickType(clickType: ClickType): void {
    this.setState({ clickType });
  }

  animate(
    property: string,
    coord: Coordinate,
    stepCounter: number,
    interval: number
  ): void {
    setTimeout(() => {
      const { grid } = this.state;
      const newGrid = copyGrid(grid);
      const node = getNodeAtCoords(coord, newGrid);
      if (property === 'isVisited') {
        node.isVisited = true;
      } else if (property === 'isPath') {
        node.isPath = true;
      }
      this.setState({ grid: newGrid });
    }, interval * stepCounter);
  }

  findPath(): void {
    const { selectedAlgo, startCoord, endCoord, isRunning } = this.state;
    if (isRunning) {
      return;
    }
    this.setState({ isRunning: true });
    const newGrid = this.resetGrid(false);
    const result = selectedAlgo(newGrid, startCoord, endCoord);
    console.log('result', result);
    const stepCounter = this.markVisited(
      result.visitedInOrder,
      !!result.pathFromNode
    );
    if (result.pathFromNode && stepCounter) {
      this.markPath(result.pathFromNode, stepCounter);
    } else {
      alert('no path was found');
    }
  }

  markVisited(visited: Coordinate[], pathExists: boolean): number | undefined {
    let stepCounter = 0;
    visited.forEach((coord, i) => {
      stepCounter++;
      this.animate('isVisited', coord, stepCounter, searchInterval);
    });
    if (!pathExists) {
      setTimeout(() => {
        this.setState({ isRunning: false });
      }, searchInterval * stepCounter);
      return;
    }
    return stepCounter;
  }

  markPath(foundNode: Coordinate[], stepCounter: number): void {
    for (let i = 0; i < foundNode.length; i++) {
      stepCounter++;
      const coord = foundNode[i];
      this.animate('isPath', coord, stepCounter, traceInterval);
    }
    setTimeout(() => {
      this.setState({ isRunning: false });
    }, traceInterval * stepCounter);
  }

  resetGrid(resetWalls = false, resetWeights = false): Grid {
    const grid = resetVisitedNodes(this.state.grid, resetWalls, resetWeights);
    this.setState({ grid });
    return grid;
  }

  render() {
    const { grid } = this.state;
    return (
      <div className="buttons">
        <SelectStartNode selectClickType={this.selectClickType} />
        <SelectEndNode selectClickType={this.selectClickType} />
        <SelectWall selectClickType={this.selectClickType} />
        <SelectWeight selectClickType={this.selectClickType} />
        <VisualizeAlgo findPath={this.findPath} />
        <ResetBoard
          reset={() => this.resetGrid(true, true)}
          disabled={this.state.isRunning}
        />
        <GridView nodes={grid.nodes} transformNode={this.transformNode} />
      </div>
    );
  }
}
export default PathFinder;
