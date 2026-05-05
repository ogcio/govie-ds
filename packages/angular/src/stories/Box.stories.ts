import type { StoryObj } from '@storybook/angular';
import Box from '../atoms/Box';
import Container from '../atoms/Container';
import Stack from '../atoms/Stack';
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
    moduleMetadata: { imports: [Box] },
    template: `
      <gi-box
        [className]="className"
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
  render: () => ({
    moduleMetadata: { imports: [Box, Container, Stack] },
    template: `
      <gi-container>
        <gi-stack [direction]="'row'" [gap]="4">
          <gi-box [className]="'gi-p-4 gi-bg-gray-300 gi-flex-1'" [dataTestId]="'box-layout'">
            Box 1
          </gi-box>
          <gi-box [className]="'gi-p-4 gi-bg-gray-300 gi-flex-1'">Box 2</gi-box>
          <gi-box [className]="'gi-p-4 gi-bg-gray-300 gi-flex-1'">Box 3</gi-box>
        </gi-stack>
      </gi-container>
    `,
  }),
};
