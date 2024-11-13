import type { Meta, StoryObj } from '@storybook/react';
import html from './chip.html?raw';

const meta = {
  title: 'Components/Chip',
  parameters: {
    docs: {
      description: {
        component:
          'A Chip is a compact UI element that displays information, can be removed via a close button, and is ideal for tags, filters, or selection indicators.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      name: 'label',
      type: 'string',
      description: 'The content of the chip',
    },
    onClose: {
      name: 'onClose',
      type: 'function',
      control: 'object',
      description: 'The event attached on closing the chip',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  //@ts-expect-error Render function returns raw HTML string, not a React component
  render: (_, { parameters }) => {
    parameters.renderedHtml = html;
    return html;
  },
};

export const AllStates: Story = {
  //@ts-expect-error Render function returns raw HTML string, not a React component
  render: () =>
    `<div class="gi-gap-4 gi-flex-col gi-flex gi-w-fit">
      <div class="gi-chip" aria-label="chip: Default" aria-describedby="chip-description-:r2:" tabindex="0">
        <span id="chip-description-:r2:">Default</span>
        <div role="button" aria-label="remove chip">
          <span
            data-testid="govie-icon"
            role="presentation"
            class="material-symbols-outlined gi-block"
            style="font-size: 16px;"
          >
            close
          </span>
        </div>
      </div>

      <div class="gi-chip pseudo-hover" aria-label="chip: Hover" aria-describedby="chip-description-:r3:" tabindex="0">
        <span id="chip-description-:r3:">Hover</span>
        <div role="button" aria-label="remove chip">
          <span
            data-testid="govie-icon"
            role="presentation"
            class="material-symbols-outlined gi-block"
            style="font-size: 16px;"
          >
            close
          </span>
        </div>
      </div>

      <div class="gi-chip pseudo-focus" aria-label="chip: Focus" aria-describedby="chip-description-:r4:" tabindex="0">
        <span id="chip-description-:r4:">Focus</span>
        <div role="button" aria-label="remove chip">
          <span
            data-testid="govie-icon"
            role="presentation"
            class="material-symbols-outlined gi-block"
            style="font-size: 16px;"
          >
            close
          </span>
        </div>
      </div>
    </div>`,
};
