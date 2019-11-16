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
  VisualizeAlgo,
  ResetBoard,
} from '../buttons';
import { ClickType } from '../enums';
import resetVisitedNodes from '../utils/ResetVisitedNode';

interface Props {}

interface State {
  grid: Grid;
  startCoord: Coordinate;
  endCoord: Coordinate;
  algos: Record<string, SearchAlgo>; //obj
  selectedAlgo: SearchAlgo;
  clickType?: ClickType;
  hasRun: boolean;
  canReset: boolean;
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
    selectedAlgo: breadthFirstSearch,
    hasRun: false,
    canReset: true,
  };

  constructor(props: Props) {
    super(props);
    this.selectClickType = this.selectClickType.bind(this);
    this.transformNode = this.transformNode.bind(this);
    this.findPath = this.findPath.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
  }

  transformNode(coord: Coordinate): void {
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
      this.setState({ startCoord: coord, grid, hasRun: false });
    } else if (clickType === ClickType.selectEndNode) {
      if (clickedNode.isWall) {
        return;
      }
      const oldEndNode = getNodeAtCoords(this.state.endCoord, grid);
      oldEndNode.isEnd = false;
      clickedNode.isEnd = true;
      this.setState({ endCoord: coord, grid, hasRun: false });
    } else if (clickType === ClickType.selectWall) {
      if (clickedNode.isStart || clickedNode.isEnd) {
        return;
      }
      clickedNode.isWall = !clickedNode.isWall;
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
    const { grid, selectedAlgo, startCoord, endCoord, hasRun } = this.state;
    if (hasRun) {
      return;
    } else {
      this.setState({ hasRun: true });
    }
    this.setState({ canReset: false });
    const result = selectedAlgo(grid, startCoord, endCoord);
    const stepCounter = this.markVisited(result.visitedInOrder);
    if (result.pathFromNode) {
      this.markPath(result.pathFromNode, stepCounter);
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

  markPath(foundNode: Coordinate[], stepCounter: number): void {
    for (let i = 0; i < foundNode.length; i++) {
      stepCounter++;
      const coord = foundNode[i];
      this.animate('isPath', coord, stepCounter, traceInterval);
    }
    setTimeout(() => {
      this.setState({ canReset: true });
    }, traceInterval * stepCounter);
  }

  resetGrid() {
    const grid = resetVisitedNodes(this.state.grid, true);
    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;
    return (
      <React.Fragment>
        <SelectStartNode
          selectClickType={this.selectClickType}
          enabled={this.state.canReset}
        />
        <SelectEndNode
          selectClickType={this.selectClickType}
          enabled={this.state.canReset}
        />
        <SelectWall selectClickType={this.selectClickType} />
        <VisualizeAlgo findPath={this.findPath} />
        <ResetBoard reset={this.resetGrid} enabled={this.state.canReset} />
        <GridView nodes={grid.nodes} transformNode={this.transformNode} />
      </React.Fragment>
    );
  }
}
export default PathFinder;
