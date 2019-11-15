import * as React from 'react';
import Node from '../interfaces/Node';
import Grid from '../interfaces/Grid';
import Coordinate from '../interfaces/Coordinate';
import SearchAlgo from '../interfaces/SearchAlgo';
import GridView from './GridView';
import { breadthFirstSearch, copyGrid } from '../algorithms/bfs';

interface Props {}

interface State {
  grid: Grid;
  algos: Record<string, SearchAlgo>; //obj
  selectedAlgo: SearchAlgo;
}
const ROW = 25;
const COL = 25;
const STEP_INTERVAL = 50;

class PathFinder extends React.Component<Props, State> {
  state: State = {
    grid: this.createGrid(ROW, COL),
    algos: {
      bfs: breadthFirstSearch,
    },
    selectedAlgo: breadthFirstSearch,
  };

  createGrid(row: number, col: number): Grid {
    const nodes: Node[][] = [];
    for (let i = 0; i < COL; i++) {
      const row: Node[] = [];
      for (let j = 0; j < ROW; j++) {
        const node: Node = {
          row: j,
          col: i,
          distance: Infinity,
          isFinish: false,
          isStart: false,
          isVisited: false,
          isWall: false,
          isPath: false,
        };
        row.push(node);
      }
      nodes.push(row);
    }

    return { nodes, columnLength: COL, rowLength: ROW };
  }
  getNodeAt(coord: Coordinate, grid: Grid): Node {
    return grid.nodes[coord.y][coord.x];
  }

  findPath() {
    const { grid, selectedAlgo } = this.state;
    const result = selectedAlgo(grid, grid.nodes[8][3], grid.nodes[1][9]);
    let stepCounter = 0;

    result.visitedInOrder.forEach((coord, i) => {
      stepCounter++;
      setTimeout(() => {
        const { grid } = this.state;

        const newGrid = copyGrid(grid);
        const node = this.getNodeAt(coord, newGrid);
        node.isVisited = true;
        this.setState({ grid: newGrid });
      }, STEP_INTERVAL * stepCounter);
    });

    if (result.pathFromNode) {
      for (let i = 0; i < result.pathFromNode.length; i++) {
        stepCounter++;
        const coord = result.pathFromNode[i];
        setTimeout(() => {
          const { grid } = this.state;

          const newGrid = copyGrid(grid);
          const node = this.getNodeAt(coord, newGrid);
          node.isPath = true;

          this.setState({ grid: newGrid });
        }, STEP_INTERVAL * stepCounter);
      }
    }
  }

  render() {
    const { grid } = this.state;
    this.findPath();

    return <GridView nodes={grid.nodes} />;
  }
}
export default PathFinder;
