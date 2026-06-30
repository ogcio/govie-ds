import type { StoryObj } from '@storybook/angular';
import Box from '@/atoms/Box';
import Divider from '@/atoms/Divider';
import Stack from '@/atoms/Stack';
import Link from '@/atoms/Link';
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
    moduleMetadata: { imports: [Box, Divider, Stack, Link] },
    template: `
      <gi-stack [gap]="2" [direction]="orientation === '${Orientation.VERTICAL}' ? 'row' : 'column'" className="gi-font-primary gi-text-sm">
        <gi-box><gi-link href="#" variant="inline">Above</gi-link></gi-box>
        <gi-divider
          [orientation]="orientation"
          [id]="id"
          [dataTestId]="dataTestId"
        ></gi-divider>
        <gi-box><gi-link href="#" variant="inline">Below</gi-link></gi-box>
      </gi-stack>
    `,
  }),
};

export const Vertical: StoryObj = {
  ...stories.Vertical,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Box, Divider, Stack, Link] },
    template: `
      <gi-stack [direction]="'row'" [gap]="2" className="gi-font-primary gi-text-sm">
        <gi-box><gi-link href="#" variant="inline">Left</gi-link></gi-box>
        <gi-divider
          [orientation]="orientation"
          [id]="id"
          [dataTestId]="dataTestId"
        ></gi-divider>
        <gi-box><gi-link href="#" variant="inline">Right</gi-link></gi-box>
      </gi-stack>
    `,
  }),
};
