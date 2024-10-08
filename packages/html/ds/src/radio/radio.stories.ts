import type { Meta, StoryObj } from '@storybook/react';
import { Size, Tag } from '../heading/heading.schema';
import { renderComponent } from '../storybook/storybook';
import html from './radios-group.html?raw';
// import { CheckboxesProps } from './checkboxes.schema';

// Name of the folder the macro resides
const path = import.meta.url.split('/radio')[0];

const macro = { name: 'govieRadiosGroup', html, path };

const Radios = renderComponent(macro);

const meta = {
  component: Radios,
  title: 'form/Radios',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Radios>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
