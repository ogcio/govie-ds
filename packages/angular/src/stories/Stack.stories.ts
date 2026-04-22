import type { StoryObj } from '@storybook/angular';
import Stack from '../atoms/Stack';
import {
  stackMeta,
  Default as stackDefault,
  Directions as stackDirections,
  Alignments as stackAlignments,
  Justifications as stackJustifications,
  GapScale as stackGapScale,
  Responsive as stackResponsive,
  Wrapped as stackWrapped,
} from '../atoms/storybook/Stack.meta';

const meta = {
  ...stackMeta,
  title: 'Layout/Stack',
};

export default meta;

const itemClasses =
  'gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center gi-font-primary';

export const Default: StoryObj = {
  ...stackDefault,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Stack] },
    template: `
      <gi-stack [dataTestId]="dataTestId" [direction]="direction" [gap]="gap" [align]="align" [justify]="justify" [wrap]="wrap">
        <div class="${itemClasses}">Item 1</div>
        <div class="${itemClasses}">Item 2</div>
        <div class="${itemClasses}">Item 3</div>
      </gi-stack>
    `,
  }),
};

export const Directions: StoryObj = {
  ...stackDirections,
  render: () => ({
    moduleMetadata: { imports: [Stack] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-6">
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2">row</p>
          <gi-stack [dataTestId]="'stack-direction-row'" direction="row" [gap]="2">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2">column</p>
          <gi-stack [dataTestId]="'stack-direction-column'" direction="column" [gap]="2">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
      </div>
    `,
  }),
};

export const Alignments: StoryObj = {
  ...stackAlignments,
  render: () => ({
    moduleMetadata: { imports: [Stack] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-6">
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">start</p>
          <gi-stack [dataTestId]="'stack-align-start'" direction="row" [gap]="2" align="start" [className]="'gi-h-[120px]'">
            <div class="${itemClasses}">Item 1</div>
            <div class="gi-bg-gray-300 gi-p-2 gi-h-[80px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Tall</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">center</p>
          <gi-stack [dataTestId]="'stack-align-center'" direction="row" [gap]="2" align="center" [className]="'gi-h-[120px]'">
            <div class="${itemClasses}">Item 1</div>
            <div class="gi-bg-gray-300 gi-p-2 gi-h-[80px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Tall</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">end</p>
          <gi-stack [dataTestId]="'stack-align-end'" direction="row" [gap]="2" align="end" [className]="'gi-h-[120px]'">
            <div class="${itemClasses}">Item 1</div>
            <div class="gi-bg-gray-300 gi-p-2 gi-h-[80px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Tall</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">stretch</p>
          <gi-stack [dataTestId]="'stack-align-stretch'" direction="row" [gap]="2" align="stretch" [className]="'gi-h-[120px]'">
            <div class="${itemClasses}">Item 1</div>
            <div class="gi-bg-gray-300 gi-p-2 gi-h-[80px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Tall</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">baseline</p>
          <gi-stack [dataTestId]="'stack-align-baseline'" direction="row" [gap]="2" align="baseline" [className]="'gi-h-[120px]'">
            <div class="${itemClasses}">Item 1</div>
            <div class="gi-bg-gray-300 gi-p-2 gi-h-[80px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Tall</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
      </div>
    `,
  }),
};

export const Justifications: StoryObj = {
  ...stackJustifications,
  render: () => ({
    moduleMetadata: { imports: [Stack] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-6">
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">start</p>
          <gi-stack [dataTestId]="'stack-justify-start'" direction="row" [gap]="2" justify="start">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">center</p>
          <gi-stack [dataTestId]="'stack-justify-center'" direction="row" [gap]="2" justify="center">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">end</p>
          <gi-stack [dataTestId]="'stack-justify-end'" direction="row" [gap]="2" justify="end">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">between</p>
          <gi-stack [dataTestId]="'stack-justify-between'" direction="row" [gap]="2" justify="between">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">around</p>
          <gi-stack [dataTestId]="'stack-justify-around'" direction="row" [gap]="2" justify="around">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">evenly</p>
          <gi-stack [dataTestId]="'stack-justify-evenly'" direction="row" [gap]="2" justify="evenly">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
      </div>
    `,
  }),
};

export const GapScale: StoryObj = {
  ...stackGapScale,
  render: () => ({
    moduleMetadata: { imports: [Stack] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-6">
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gap=0</p>
          <gi-stack [dataTestId]="'stack-gap-0'" direction="row" [gap]="0">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gap=1</p>
          <gi-stack [dataTestId]="'stack-gap-1'" direction="row" [gap]="1">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gap=2</p>
          <gi-stack [dataTestId]="'stack-gap-2'" direction="row" [gap]="2">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gap=4</p>
          <gi-stack [dataTestId]="'stack-gap-4'" direction="row" [gap]="4">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gap=6</p>
          <gi-stack [dataTestId]="'stack-gap-6'" direction="row" [gap]="6">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
        <div>
          <p class="gi-text-sm gi-font-bold gi-mb-2 gi-font-primary">gap=8</p>
          <gi-stack [dataTestId]="'stack-gap-8'" direction="row" [gap]="8">
            <div class="${itemClasses}">Item 1</div>
            <div class="${itemClasses}">Item 2</div>
            <div class="${itemClasses}">Item 3</div>
          </gi-stack>
        </div>
      </div>
    `,
  }),
};

export const Responsive: StoryObj = {
  ...stackResponsive,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Stack] },
    template: `
      <gi-stack [dataTestId]="dataTestId" [direction]="direction" [gap]="gap" [align]="align" [justify]="justify" [role]="role" [ariaLabel]="ariaLabel">
        <div class="${itemClasses}">Item 1</div>
        <div class="${itemClasses}">Item 2</div>
        <div class="${itemClasses}">Item 3</div>
      </gi-stack>
    `,
  }),
};

export const Wrapped: StoryObj = {
  ...stackWrapped,
  render: () => ({
    moduleMetadata: { imports: [Stack] },
    template: `
      <gi-stack [dataTestId]="'stack-wrap-test'" direction="row" [gap]="2" [wrap]="true">
        <div class="${itemClasses}">Item 1</div>
        <div class="${itemClasses}">Item 2</div>
        <div class="${itemClasses}">Item 3</div>
        <div class="${itemClasses}">Item 4</div>
        <div class="${itemClasses}">Item 5</div>
        <div class="${itemClasses}">Item 6</div>
        <div class="${itemClasses}">Item 7</div>
        <div class="${itemClasses}">Item 8</div>
        <div class="${itemClasses}">Item 9</div>
        <div class="${itemClasses}">Item 10</div>
        <div class="${itemClasses}">Item 11</div>
        <div class="${itemClasses}">Item 12</div>
      </gi-stack>
    `,
  }),
};
