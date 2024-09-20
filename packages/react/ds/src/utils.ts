export function slugify(value?: string) {
  if (!value) {
    return value;
  }

  let slug = value.replaceAll(/^\s+|\s+$/g, '');
  slug = slug.toLowerCase();
  slug = slug
    .replaceAll(/[^\d a-z-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-');
  return slug;
}
