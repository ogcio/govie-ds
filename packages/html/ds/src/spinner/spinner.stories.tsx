import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { IconSize } from '../icon/icon.schema';
import { SpinnerProps } from './spinner.schema';

const meta: Meta<SpinnerProps> = {
  title: 'Indicators/Spinner',
};

export default meta;
type Story = StoryObj<SpinnerProps>;

const createSpinner = (arguments_: SpinnerProps) => {
  const container = document.createElement('div');

  let classSize = '';
  if (arguments_.size == 'xl') {
    classSize = 'gi-w-10 gi-h-10';
  } else if (arguments_.size == 'lg') {
    classSize = 'gi-w-8 gi-h-8';
  } else if (arguments_.size == 'sm') {
    classSize = 'gi-w-4 gi-h-4';
  } else {
    classSize = 'gi-w-6 gi-h-6';
  }

  const component = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  );
  component.setAttribute(
    'class',
    `gi-stroke-gray-950 ${classSize} ${arguments_.inline ? '' : 'gi-block'}`.trim(),
  );
  component.role = 'status';
  component.setAttribute('viewBox', '0 0 24 24');

  component.innerHTML = `<g>
      <circle
        cx="12"
        cy="12"
        r="9.5"
        fill="none"
        stroke-width="3"
        stroke-linecap="round"
      >
        <animate
          attributeName="stroke-dasharray"
          dur="1.5s"
          calcMode="spline"
          values="0 150;42 150;42 150;42 150"
          keyTimes="0;0.475;0.95;1"
          keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          dur="1.5s"
          calcMode="spline"
          values="0;-16;-59;-59"
          keyTimes="0;0.475;0.95;1"
          keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
          repeatCount="indefinite"
        />
      </circle>
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="2s"
        values="0 12 12;360 12 12"
        repeatCount="indefinite"
      />
    </g>`;

  container.append(component);

  return container;
};

const createElement = (arguments_: SpinnerProps) => {
  const component = createSpinner(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(IconSize),
      type: { name: 'string', required: false },
      description: 'Specifies the size of the section break margin.',
    },
  },
  args: {
    size: IconSize.MEDIUM,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByRole('status');
    expect(paragraph).toHaveClass('gi-h-6');
  },
};

export const Small: Story = {
  args: {
    size: IconSize.SMALL,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByRole('status');
    expect(paragraph).toHaveClass('gi-h-4');
  },
};

export const Large: Story = {
  args: {
    size: IconSize.LARGE,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByRole('status');
    expect(paragraph).toHaveClass('gi-h-8');
  },
};

export const ExtraLarge: Story = {
  args: {
    size: IconSize.EXTRA_LARGE,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByRole('status');
    expect(paragraph).toHaveClass('gi-h-10');
  },
};
