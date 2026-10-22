import type { StoryObj } from '@storybook/angular-vite';
import {
  headerSectionMeta,
  Default as defaultStory,
  Utility as utilityStory,
} from '@/atoms/storybook/HeaderSection.meta';
import { GiHeaderSection } from '@/header/HeaderSection';

const meta = {
  ...headerSectionMeta,
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
  ...defaultStory,
  render: renderHeaderSection,
};

export const Utility: StoryObj = {
  ...utilityStory,
  render: renderHeaderSection,
};
