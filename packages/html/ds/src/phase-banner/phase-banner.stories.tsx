import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createPhaseBanner } from '../helpers/phase-banner';
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
    wrap: {
      control: 'radio',
      options: ['none', 'container', 'container-full-width'],
      type: { name: 'string', required: false },
      description:
        'Defines how the phase banner is wrapped inside a container.',
    },
    padding: {
      control: 'boolean',
      type: { name: 'boolean', required: false },
      description:
        'Whether the phase banner should include horizontal padding.',
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

export const WrappedInContainer: Story = {
  args: {
    ...Default.args,
    wrap: 'container',
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithoutPadding: Story = {
  args: {
    ...Default.args,
    padding: false,
  },
  render: (arguments_) => createElement(arguments_),
};
