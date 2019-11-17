export function isInBounds(
  x: number,
  y: number,
  maxX: number,
  maxY: number,
  minX = 0,
  minY = 0
): boolean {
  return x >= minX && x <= maxX && y >= minY && y <= maxY;
}
