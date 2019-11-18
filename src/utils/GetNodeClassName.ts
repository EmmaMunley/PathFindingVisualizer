export default function getNodeCSSClass(
  isStart: boolean,
  isEnd: boolean,
  isPath: boolean,
  isVisited: boolean,
  isWall: boolean,
  weight: number
): string {
  if (isStart && !isVisited) {
    return 'start-node';
  } else if (isStart && isVisited) {
    return 'start-node-visited';
  } else if (isEnd && !isVisited) {
    return 'end-node';
  } else if (isEnd && isVisited) {
    return 'end-node-visited';
  } else if (isPath && weight > 1) {
    return 'node-weight-path';
  } else if (isVisited && weight > 1) {
    return 'node-weight-visited';
  } else if (isPath) {
    return 'node-shortest-path';
  } else if (isVisited) {
    return 'visited-node';
  } else if (isWall) {
    return 'node-wall';
  } else if (weight === 1) {
    return 'node';
  } else {
    return 'node-weight';
  }
}
