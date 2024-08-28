import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './link.html?raw';
import { LinkProps } from './link.schema';

const macro = { name: 'govieLink', html };

const Link = renderComponent<LinkProps>(macro);

const meta = {
  component: Link,
  title: 'navigation/Link',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    label: 'Link text',
  },
  //   argTypes: {
  //     label: {
  //       control: { type: 'text' },
  //     },
  //     href: {
  //       control: { type: 'text' },
  //     },
  //   },
};
