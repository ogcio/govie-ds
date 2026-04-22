import type { Meta, StoryObj } from '@storybook/react-vite';
import _ from 'lodash';
import { Stack } from '../stack/stack';
import { Direction, AlignItems, Justify } from '../atoms/utilities';
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

const meta: Meta<typeof Stack> = {
  ...stackMeta,
  title: 'Layout/Stack',
};

export default meta;
type Story = StoryObj<typeof meta>;

const itemClasses =
  'gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center';

export const Default: Story = {
  ...stackDefault,
  tags: ['skip-playwright'],
  render: ({ direction, gap, align, justify, wrap, dataTestId }) => (
    <Stack
      direction={direction}
      gap={gap}
      align={align}
      justify={justify}
      wrap={wrap}
      dataTestId={dataTestId}
    >
      <div className={itemClasses}>Item 1</div>
      <div className={itemClasses}>Item 2</div>
      <div className={itemClasses}>Item 3</div>
    </Stack>
  ),
};

export const Directions: Story = {
  ...stackDirections,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-6">
      {_.map(Direction, (direction) => (
        <div key={direction}>
          <p className="gi-text-sm gi-font-bold gi-mb-2">{direction}</p>
          <Stack
            dataTestId={`stack-direction-${direction}`}
            direction={direction}
            gap={2}
          >
            <div className={itemClasses}>Item 1</div>
            <div className={itemClasses}>Item 2</div>
            <div className={itemClasses}>Item 3</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const Alignments: Story = {
  ...stackAlignments,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-6">
      {_.map(AlignItems, (alignment) => (
        <div key={alignment}>
          <p className="gi-text-sm gi-font-bold gi-mb-2">{alignment}</p>
          <Stack
            dataTestId={`stack-align-${alignment}`}
            direction="row"
            gap={2}
            align={alignment}
            className="gi-h-[120px]"
          >
            <div className={itemClasses}>Item 1</div>
            <div className="gi-bg-gray-300 gi-p-2 gi-h-[80px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">
              Tall
            </div>
            <div className={itemClasses}>Item 3</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const Justifications: Story = {
  ...stackJustifications,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-6">
      {_.map(Justify, (justification) => (
        <div key={justification}>
          <p className="gi-text-sm gi-font-bold gi-mb-2">{justification}</p>
          <Stack
            dataTestId={`stack-justify-${justification}`}
            direction="row"
            gap={2}
            justify={justification}
          >
            <div className={itemClasses}>Item 1</div>
            <div className={itemClasses}>Item 2</div>
            <div className={itemClasses}>Item 3</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const GapScale: Story = {
  ...stackGapScale,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-6">
      {_.map([0, 1, 2, 4, 6, 8], (gap) => (
        <div key={gap}>
          <p className="gi-text-sm gi-font-bold gi-mb-2">gap={gap}</p>
          <Stack dataTestId={`stack-gap-${gap}`} direction="row" gap={gap}>
            <div className={itemClasses}>Item 1</div>
            <div className={itemClasses}>Item 2</div>
            <div className={itemClasses}>Item 3</div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const Responsive: Story = {
  ...stackResponsive,
  render: ({
    direction,
    gap,
    align,
    justify,
    wrap,
    dataTestId,
    role,
    ariaLabel,
  }) => (
    <Stack
      direction={direction}
      gap={gap}
      align={align}
      justify={justify}
      wrap={wrap}
      dataTestId={dataTestId}
      ariaLabel={ariaLabel}
      role={role}
    >
      <div className={itemClasses}>Item 1</div>
      <div className={itemClasses}>Item 2</div>
      <div className={itemClasses}>Item 3</div>
    </Stack>
  ),
};

export const Wrapped: Story = {
  ...stackWrapped,
  render: () => (
    <Stack dataTestId="stack-wrap-test" direction="row" gap={2} wrap>
      {_.map(_.range(1, 13), (index) => (
        <div key={index} className={itemClasses}>
          Item {index}
        </div>
      ))}
    </Stack>
  ),
};
