export function GetNodeClassName(
  isStart: boolean,
  isFinish: boolean,
  isPath: boolean,
  isVisited: boolean
): string {
  if (isStart) {
    return 'start-node';
  } else if (isFinish) {
    return 'end-node';
  } else if (isPath) {
    return 'node-shortest-path';
  } else if (isVisited) {
    return 'visited-node';
  }
  return 'node';
}
