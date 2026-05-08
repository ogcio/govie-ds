import type { InputType, Renderer, StoryContext } from 'storybook/internal/types';
import _ from 'lodash';
import { expect, type within } from 'storybook/test';

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

/**
 * Creates a reusable test helper bound to a specific element and Storybook step runner.
 * Returns an object with assertion methods for common play-function checks.
 */
export const checker = (testId: string, canvas: ReturnType<typeof within>, step: StoryContext<Renderer>['step']) => ({
  exists: async (tag = 'DIV') => await step(`renders ${testId} as ${tag}`, async () => {
    const element = canvas.getByTestId(testId);
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe(tag);
  }),
  children: async () => await step('renders children', async () => {
    const element = canvas.getByTestId(testId);
    expect(element.childNodes.length).toBeGreaterThan(0);
  }),
  attributes: async (options: Record<string, unknown>) => {
    for (const [key, value] of _.toPairs(options)) {
      await step(`renders ${key} attribute`, async () => {
        const element = canvas.getByTestId(testId);
        expect(element).toHaveAttribute(key, value);
      });
    }
  }
})