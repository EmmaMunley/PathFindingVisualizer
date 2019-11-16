export default function getNodeCSSClass(
  isStart: boolean,
  isEnd: boolean,
  isPath: boolean,
  isVisited: boolean
): string {
  if (isStart) {
    return 'start-node';
  } else if (isEnd) {
    return 'end-node';
  } else if (isPath) {
    return 'node-shortest-path';
  } else if (isVisited) {
    return 'visited-node';
  }
  return 'node';
}
