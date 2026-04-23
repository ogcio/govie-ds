import type { Meta, StoryObj } from '@storybook/react-vite';
import { MaxWidth } from '../atoms/Container';
import { Container } from '../container/container.js';
import { map } from 'lodash';
import {
  containerMeta,
  Default as defaultStory,
  WithInset as withInset,
  GuttersOnAndOff as guttersOnAndOff,
  AllMaxWidths as allMaxWidths,
} from '../atoms/storybook/Container.meta';

const meta: Meta<typeof Container> = {
  ...containerMeta,
  title: 'Layout/Container',
  component: Container,
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = { ...defaultStory };

export const WithInset: Story = { ...withInset };

export const GuttersOnAndOff: Story = {
  ...guttersOnAndOff,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-8">
      <p>Try scaling the viewport to see the responsive gutters in action.</p>
      <div className="gi-flex gi-flex-col gi-gap-2">
        <span className="gi-font-bold gi-font-primary">gutters: true</span>
        <Container gutters>Sample content with horizontal gutters.</Container>
      </div>
      <div className="gi-flex gi-flex-col gi-gap-2">
        <span className="gi-font-bold gi-font-primary">gutters: false</span>
        <Container gutters={false}>
          Sample content without horizontal gutters.
        </Container>
      </div>
    </div>
  ),
};

export const AllMaxWidths: Story = {
  ...allMaxWidths,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-8">
      {map(MaxWidth, (maxWidth) => (
        <div key={maxWidth} className="gi-flex gi-flex-col gi-gap-2">
          <span className="gi-font-bold gi-font-primary">{maxWidth}</span>
          <Container
            maxWidth={maxWidth}
            className="gi-border-sm gi-border-solid gi-border-color-border-system-neutral-subtle"
          >
            Sample content for max width {maxWidth}.
          </Container>
        </div>
      ))}
    </div>
  ),
};
