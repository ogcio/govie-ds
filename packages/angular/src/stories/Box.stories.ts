import type { StoryObj } from '@storybook/angular';
import Box from '../atoms/Box';
import {
  boxMeta,
  Default as boxDefault,
  Spacing as boxSpacing,
  Background as boxBackground,
  Sizing as boxSizing,
} from '../atoms/storybook/Box.meta';

const meta = {
  ...boxMeta,
  title: 'Layout/Box',
};

export default meta;

export const Default: StoryObj = {
  ...boxDefault,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Box] },
    template: `
      <gi-box [id]="id" [dataTestId]="dataTestId" [className]="className">
        Box content
      </gi-box>
    `,
  }),
};

export const Spacing: StoryObj = {
  ...boxSpacing,
  render: () => ({
    moduleMetadata: { imports: [Box] },
    template: `
      <gi-box [className]="'gi-flex gi-flex-col gi-gap-4'">
        <gi-box>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gi-p-2</p>
          <gi-box [className]="'gi-p-2 gi-bg-gray-100'" [dataTestId]="'box-spacing'">Padding 2</gi-box>
        </gi-box>
        <gi-box>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gi-p-4</p>
          <gi-box [className]="'gi-p-4 gi-bg-gray-100'">Padding 4</gi-box>
        </gi-box>
        <gi-box>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gi-p-8</p>
          <gi-box [className]="'gi-p-8 gi-bg-gray-100'">Padding 8</gi-box>
        </gi-box>
        <gi-box>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gi-m-4 gi-p-4</p>
          <gi-box [className]="'gi-m-4 gi-p-4 gi-bg-gray-100'">Margin + Padding</gi-box>
        </gi-box>
      </gi-box>
    `,
  }),
};

export const Background: StoryObj = {
  ...boxBackground,
  render: () => ({
    moduleMetadata: { imports: [Box] },
    template: `
      <gi-box [className]="'gi-flex gi-flex-col gi-gap-4'">
        <gi-box>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gi-bg-gray-100</p>
          <gi-box [className]="'gi-bg-gray-100 gi-p-4'" [dataTestId]="'box-background'">Gray 100</gi-box>
        </gi-box>
        <gi-box>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gi-bg-emerald-700 gi-text-white</p>
          <gi-box [className]="'gi-bg-emerald-700 gi-text-white gi-p-4'">Emerald 700</gi-box>
        </gi-box>
        <gi-box>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gi-bg-emerald-800 gi-text-white</p>
          <gi-box [className]="'gi-bg-emerald-800 gi-text-white gi-p-4'">Emerald 800</gi-box>
        </gi-box>
      </gi-box>
    `,
  }),
};

export const Sizing: StoryObj = {
  ...boxSizing,
  render: () => ({
    moduleMetadata: { imports: [Box] },
    template: `
      <gi-box [className]="'gi-flex gi-flex-col gi-gap-4'">
        <gi-box>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gi-w-32 gi-h-16</p>
          <gi-box [className]="'gi-w-32 gi-h-16 gi-bg-gray-100 gi-flex gi-items-center gi-justify-center'" [dataTestId]="'box-sizing'">32 x 16</gi-box>
        </gi-box>
        <gi-box>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gi-w-64 gi-h-32</p>
          <gi-box [className]="'gi-w-64 gi-h-32 gi-bg-gray-100 gi-flex gi-items-center gi-justify-center'">64 x 32</gi-box>
        </gi-box>
        <gi-box>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gi-w-full gi-h-24</p>
          <gi-box [className]="'gi-w-full gi-h-24 gi-bg-gray-100 gi-flex gi-items-center gi-justify-center'">Full width x 24</gi-box>
        </gi-box>
      </gi-box>
    `,
  }),
};
