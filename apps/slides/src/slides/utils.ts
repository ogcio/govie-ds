export function dtcgToSet(
  set: Record<string, { $type: string; $value: string }>
) {
  return Object.entries(set).map(([name, value]) => ({
    name,
    value: value.$value,
  }));
}
