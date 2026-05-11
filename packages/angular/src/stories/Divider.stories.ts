import type { StoryObj } from '@storybook/angular';
import Divider from '../atoms/Divider';
import {
  dividerMeta,
  Default as dividerDefault,
  Vertical as dividerVertical,
  Inset as dividerInset,
} from '../atoms/storybook/Divider.meta';
import { Orientation } from '../atoms/constants';

const meta = {
  ...dividerMeta,
  title: 'Layout/Divider',
};

export default meta;

export const Default: StoryObj = {
  ...dividerDefault,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Divider] },
    template: `
      <div [class]="orientation === '${Orientation.VERTICAL}' ? 'gi-flex gi-h-20' : ''">
        <gi-divider
          [orientation]="orientation"
          [inset]="inset"
          [id]="id"
          [dataTestId]="dataTestId"
        ></gi-divider>
      </div>
    `,
  }),
};

export const Vertical: StoryObj = {
  ...dividerVertical,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Divider] },
    template: `
      <div class="gi-flex gi-flex-row gi-gap-4 gi-h-20">
        <div class="gi-p-4">Left</div>
        <gi-divider
          [orientation]="orientation"
          [inset]="inset"
          [id]="id"
          [dataTestId]="dataTestId"
        ></gi-divider>
        <div class="gi-p-4">Right</div>
      </div>
    `,
  }),
};

export const Inset: StoryObj = {
  ...dividerInset,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Divider] },
    template: `
      <gi-divider
        [orientation]="orientation"
        [inset]="inset"
        [id]="id"
        [dataTestId]="dataTestId"
      ></gi-divider>
    `,
  }),
};
