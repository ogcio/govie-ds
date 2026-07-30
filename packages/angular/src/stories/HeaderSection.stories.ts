import type { StoryObj } from '@storybook/angular';
import {
  headerSectionMeta,
  Default as defaultStory,
  Utility as utilityStory,
} from '@/atoms/storybook/HeaderSection.meta';
import { HeaderSection } from '@/atoms';

const meta = {
  ...headerSectionMeta,
  title: 'Layout/Header/HeaderSection',
};

export default meta;

const renderHeaderSection = (props: Record<string, unknown>) => ({
  props,
  moduleMetadata: {
    imports: [HeaderSection],
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
