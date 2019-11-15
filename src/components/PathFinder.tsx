import * as React from 'react';
import Node from '../interfaces/Node';
import Grid from '../interfaces/Grid';
import GridView from './GridView';
import { breadthFirstSearch, copyGrid } from '../algorithms/bfs';

interface Props {}

interface State {
  grid: Grid;
}
const ROW = 10;
const COL = 10;

// const START_NODE_ROW = 10;
// const START_NODE_COL = 15;
// const FINISH_NODE_ROW = 10;
// const FINISH_NODE_COL = 35;

class PathFinder extends React.Component<Props, State> {
  state: State = {
    grid: this.createGrid(ROW, COL),
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

  findPath() {
    const { grid } = this.state;
    const result = breadthFirstSearch(grid, grid.nodes[8][3], grid.nodes[1][9]);
    if (result.pathFromNode) {
      console.log(result.pathFromNode);
      for (let i = 0; i < result.pathFromNode.length; i++) {
        const coord = result.pathFromNode[i];
        setTimeout(() => {
          const { grid } = this.state;

          const newGrid = copyGrid(grid);
          const node = newGrid.nodes[coord.x][coord.y];
          node.isPath = true;

          this.setState({ grid: newGrid });
        }, 100 * i);
      }
    }

    // console.log(breadthFirstSearch(grid, grid.nodes[0][0], grid.nodes[5][5]));
    // modify nodes array using path finding algo
    // write algos in different file and import them here
    // after each step in algo set state
    // timer set interval
  }

  render() {
    const { grid } = this.state;
    this.findPath();

    return <GridView nodes={grid.nodes} />;
  }
}
export default PathFinder;
