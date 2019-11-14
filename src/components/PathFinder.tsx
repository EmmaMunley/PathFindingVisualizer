import * as React from 'react';
import NodeInterface from '../interfaces/NodeInterface';
import Grid from './Grid';

interface Props {}

interface State {
  nodes: NodeInterface[][];
}
const ROW = 10;
const COL = 10;

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class PathFinder extends React.Component<Props, State> {
  state: State = {
    nodes: [],
  };

  constructor(props: Props) {
    super(props);
    const nodes = this.createGrid();
    this.setState({ nodes });
  }

  createGrid(): NodeInterface[][] {
    const nodes: NodeInterface[][] = [];
    for (let i = 0; i < ROW; i++) {
      // this is what we'll be adding to nodes, after we populate it
      const row: NodeInterface[] = [];
      for (let j = 0; j < COL; j++) {
        const node: NodeInterface = {
          row: i,
          col: j,
          // tbd, i dont know if i agree that you need these in this way
          isFinish: false,
          isStart: false,
        };
        row.push(node);
      }
      nodes.push(row);
    }
    return nodes;
  }

  findPath() {
    // modify nodes array using path finding algo
    // write algos in different file and import them here
    // after each step in algo set state
    // timer set interval
  }

  render() {
    const { nodes } = this.state;

    return <Grid nodes={nodes} />;
  }
}
export default PathFinder;
