import type { Meta, StoryObj } from '@storybook/react';

import { beautifyHtmlNode } from '../storybook/storybook';
import { ChipProps } from './types';

const meta: Meta<ChipProps> = {
  title: 'Components/Chip',
};

export default meta;
type Story = StoryObj<ChipProps>;

const createElement = (arguments_: ChipProps) => {
  const container = document.createElement('div');
  container.className = 'gi-chip';

  const label = document.createElement('span');
  label.textContent = arguments_.label;

  const close = document.createElement('div');
  close.role = 'button';
  const closeIcon = document.createElement('span');
  closeIcon.role = 'presentation';
  closeIcon.className = 'material-symbols-outlined gi-block';
  closeIcon.style.fontSize = '16px';
  closeIcon.textContent = 'close';
  close.append(closeIcon);

  container.append(label);
  container.append(close);

  return beautifyHtmlNode(container);
};

export const Default: Story = {
  args: {
    label: 'Label',
  },
  render: (arguments_) => createElement(arguments_),
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
