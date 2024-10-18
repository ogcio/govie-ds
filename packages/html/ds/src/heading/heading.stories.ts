import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './heading.html?raw';
import { Size, Tag } from './heading.schema';
import { HeadingProps } from './heading.schema';

const path = import.meta.url.split('/heading')[0];

const macro = { name: 'govieHeading', html, path };

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
    tag: Tag.H1,
    text: 'Heading',
    caption: '',
  },
  argTypes: {
    size: {
      options: Object.values(Size),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(Tag),
      control: { type: 'radio' },
    },
  },
};

export const Small: Story = {
  args: {
    tag: Tag.H6,
    text: 'Small heading',
  },
  argTypes: {
    size: {
      options: Object.values(Size),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(Tag),
      control: { type: 'radio' },
    },
  },
};

export const Medium: Story = {
  args: {
    size: Size.Medium,
    tag: Tag.H3,
    text: 'Medium heading',
  },
  argTypes: {
    size: {
      options: Object.values(Size),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(Tag),
      control: { type: 'radio' },
    },
  },
};

export const Large: Story = {
  args: {
    size: Size.Large,
    tag: Tag.H1,
    text: 'Large heading',
  },
  argTypes: {
    size: {
      options: Object.values(Size),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(Tag),
      control: { type: 'radio' },
    },
  },
};

export const ExtraLarge: Story = {
  args: {
    size: Size.ExtraLarge,
    tag: Tag.H1,
    text: 'Extra large heading',
  },
  argTypes: {
    size: {
      options: Object.values(Size),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(Tag),
      control: { type: 'radio' },
    },
  },
};

export const Caption: Story = {
  args: {
    size: Size.Medium,
    tag: Tag.H1,
    text: 'Heading with h6',
    caption: 'Caption Text',
  },
  argTypes: {
    size: {
      options: Object.values(Size),
      control: { type: 'radio' },
    },
    tag: {
      options: Object.values(Tag),
      control: { type: 'radio' },
    },
  },
};
