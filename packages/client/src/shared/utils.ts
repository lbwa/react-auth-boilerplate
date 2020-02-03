// https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullablet
export function isDef<T = any>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}
