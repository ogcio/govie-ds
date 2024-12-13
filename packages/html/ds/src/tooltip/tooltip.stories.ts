import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './tooltip.html?raw';
import { TooltipProps } from './tooltip.schema';

const path = import.meta.url.split('/tooltip')[0];

const macro = { name: 'govieTooltip', html, path };
const Tooltip = renderComponent<TooltipProps>(macro);

const meta = {
  title: 'Components/Tooltip',
  parameters: {
    macro,
    docs: {
      description: {
        component: 'Tooltip'
      },
    },
  },
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 'right',
    text: 'Tooltip right.',
    content: `
    <button
      data-testid="govieButton-default-primary-medium-notDisabled"
      data-element="button-container"
      data-module="gieds-button"
      class="gi-btn gi-btn-primary gi-btn-regular"
    >
      Default (Hover me)
    </button>`
  },
};