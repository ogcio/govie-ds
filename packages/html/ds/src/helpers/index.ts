export const getEnumValues = (enumObject: Record<string, string>) =>
  Object.values(enumObject) as [string, ...string[]];
