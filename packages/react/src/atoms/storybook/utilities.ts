import type { InputType } from 'storybook/internal/types';
import _ from 'lodash';

/**
 * Converts an `as const` enum object into a Storybook argType with a select
 * control, options list, and a formatted type summary for the docs table.
 * Caller-supplied options are deep-merged over the base via _.defaultsDeep.
 */
export function enumType<const T extends Readonly<Record<string, string>>>(enumObject: T, options?: {
  description?: string;
  defaultValue?: T[keyof T];
  table?: Record<string, unknown>;
}) {
  const values = Object.values(enumObject) as T[keyof T][];
  if (values.length === 0) {
    throw new Error('enumType requires at least one option');
  }
  const base = {
    control: {
      type: 'select' as const
    },
    options: values,
    description: options?.description,
    table: {
      type: {
        summary: values.map(value => `"${value}"`).join(' | ')
      },
      ...(options?.defaultValue === undefined ? {} : {
        defaultValue: {
          summary: options.defaultValue
        }
      })
    }
  };
  return _.defaultsDeep(options?.table ? {
    table: options.table
  } : {}, base) satisfies InputType;
}