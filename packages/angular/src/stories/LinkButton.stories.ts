import type { StoryObj } from '@storybook/angular';
import LinkButton from '../atoms/LinkButton';
import Box from '../atoms/Box';
import { linkButtonMeta, Default as defaultStory } from '../atoms/storybook/LinkButton.meta';

const meta = {
  ...linkButtonMeta,
  title: 'Navigation/LinkButton',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [LinkButton, Box],
    },
    template: `
      <gi-box [className]="appearance === 'light' ? 'gi-p-4 gi-bg-black gi-w-fit' : 'gi-p-4 gi-w-fit'">
        <gi-link-button [id]="id" [dataTestId]="dataTestId" [href]="href" [variant]="variant" [appearance]="appearance" [size]="size">LinkButton</gi-link-button>
      </gi-box>
    `,
  }),
};
