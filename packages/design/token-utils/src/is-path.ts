export function isPath(value: unknown) {
  if (typeof value === 'string') {
    return /^[A-Za-z|]+(\.[A-Za-z|]+)*$/.test(value);
  }
  return false;
}
