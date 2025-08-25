import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { beautifyHtmlNode } from '../storybook/storybook';
import { TooltipProps } from './types';

const meta: Meta<TooltipProps> = {
  title: 'Application/Tooltip',
  decorators: (story) => {
    const storyElement = story();
    return React.createElement(
      'div',
      { className: 'gi-flex gi-justify-center gi-my-20 gi-mx-20' },
      React.cloneElement(storyElement),
    );
  },
};

export default meta;
type Story = StoryObj<TooltipProps>;

const createTooltip = (arguments_: TooltipProps) => {
  const tooltip = document.createElement('span');
  tooltip.className = 'gi-tooltip-wrapper';
  tooltip.dataset.module = 'gieds-tooltip';
  if (arguments_.content) {
    if (typeof arguments_.content === 'string') {
      tooltip.innerHTML = arguments_.content;
    } else {
      tooltip.append(arguments_.content);
    }
  }
  const popup = document.createElement('span');
  popup.role = 'tooltip';
  popup.className = `gi-tooltip gi-tooltip-${arguments_.position}`;
  popup.ariaHidden = 'true';
  popup.textContent = arguments_.text;
  tooltip.append(popup);
  return tooltip;
};

const createElement = (arguments_: TooltipProps) => {
  const component = createTooltip(arguments_);
  const stringComponent = beautifyHtmlNode(component);
  return (
    <div
      className="gi-flex gi-justify-center gi-my-20 gi-mx-20"
      dangerouslySetInnerHTML={{ __html: stringComponent }}
    />
  );
};

export const Default: Story = {
  args: {
    position: 'top',
    text: 'This is a tooltip at the top.',
    content: `
    <button
      data-testid="govieButton-default-primary-medium-notDisabled"
      data-element="button-container"
      data-module="gieds-button"
      class="gi-btn gi-btn-primary gi-btn-regular"
    >
      Hover me (Top)
    </button>`,
  },
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
};

export const WithLongText: Story = {
  args: {
    text: 'This is a very long tooltip text that tests the tooltip display. This is a very long tooltip text that tests the tooltip display.',
    position: 'right',
    content: `
      <button
        data-testid="govieButton-long-primary-medium-notDisabled"
        data-element="button-container"
        data-module="gieds-button"
        class="gi-btn gi-btn-primary gi-btn-regular"
      >
        Hover me (Right)
      </button>
    `,
  },
  render: (arguments_) => createElement(arguments_),
};
