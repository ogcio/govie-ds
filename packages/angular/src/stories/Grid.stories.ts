import type { StoryObj } from '@storybook/angular';
import Grid from '../atoms/Grid';
import {
  gridMeta,
  Default as gridDefault,
  ResponsiveGap as gridResponsiveGap,
  ResponsiveColumns as gridResponsiveColumns,
  ResponsiveSize as gridResponsiveSize,
  Nested as gridNested,
  ColumnOverride as gridColumnOverride,
} from '../atoms/storybook/Grid.meta';

const meta = {
  ...gridMeta,
  title: 'Layout/Grid',
};

export default meta;

const itemClasses = 'gi-bg-gray-300 gi-p-1 gi-flex gi-items-center gi-justify-center gi-font-primary gi-rounded';

export const Default: StoryObj = {
  ...gridDefault,
  render: (props) => ({
    props: { ...props, itemClasses },
    moduleMetadata: { imports: [Grid] },
    template: `
      <gi-grid [container]="container" [columns]="columns" [gap]="gap" [role]="role" [ariaLabel]="ariaLabel" [dataTestId]="dataTestId">
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-1'">1</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-2'">2</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-3'">3</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-4'">4</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-5'">5</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-6'">6</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-7'">7</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-8'">8</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-9'">9</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-10'">10</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-11'">11</gi-grid>
        <gi-grid [size]="size" [className]="itemClasses" [dataTestId]="'grid-item-12'">12</gi-grid>
      </gi-grid>
    `,
  }),
};

export const ResponsiveGap: StoryObj = {
  ...gridResponsiveGap,
  render: (props) => ({
    props: { ...props, itemClasses },
    moduleMetadata: { imports: [Grid] },
    template: `
      <gi-grid [container]="true" [gap]="gap" [dataTestId]="dataTestId">
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-gap-item-1'">1</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-gap-item-2'">2</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-gap-item-3'">3</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-gap-item-4'">4</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-gap-item-5'">5</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-gap-item-6'">6</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-gap-item-7'">7</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-gap-item-8'">8</gi-grid>
      </gi-grid>
    `,
  }),
};

export const ResponsiveColumns: StoryObj = {
  ...gridResponsiveColumns,
  render: (props) => ({
    props: { ...props, itemClasses },
    moduleMetadata: { imports: [Grid] },
    template: `
      <gi-grid [container]="true" [columns]="columns" [gap]="gap" [dataTestId]="dataTestId">
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-1'">1</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-2'">2</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-3'">3</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-4'">4</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-5'">5</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-6'">6</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-7'">7</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-8'">8</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-9'">9</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-10'">10</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-11'">11</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-rcol-12'">12</gi-grid>
      </gi-grid>
    `,
  }),
};

export const ResponsiveSize: StoryObj = {
  ...gridResponsiveSize,
  render: (props) => ({
    props: {
      ...props,
      itemClasses,
      contentSize: { base: 4, xs: 4, sm: 4, md: 6, lg: 8 },
      sidebarSize: { base: 4, xs: 4, sm: 2, md: 2, lg: 4 },
      footerSize: { base: 4, xs: 4, sm: 6, md: 8, lg: 12 },
    },
    moduleMetadata: { imports: [Grid] },
    template: `
      <gi-grid [container]="true" [gap]="gap" [dataTestId]="dataTestId">
        <gi-grid [size]="contentSize" [className]="itemClasses" [dataTestId]="'grid-rsize-content'">Content</gi-grid>
        <gi-grid [size]="sidebarSize" [className]="itemClasses" [dataTestId]="'grid-rsize-sidebar'">Sidebar</gi-grid>
        <gi-grid [size]="footerSize" [className]="itemClasses" [dataTestId]="'grid-rsize-footer'">Footer</gi-grid>
      </gi-grid>
    `,
  }),
};

export const Nested: StoryObj = {
  ...gridNested,
  render: (props) => ({
    props: {
      ...props,
      itemClasses,
      mainSize: { xs: 4, lg: 8 },
      sidebarSize: { xs: 4, lg: 4 },
    },
    moduleMetadata: { imports: [Grid] },
    template: `
      <gi-grid [container]="true" [gap]="gap" [dataTestId]="dataTestId">
        <gi-grid [size]="mainSize">
          <gi-grid [container]="true" [gap]="2" [dataTestId]="'grid-nested-inner'">
            <gi-grid [className]="itemClasses" [dataTestId]="'grid-nested-item-1'">1</gi-grid>
            <gi-grid [className]="itemClasses" [dataTestId]="'grid-nested-item-2'">2</gi-grid>
            <gi-grid [className]="itemClasses" [dataTestId]="'grid-nested-item-3'">3</gi-grid>
            <gi-grid [className]="itemClasses" [dataTestId]="'grid-nested-item-4'">4</gi-grid>
          </gi-grid>
        </gi-grid>
        <gi-grid [size]="sidebarSize" [className]="itemClasses">5</gi-grid>
      </gi-grid>
    `,
  }),
};

export const ColumnOverride: StoryObj = {
  ...gridColumnOverride,
  render: (props) => ({
    props: { ...props, itemClasses },
    moduleMetadata: { imports: [Grid] },
    template: `
      <gi-grid [container]="true" [columns]="columns" [gap]="gap" [dataTestId]="dataTestId">
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-col-1'">1</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-col-2'">2</gi-grid>
        <gi-grid [className]="itemClasses" [dataTestId]="'grid-col-3'">3</gi-grid>
      </gi-grid>
    `,
  }),
};
