import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './heading.html?raw';
import { SIZE, TAG } from './heading.schema';
import { HeadingProps } from './heading.schema';

const macro = { name: 'govieHeading', html };

const Heading = renderComponent<HeadingProps>(macro);

const meta = {
  component: Heading,
  title: 'typography/Heading',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: SIZE.MEDIUM,
    tag: TAG.H1,
    text: 'Default',
    caption: ''
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const Small: Story = {
  args: {
    size: SIZE.SMALL,
    tag: TAG.H1,
    text: 'Small heading',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const Medium: Story = {
  args: {
    size: SIZE.MEDIUM,
    tag: TAG.H1,
    text: 'Medium heading',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const Large: Story = {
  args: {
    size: SIZE.LARGE,
    tag: TAG.H1,
    text: 'Large heading',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const ExtraLarge: Story = {
  args: {
    size: SIZE.EXTRA_LARGE,
    tag: TAG.H1,
    text: 'Extra large heading',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const heading1: Story = {
  args: {
    size: SIZE.MEDIUM,
    tag: TAG.H1,
    text: 'Heading with h1',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const heading2: Story = {
  args: {
    size: SIZE.MEDIUM,
    tag: TAG.H2,
    text: 'Heading with h2',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const heading3: Story = {
  args: {
    size: SIZE.MEDIUM,
    tag: TAG.H3,
    text: 'Heading with h3',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const heading4: Story = {
  args: {
    size: SIZE.MEDIUM,
    tag: TAG.H4,
    text: 'Heading with h4',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const heading5: Story = {
  args: {
    size: SIZE.MEDIUM,
    tag: TAG.H5,
    text: 'Heading with h5',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const heading6: Story = {
  args: {
    size: SIZE.MEDIUM,
    tag: TAG.H6,
    text: 'Heading with h6',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};

export const Caption: Story = {
  args: {
    size: SIZE.MEDIUM,
    tag: TAG.H1,
    text: 'Heading with h6',
    caption: 'Caption Text',
  },
  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(TAG),
      control: { type: 'radio' },
    },
  },
};
