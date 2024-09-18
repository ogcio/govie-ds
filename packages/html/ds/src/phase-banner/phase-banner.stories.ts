import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './phase-banner.html?raw';
import { PhaseBannerProps, LevelEnum } from './phase-banner.schema';

const macro = { name: 'goviePhaseBanner', html };

const PhaseBanner = renderComponent<PhaseBannerProps>(macro);

const meta = {
  component: PhaseBanner,
  title: 'Typography/PhaseBanner',
  parameters: {
    macro,
  },
} satisfies Meta<typeof PhaseBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text content of the phase banner.',
    },
    level: {
      control: 'radio',
      options: Object.values(LevelEnum),
      type: { name: 'string', required: false },
      description: 'Specifies the level of the phase banner.',
    },
  },
  args: {
    content: 'This is a phase banner.',
    level: LevelEnum.Alpha,
  },
};
