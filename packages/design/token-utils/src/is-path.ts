export function isPath(value: unknown) {
  if (typeof value === 'string') {
    return /^[a-z|A-Z]+(\.[a-z|A-Z]+)*$/.test(value);
  }
  return false;
}
