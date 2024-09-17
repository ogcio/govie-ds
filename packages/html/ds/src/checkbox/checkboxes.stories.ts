import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './checkboxes-group.html?raw';
import {
  CheckboxesProps,
  CheckboxSizeEnum,
  TitleSizeEnum,
} from './checkboxes.schema';

// Name of the folder the macro resides
const path = import.meta.url.split('/checkbox')[0];

const macro = { name: 'govieCheckboxesGroup', html, path };

const Checkboxes = renderComponent<CheckboxesProps>(macro);

const meta = {
  component: Checkboxes,
  title: 'form/Checkboxes',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Checkboxes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fieldId: 'UniqueID',
    items: [
      {
        label: 'Checkbox 1',
        value: 'Checkbox-1',
      },
      {
        label: 'Checkbox 2',
        value: 'Checkbox-2',
      },
      {
        label: 'Checkbox 3',
        value: 'Checkbox-3',
      },
    ],
    title: {
      value: 'Organisation',
      size: TitleSizeEnum.Large,
    },
    checkboxesSize: CheckboxSizeEnum.Medium,
  },
};
