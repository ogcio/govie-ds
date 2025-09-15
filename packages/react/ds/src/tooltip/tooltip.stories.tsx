import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { Button } from '../button/button.js';
import { Tooltip } from './tooltip.js';

const meta = {
  title: 'Application/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'The Tooltip component displays a text when the user hovers over the wrapped element. The `text` prop defines the text, and the `position` prop specifies the tooltip position (`top`, `bottom`, `left`, or `right`).',
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
    children: {
      description: 'The child element that triggers the tooltip on hover.',
      control: false,
      table: {
        category: 'Props',
        type: { summary: 'ReactNode' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="gi-flex gi-justify-center gi-my-20 gi-mx-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'This is a tooltip.',
    position: 'top',
    children: (
      <Button variant="primary" dataTestid="tooltip-trigger">
        Hover me (Top)
      </Button>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render the child component', async () => {
      const triggerButton = canvas.getByTestId('tooltip-trigger');
      await expect(triggerButton).toBeInTheDocument();
    });

    await step('should not show tooltip initially', async () => {
      const tooltipTextElement = canvas.queryByText('This is a tooltip.');
      await expect(tooltipTextElement).not.toBeInTheDocument();
    });

    await step('should show tooltip on mouse enter', async () => {
      const triggerButton = await canvas.getByTestId('tooltip-trigger');
      await userEvent.hover(triggerButton);
      const tooltipTextElement = await canvas.findByText('This is a tooltip.');
      await expect(tooltipTextElement).toBeInTheDocument();
    });

    await step('should hide tooltip on mouse leave', async () => {
      const triggerButton = canvas.getByTestId('tooltip-trigger');
      await userEvent.unhover(triggerButton);
      await waitFor(() => {
        const tooltipTextElement = canvas.queryByText('This is a tooltip.');
        expect(tooltipTextElement).not.toBeInTheDocument();
      });
    });

    await step('should render tooltip with correct text', async () => {
      const triggerButton = await canvas.getByTestId('tooltip-trigger');
      await userEvent.hover(triggerButton);
      const tooltipTextElement = await canvas.findByText('This is a tooltip.');
      await expect(tooltipTextElement).toHaveTextContent('This is a tooltip.');
    });
  },
};

export const TopPosition: Story = {
  args: {
    text: 'This is a tooltip at the top.',
    position: 'top',
    children: (
      <Button variant="primary" dataTestid="tooltip-trigger">
        Hover me (Top)
      </Button>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(await canvas.getByTestId('tooltip-trigger'));
    await step(
      'should apply correct position class for top position',
      async () => {
        const tooltipElement = await canvas.findByText(
          'This is a tooltip at the top.',
        );
        await expect(tooltipElement).toHaveClass('gi-tooltip-top');
      },
    );
  },
};

export const BottomPosition: Story = {
  args: {
    text: 'This is a tooltip at the bottom.',
    position: 'bottom',
    children: (
      <Button variant="primary" dataTestid="tooltip-trigger">
        Hover me (Bottom)
      </Button>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(await canvas.getByTestId('tooltip-trigger'));
    await step(
      'should apply correct position class for bottom position',
      async () => {
        const tooltipElement = await canvas.findByText(
          'This is a tooltip at the bottom.',
        );
        await expect(tooltipElement).toHaveClass('gi-tooltip-bottom');
      },
    );
  },
};

export const LeftPosition: Story = {
  args: {
    text: 'This is a tooltip on the left.',
    position: 'left',
    children: (
      <Button variant="primary" dataTestid="tooltip-trigger">
        Hover me (Left)
      </Button>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(await canvas.getByTestId('tooltip-trigger'));
    await step(
      'should apply correct position class for left position',
      async () => {
        const tooltipElement = await canvas.findByText(
          'This is a tooltip on the left.',
        );
        await expect(tooltipElement).toHaveClass('gi-tooltip-left');
      },
    );
  },
};

export const RightPosition: Story = {
  args: {
    text: 'This is a tooltip on the right.',
    position: 'right',
    children: (
      <Button variant="primary" dataTestid="tooltip-trigger">
        Hover me (Right)
      </Button>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(await canvas.getByTestId('tooltip-trigger'));
    await step(
      'should apply correct position class for right position',
      async () => {
        const tooltipElement = await canvas.findByText(
          'This is a tooltip on the right.',
        );
        await expect(tooltipElement).toHaveClass('gi-tooltip-right');
      },
    );
  },
};

export const WithLongText: Story = {
  args: {
    text: 'This is a very long tooltip text that tests the tooltip display. This is a very long tooltip text that tests the tooltip display.',
    position: 'top',
    children: (
      <Button variant="primary" dataTestid="tooltip-trigger">
        Hover me (Top)
      </Button>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let popoverContent = canvas.queryByText(
      'This is a very long tooltip text that tests the tooltip display. This is a very long tooltip text th...',
    );
    await expect(popoverContent).not.toBeInTheDocument();

    const triggerButton = await canvas.getByTestId('tooltip-trigger');
    await userEvent.hover(triggerButton);

    popoverContent = canvas.queryByText(
      'This is a very long tooltip text that tests the tooltip display. This is a very long tooltip text th...',
    );
    await expect(popoverContent).toBeInTheDocument();
  },
};
