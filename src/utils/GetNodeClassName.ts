export default function getNodeCSSClass(
  isStart: boolean,
  isEnd: boolean,
  isPath: boolean,
  isVisited: boolean,
  isWall: boolean
): string {
  if (isPath) {
    return 'node-shortest-path';
  } else if (isVisited) {
    return 'visited-node';
  } else if (isStart) {
    return 'start-node';
  } else if (isEnd) {
    return 'end-node';
  } else if (isWall) {
    return 'node-wall';
  }
  return 'node';
}
