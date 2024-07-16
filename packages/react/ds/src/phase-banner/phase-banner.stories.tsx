import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react/jsx-runtime';
import { Link } from '../link/link.js';
import { PhaseBanner } from './phase-banner.js';

const meta = {
  title: 'navigation/PhaseBanner',
  component: PhaseBanner,
} satisfies Meta<typeof PhaseBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alpha: Story = {
  args: {
    level: 'alpha',
    children: 'This is an alpha service.',
  },
};

export const Beta: Story = {
  args: {
    level: 'beta',
    children: (
      <Fragment>
        This part of GOV.IE is being rebuilt -{' '}
        <Link href="https://example.com">find out what that means</Link>
      </Fragment>
    ),
  },
};
