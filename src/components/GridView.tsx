import * as React from 'react';
import NodeView from './NodeView';
import { Node, Coordinate } from '../interfaces/Grid';
interface Props {
  nodes: Node[][];
  transformNode: (coordinate: Coordinate) => void;
}

const GridView: React.FC<Props> = (props: Props) => {
  const { nodes, transformNode } = props;
  return (
    <React.Fragment>
      <table>
        <tbody>
          {// map each row
          nodes.map((row: Node[], i: number) => (
            <tr key={i}>
              {// map each node
              row.map((node: Node, j: number) => (
                <NodeView {...node} key={j} transformNode={transformNode} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default GridView;
