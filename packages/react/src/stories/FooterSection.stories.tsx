import type { Meta, StoryObj } from '@storybook/react-vite';
import FooterSection from '@/FooterSection';
import * as stories from '@/atoms/storybook/FooterSection.meta';
import argTypes from '@/atoms/storybook/argTypes';

const meta = {
  ...stories.meta,
  argTypes: {
    ...stories.meta.argTypes,
    className: {
      ...argTypes.class,
      description: 'Additional CSS classes, merged with the classes of the inner content container.',
    },
    style: {
      ...argTypes.style,
      table: { type: { summary: 'React.CSSProperties' } },
    },
  },
  title: 'Layout/Footer/FooterSection',
  component: FooterSection,
} satisfies Meta<typeof FooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => <FooterSection {...props}>Footer section content</FooterSection>,
};
