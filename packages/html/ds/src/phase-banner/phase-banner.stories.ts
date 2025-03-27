import type { Meta, StoryObj } from '@storybook/react';
import { beautifyHtmlNode } from '../storybook/storybook';
import { PhaseBannerProps } from './types';

const meta: Meta<PhaseBannerProps> = {
  title: 'Typography/PhaseBanner',
};

export default meta;
type Story = StoryObj<PhaseBannerProps>;

const createPhaseBanner = (arguments_: PhaseBannerProps) => {
  const banner = document.createElement('div');
  banner.className = 'gi-phase-banner-container';

  const tag = document.createElement('div');
  tag.className = 'gi-phase-banner';
  tag.textContent = arguments_.level;
  banner.append(tag);

  if (arguments_.content) {
    const content = document.createElement('div');
    content.innerHTML = arguments_.content;
    banner.append(content);
  }

  return banner;
};

const createElement = (arguments_: PhaseBannerProps) => {
  const component = createPhaseBanner(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    content: 'This is a phase banner.',
    level: 'alpha',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Beta: Story = {
  args: {
    content: 'This is a phase banner.',
    level: 'beta',
  },
  render: (arguments_) => createElement(arguments_),
};
