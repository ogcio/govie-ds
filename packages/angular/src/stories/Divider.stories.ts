import type { StoryObj } from '@storybook/angular';
import Box from '@/atoms/Box';
import Divider from '@/atoms/Divider';
import Stack from '@/atoms/Stack';
import * as stories from '@/atoms/storybook/Divider.meta';
import { Orientation } from '@/atoms/constants';

const meta = {
  ...stories.meta,
  title: 'Layout/Divider',
};

export default meta;

export const Horizontal: StoryObj = {
  ...stories.Horizontal,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Box, Divider, Stack] },
    template: `
      <gi-stack [gap]="2" [direction]="orientation === '${Orientation.VERTICAL}' ? 'row' : 'column'" className="gi-font-primary gi-text-sm">
        <gi-box>Content</gi-box>
        <gi-divider
          [orientation]="orientation"
          [id]="id"
          [dataTestId]="dataTestId"
        ></gi-divider>
        <gi-box>Content</gi-box>
      </gi-stack>
    `,
  }),
};

export const Vertical: StoryObj = {
  ...stories.Vertical,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Box, Divider, Stack] },
    template: `
      <gi-stack [direction]="'row'" [gap]="2" className="gi-font-primary gi-text-sm">
        <gi-box>Left</gi-box>
        <gi-divider
          [orientation]="orientation"
          [id]="id"
          [dataTestId]="dataTestId"
        ></gi-divider>
        <gi-box>Right</gi-box>
      </gi-stack>
    `,
  }),
};
