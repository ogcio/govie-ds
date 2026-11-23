import type { StoryObj } from '@storybook/angular-vite';
import { GiBox } from '@/Box';
import { GiDivider, GiDividerDirective } from '@/Divider';
import { GiStack, GiStackDirective } from '@/Stack';
import { GiLink } from '@/Link';
import * as stories from '@/atoms/storybook/Divider.meta';
import argTypes from '@/atoms/storybook/argTypes';
import { Orientation } from '@/atoms/constants';

const meta = {
  ...stories.meta,
  title: 'Layout/Divider',
  argTypes: {
    ...stories.meta.argTypes,
    class: argTypes.class,
    style: {
      control: false,
      description: 'Inline styles applied directly to the element.',
      table: { type: { summary: 'string | Record<string, string | number | null | undefined>' } },
    },
  },
};

export default meta;

export const Horizontal: StoryObj = {
  ...stories.Horizontal,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiBox, GiDivider, GiStack] },
    template: `
      <gi-stack [gap]="2" [direction]="orientation === '${Orientation.VERTICAL}' ? 'row' : 'column'" class="gi-font-primary gi-text-sm">
        <gi-box>Content</gi-box>
        <gi-divider
          [orientation]="orientation"
          [id]="id"
          [dataTestId]="dataTestId"
        />
        <gi-box>Content</gi-box>
      </gi-stack>
    `,
  }),
};

export const Vertical: StoryObj = {
  ...stories.Vertical,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiBox, GiDivider, GiStack] },
    template: `
      <gi-stack [direction]="'row'" [gap]="2" class="gi-font-primary gi-text-sm">
        <gi-box>Left</gi-box>
        <gi-divider
          [orientation]="orientation"
          [id]="id"
          [dataTestId]="dataTestId"
        />
        <gi-box>Right</gi-box>
      </gi-stack>
    `,
  }),
};

export const RichText: StoryObj = {
  ...stories.RichText,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiBox, GiDivider, GiStack, GiLink] },
    template: `
      <gi-stack [direction]="'row'" [gap]="2" class="gi-font-primary gi-text-sm">
        <gi-box><gi-link href="#" variant="inline">Left</gi-link></gi-box>
        <gi-divider
          [orientation]="orientation"
          [id]="id"
          [dataTestId]="dataTestId"
        />
        <gi-box><gi-link href="#" variant="inline">Right</gi-link></gi-box>
      </gi-stack>
    `,
  }),
};

export const Directive: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Adds the `gi-divider` styling to an `hr` you own, with the same orientations.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [GiStackDirective, GiDividerDirective] },
    template: `
      <div giStack direction="row" [gap]="2" class="gi-font-primary gi-text-sm">
        <span>Left</span>
        <hr giDivider orientation="vertical" />
        <span>Right</span>
      </div>
    `,
  }),
};
