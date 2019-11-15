import Node from './Node';

export default interface Grid {
  nodes: Node[][];
  columnLength: number;
  rowLength: number;
}
