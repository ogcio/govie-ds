import type { StoryObj } from '@storybook/angular-vite';
import { expect, within } from 'storybook/test';
import { GiBox } from '@/Box';
import { GiContainer } from '@/Container';
import { GiStack } from '@/Stack';
import {
  boxMeta,
  Default as boxDefault,
  WithContainerAndStack as boxWithContainerAndStack,
} from '../atoms/storybook/Box.meta';

const meta = {
  ...boxMeta,
  title: 'Layout/Box',
};

export default meta;

export const Default: StoryObj = {
  ...boxDefault,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiBox] },
    template: `
      <gi-box
        [class]="className"
        [id]="id"
        [dataTestId]="dataTestId"
        [role]="role"
        [ariaLabel]="ariaLabel"
        [ariaLabelledBy]="ariaLabelledBy"
      >
        {{ children }}
      </gi-box>
    `,
  }),
};

export const WithContainerAndStack: StoryObj = {
  ...boxWithContainerAndStack,
  tags: ['skip-playwright'],
  render: () => ({
    moduleMetadata: { imports: [GiBox, GiContainer, GiStack] },
    template: `
      <gi-container>
        <gi-stack [direction]="'row'" [gap]="4">
          <gi-box [class]="'gi-p-4 gi-bg-gray-300 gi-flex-1'">
            Box 1
          </gi-box>
          <gi-box [class]="'gi-p-4 gi-bg-gray-300 gi-flex-1'">Box 2</gi-box>
          <gi-box [class]="'gi-p-4 gi-bg-gray-300 gi-flex-1'">Box 3</gi-box>
        </gi-stack>
      </gi-container>
    `,
  }),
};

export const TestInlineStyle: StoryObj = {
  tags: ['!dev', '!autodocs', 'skip-playwright'],
  render: () => ({
    moduleMetadata: { imports: [GiBox] },
    props: { objectStyle: { marginTop: '8px', 'padding-top': '2px', opacity: 0.5, color: null } },
    template: `
      <gi-box dataTestId="string-style" style="margin-top: 4px; color: red !important">String form</gi-box>
      <gi-box dataTestId="object-style" [style]="objectStyle">Object form</gi-box>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('accepts a style string', async () => {
      const { style } = canvas.getByTestId('string-style');
      await expect(style.marginTop).toBe('4px');
      await expect(style.getPropertyPriority('color')).toBe('important');
    });

    await step('accepts a style object', async () => {
      const { style } = canvas.getByTestId('object-style');
      await expect(style.marginTop).toBe('8px');
      await expect(style.paddingTop).toBe('2px');
      await expect(style.opacity).toBe('0.5');
      await expect(style.color).toBe('');
    });

    await step('leaves the host element unstyled', async () => {
      for (const host of canvasElement.querySelectorAll('gi-box')) {
        await expect(host.hasAttribute('style')).toBe(false);
      }
    });
  },
};
