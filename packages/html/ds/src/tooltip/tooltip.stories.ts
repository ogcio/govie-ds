import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './tooltip.html?raw';
import { TooltipProps } from './tooltip.schema';
import { useEffect } from 'react';
import { destroyGovIe, initGovIe } from '..';

const path = import.meta.url.split('/tooltip')[0];

const macro = { name: 'govieTooltip', html, path };
const Tooltip = renderComponent<TooltipProps>(macro);

const meta = {
  title: 'Components/Tooltip',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'The Tooltip component displays a label when the user hovers over the wrapped element. The `label` prop defines the text, and the `position` prop specifies the tooltip position (`top`, `bottom`, `left`, or `right`).',
      },
    },
  },
  argTypes: {
    text: {
      description: 'The text displayed in the tooltip.',
      control: 'text',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    position: {
      description: 'Position of the tooltip relative to the child element.',
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
      table: {
        category: 'Props',
        type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
      },
    },
    content: {
      description: 'The HTML content that will be wrapped by the tooltip.',
      control: 'text',
      table: {
        category: 'Props',
        type: { summary: 'HTMLString' },
      },
    },
  },
  component: Tooltip,
  
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 'top',
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

export const TopPosition: Story = {
  args: {
    text: 'This is a tooltip at the top.',
    position: 'top',
    content: `
      <button
        data-testid="govieButton-top-primary-medium-notDisabled"
        data-element="button-container"
        data-module="gieds-button"
        class="gi-btn gi-btn-primary gi-btn-regular"
      >
        Hover me (Top)
      </button>
    `,
  },
};

export const BottomPosition: Story = {
  args: {
    text: 'This is a tooltip at the bottom.',
    position: 'bottom',
    content: `
      <button
        data-testid="govieButton-bottom-primary-medium-notDisabled"
        data-element="button-container"
        data-module="gieds-button"
        class="gi-btn gi-btn-primary gi-btn-regular"
      >
        Hover me (Bottom)
      </button>
    `,
  },
};

export const LeftPosition: Story = {
  args: {
    text: 'This is a tooltip on the left.',
    position: 'left',
    content: `
      <button
        data-testid="govieButton-left-primary-medium-notDisabled"
        data-element="button-container"
        data-module="gieds-button"
        class="gi-btn gi-btn-primary gi-btn-regular"
      >
        Hover me (Left)
      </button>
    `,
  },
};

export const RightPosition: Story = {
  args: {
    text: 'This is a tooltip on the right.',
    position: 'right',
    content: `
      <button
        data-testid="govieButton-right-primary-medium-notDisabled"
        data-element="button-container"
        data-module="gieds-button"
        class="gi-btn gi-btn-primary gi-btn-regular"
      >
        Hover me (Right)
      </button>
    `,
  },
};

export const WithLongLabel: Story = {
  args: {
    text: 'This is a very long tooltip label that tests the tooltip display.',
    position: 'top',
    content: `
      <button
        data-testid="govieButton-long-primary-medium-notDisabled"
        data-element="button-container"
        data-module="gieds-button"
        class="gi-btn gi-btn-primary gi-btn-regular"
      >
        Hover me (Top)
      </button>
    `,
  },
};