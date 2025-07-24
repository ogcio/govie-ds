import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { PhaseBannerProps } from './types';

const meta: Meta<PhaseBannerProps> = {
  title: 'Typography/PhaseBanner',
  argTypes: {
    content: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text content of the phase banner.',
    },
    level: {
      control: 'radio',
      options: ['alpha', 'beta'],
      type: { name: 'string', required: false },
      description: 'Specifies the level of the phase banner.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'PhaseBanner component is used to indicate that a page or feature is in a particular phase (e.g., alpha or beta). It typically appears at the top of the page and provides contextual information or feedback links.',
      },
    },
  },
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

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  args: {
    content: 'This is a phase banner.',
    level: 'alpha',
  },
  render: (arguments_) => createElement(arguments_),
};
