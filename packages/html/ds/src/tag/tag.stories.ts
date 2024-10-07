import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './tag.html?raw';
import { TagProps, TagType } from './tag.schema';

const macro = { name: 'govieTag', html };

const Tag = renderComponent<TagProps>(macro);

const meta = {
  component: Tag,
  title: 'Typography/Tag',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Tag component used to display a small label or status indicator in HTML. The type of the tag changes its color, and the text is used to display a label.',
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    text: {
      control: 'text',
      description:
        'The text displayed inside the tag. This is the content of the tag, typically a status or label.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Completed' },
        category: 'Content',
      },
      type: { name: 'string', required: true },
    },
    type: {
      control: {
        type: 'select',
      },
      options: Object.values(TagType),
      description:
        'Defines the visual style and color of the tag. Select from predefined options like default, grey, green, blue, etc.',
      table: {
        type: { summary: 'TagType' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
  },
  args: {
    text: 'Completed',
    type: TagType.info,
  },
};
