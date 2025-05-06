/* eslint-disable unicorn/prefer-string-replace-all */
export const getEnumValues = (enumObject: Record<string, string>) =>
  Object.values(enumObject) as [string, ...string[]];

export const generateRandomId = () => Math.random().toString(36).slice(2, 11);

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-');
}
