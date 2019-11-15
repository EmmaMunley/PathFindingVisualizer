import * as React from 'react';
import NodeView from './NodeView';
import { Node } from '../interfaces/Grid';

interface Props {
  nodes: Node[][];
}

interface State {}

class GridView extends React.Component<Props, State> {
  render() {
    const { nodes } = this.props;
    return (
      <React.Fragment>
        <h1></h1>
        <table>
          <tbody>
            {// map each row
            nodes.map((row: Node[], i: number) => (
              <tr key={i}>
                {// map each node
                row.map((node: Node, j: number) => (
                  <NodeView {...node} key={j} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default GridView;
