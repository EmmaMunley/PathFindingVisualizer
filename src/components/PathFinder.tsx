import * as React from 'react';
import config from '../config/default';
import { Grid, Coordinate, Node } from '../interfaces/Grid';
import { SearchAlgo } from '../interfaces/SearchAlgo';
import GridView from './GridView';
import { breadthFirstSearch } from '../algorithms/bfs';
import { copyGrid, createGrid, getNodeAtCoords } from '../utils';
import { SelectStartNode, SelectEndNode } from '../buttons';
import { ClickType } from '../enums/ClickType';
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
}

const { rows, cols, startCoord, endCoord } = config.grid;
const searchInterval: number = config.stepIntervals.search;
const traceInterval: number = config.stepIntervals.trace;

class PathFinder extends React.Component<Props, State> {
  state: State = {
    grid: createGrid(rows, cols),
    startCoord: startCoord,
    endCoord: endCoord,
    algos: {
      bfs: breadthFirstSearch,
    },
    clickType: undefined,
    selectedAlgo: breadthFirstSearch,
    hasRun: false,
  };

  constructor(props: Props) {
    super(props);
    this.selectClickType = this.selectClickType.bind(this);
    this.transformNode = this.transformNode.bind(this);
    this.findPath = this.findPath.bind(this);
  }

  transformNode(coord: Coordinate, clickType: ClickType): void {
    if (clickType === ClickType.selectStartNode) {
      const grid = resetVisitedNodes(this.state.grid);
      const newStartNode: Node = getNodeAtCoords(coord, grid);

      const oldStartNode = getNodeAtCoords(this.state.startCoord, grid);
      oldStartNode.isStart = false;
      newStartNode.isStart = true;
      this.setState({ startCoord: coord, grid });
    } else if (clickType === ClickType.selectEndNode) {
      const grid = resetVisitedNodes(this.state.grid);
      const newEndNode: Node = getNodeAtCoords(coord, grid);
      const oldEndNode = getNodeAtCoords(this.state.endCoord, grid);
      oldEndNode.isEnd = false;
      newEndNode.isEnd = true;
      this.setState({ endCoord: coord, grid });
    }
    //wall clicktype goes here
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

  markPath(
    foundNode: Coordinate[],
    stepCounter: number,
    interval: number
  ): void {
    for (let i = 0; i < foundNode.length; i++) {
      stepCounter++;
      const coord = foundNode[i];
      this.animate('isPath', coord, stepCounter, traceInterval);
    }
  }

  render() {
    const { grid } = this.state;
    // VisualizeAlgo button that invokes this.findPath
    this.findPath();
    return (
      <React.Fragment>
        <SelectStartNode selectClickType={this.selectClickType} />
        <SelectEndNode selectClickType={this.selectClickType} />
        <GridView nodes={grid.nodes} />;
      </React.Fragment>
    );
  }
}
export default PathFinder;
