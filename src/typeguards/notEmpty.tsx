export default function isNotEmpty<T>(
  arr: T[]
): arr is { pop(): T; shift(): T } & Array<T> {
  return arr.length > 0;
}
