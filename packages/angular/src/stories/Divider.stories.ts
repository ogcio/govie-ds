import type { StoryObj } from '@storybook/angular';
import Box from '../atoms/Box';
import Divider from '../atoms/Divider';
import Stack from '../atoms/Stack';
import {
  dividerMeta,
  Horizontal as dividerHorizontal,
  Vertical as dividerVertical,
} from '../atoms/storybook/Divider.meta';
import { Orientation } from '../atoms/constants';

const meta = {
  ...dividerMeta,
  title: 'Layout/Divider',
};

export default meta;

export const Horizontal: StoryObj = {
  ...dividerHorizontal,
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
  ...dividerVertical,
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
