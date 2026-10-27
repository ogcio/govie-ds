import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/HeaderSection.meta';
import { GiHeaderSection } from '@/header/HeaderSection';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/HeaderSection',
  component: GiHeaderSection,
};

export default meta;

const renderHeaderSection = (props: Record<string, unknown>) => ({
  props,
  moduleMetadata: {
    imports: [GiHeaderSection],
  },
  template: `
    <gi-header-section
      [variant]="variant"
      [appearance]="appearance"
      [maxWidth]="maxWidth"
      [id]="id"
      [dataTestId]="dataTestId"
      [role]="role"
      [ariaLabel]="ariaLabel"
    >
      {{ children }}
    </gi-header-section>
  `,
});

export const Default: StoryObj = {
  ...stories.Default,
  render: renderHeaderSection,
};

export const Utility: StoryObj = {
  ...stories.Utility,
  render: renderHeaderSection,
};
