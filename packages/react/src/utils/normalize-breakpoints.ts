import _ from 'lodash';

/**
 * Converts legacy `base` breakpoint key to `xs`, which is the design system's
 * base breakpoint (unprefixed in Tailwind's mobile-first approach).
 * Non-object values pass through unchanged.
 */
export const normalizeLegacyBreakpoints = <T>(value: T): T => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const object = value as Record<string, unknown>;

  if (_.has(object, 'base')) {
    if (!_.has(object, 'xs')) {
      return { ..._.omit(object, 'base'), xs: object.base } as T;
    }
    return _.omit(object, 'base') as T;
  }

  return value;
};
