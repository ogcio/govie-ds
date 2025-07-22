import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect } from 'storybook/test';
import { createIcon } from '../helpers/icons';
import { IconId, IconProps, IconSize } from './icon.schema';

const meta: Meta<IconProps> = {
  title: 'components/Icon',
};

export default meta;
type Story = StoryObj<IconProps>;

const createElement = (arguments_: IconProps) => {
  const component = createIcon(arguments_);
  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  argTypes: {
    icon: {
      control: 'text',
      description: 'Specify the name of the icon',
    },
    size: {
      control: 'radio',
      options: Object.values(IconSize),
      description: 'Specify the size of the icon',
    },
    filled: {
      control: 'boolean',
      description: 'Specify if the icon has a filled style',
    },
    disabled: {
      control: 'boolean',
      description: 'Specify if the icon is disabled',
    },
    inline: {
      control: 'boolean',
      description: 'View the icon as inline',
    },
  },
  args: {
    icon: IconId.ThumbUp,
    filled: false,
    size: IconSize.MEDIUM,
    disabled: false,
    inline: false,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const span = canvasElement.querySelector('span');
    expect(span).toBeDefined();
    expect(span?.textContent).toBe('thumb_up');
    expect(span?.classList.contains('gi-text-[24px]')).toBe(true);
  },
};

export const Small: Story = {
  args: {
    icon: IconId.ThumbUp,
    size: IconSize.SMALL,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const span = canvasElement.querySelector('span');
    expect(span).toBeDefined();
    expect(span?.textContent).toBe('thumb_up');
    expect(span?.classList.contains('gi-text-[16px]')).toBe(true);
  },
};

export const Large: Story = {
  args: {
    icon: IconId.ThumbUp,
    size: IconSize.LARGE,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const span = canvasElement.querySelector('span');
    expect(span).toBeDefined();
    expect(span?.textContent).toBe('thumb_up');
    expect(span?.classList.contains('gi-text-[32px]')).toBe(true);
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: IconId.ThumbUp,
    size: IconSize.EXTRA_LARGE,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const span = canvasElement.querySelector('span');
    expect(span).toBeDefined();
    expect(span?.textContent).toBe('thumb_up');
    expect(span?.classList.contains('gi-text-[49px]')).toBe(true);
  },
};

export const Filled: Story = {
  args: {
    icon: IconId.ThumbUp,
    filled: true,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const span = canvasElement.querySelector('span');
    expect(span).toBeDefined();
    expect(span?.textContent).toBe('thumb_up');
    expect(span?.style.fontVariationSettings).toContain('"FILL" 1');
  },
};

export const Disabled: Story = {
  args: {
    icon: IconId.ThumbUp,
    disabled: true,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const span = canvasElement.querySelector('span');
    expect(span).toBeDefined();
    expect(span?.textContent).toBe('thumb_up');
    expect(span?.classList.contains('gi-text-gray-700')).toBe(true);
  },
};
