import * as React from 'react';
import Node from './Node';
import NodeInterface from '../interfaces/NodeInterface';

interface Props {
  nodes: NodeInterface[][];
}

interface State {}

class Grid extends React.Component<Props, State> {
  render() {
    const { nodes } = this.props;
    return (
      <table>
        <th>table</th>
        <tbody>
          {// map each row
          nodes.map((row: NodeInterface[], i: number) => (
            <tr key={i}>
              {// map each node
              row.map((node: NodeInterface, j: number) => (
                <td>hi</td>
                // <Node {...node} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default Grid;
