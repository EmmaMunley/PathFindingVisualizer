import * as React from 'react';
import NodeView from './NodeView';
import Node from '../interfaces/Node';

interface Props {
  nodes: Node[][];
}

interface State {}

class Grid extends React.Component<Props, State> {
  render() {
    const { nodes } = this.props;
    return (
      <React.Fragment>
        <h1>table</h1>
        <table>
          <tbody>
            {// map each row
            nodes.map((row: Node[], i: number) => (
              <tr key={i}>
                {// map each node
                row.map((node: Node, j: number) => (
                  <NodeView {...node} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default Grid;
