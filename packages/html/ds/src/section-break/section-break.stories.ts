import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './section-break.html?raw';
import { SectionBreakProps, SizeEnum } from './section-break.schema';

const macro = { name: 'govieSectionBreak', html };

const SectionBreak = renderComponent<SectionBreakProps>(macro);

const meta = {
  component: SectionBreak,
  title: 'Typography/SectionBreak',
  parameters: {
    macro,
    docs: {
      description: {
        docs: {
          component:
            'Section Break component to create a thematic break between sections of content.',
        },
      },
    },
  },
} satisfies Meta<typeof SectionBreak>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SizeEnum),
      type: { name: 'string', required: false },
      description: 'Specifies the size of the section break margin.',
    },
  },
  args: {
    size: SizeEnum.MEDIUM,
  },
};
