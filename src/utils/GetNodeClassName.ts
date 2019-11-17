export default function getNodeCSSClass(
  isStart: boolean,
  isEnd: boolean,
  isPath: boolean,
  isVisited: boolean,
  isWall: boolean,
  weight: number
): string {
  if (isStart) {
    return 'start-node';
  } else if (isEnd) {
    return 'end-node';
  }
  if (isPath && weight > 1) {
    return 'node-weight-path';
  }
  if (isVisited && weight > 1) {
    return 'node-visited-path';
  }
  if (isPath) {
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
