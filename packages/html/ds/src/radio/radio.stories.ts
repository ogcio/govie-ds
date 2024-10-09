import type { Meta, StoryObj } from '@storybook/react';
import { Size, Tag } from '../heading/heading.schema';
import { renderComponent } from '../storybook/storybook';
import { RadiosProps, RadioSizeEnum } from './radio.schema';
import html from './radios-group.html?raw';

// Name of the folder the macro resides
const path = import.meta.url.split('/radio')[0];

const macro = { name: 'govieRadiosGroup', html, path };

const Radios = renderComponent<RadiosProps>(macro);

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
  args: {
    title: {
      value: 'heading',
      asHeading: {
        size: Size.Medium,
        tag: Tag.H2,
      },
      hint: 'Heading hint'
    },
    // inline: true,
    errorMessage: 'error',
    fieldId: 'UniqueID',
    size: RadioSizeEnum.Small,
    items: [
      {
        label: 'Employment Tribunal',
        value: 'employment-tribunal',
        hint: 'hint item 1'
      },
      {
        label: 'Ministry of Defence',
        value: 'ministry-of-defence',
      },
      {
        label: 'Department for Transport',
        value: 'department-for-transport',
      },
    ],
    dividerOption: {
      label: 'No, I will not be travelling to any of these countries',
      value: 'no-travel',
    },
  },
};
