export function downloadAttribute(value: string | boolean | undefined): string | undefined {
  return value === true || value === '' ? '' : value || undefined;
}
