import deepmergelib from "deepmerge";

export function deepmerge<T>(...parameters: unknown[]): T {
  return deepmergelib.all<T>(parameters.map((p) => p ?? {}));
}
