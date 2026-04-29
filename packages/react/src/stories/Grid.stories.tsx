import type { Meta, StoryObj } from '@storybook/react-vite';
import _ from 'lodash';
import { Grid } from '../atoms/index';
import {
  gridMeta,
  Default as gridDefault,
  ResponsiveGap as gridResponsiveGap,
  ResponsiveColumns as gridResponsiveColumns,
  ResponsiveSize as gridResponsiveSize,
  Nested as gridNested,
  ColumnOverride as gridColumnOverride,
} from '../atoms/storybook/Grid.meta';

const meta: Meta<typeof Grid> = {
  ...gridMeta,
  title: 'Layout/Grid',
};

export default meta;
type Story = StoryObj<typeof meta>;

const itemClasses =
  'gi-bg-gray-300 gi-p-1 gi-flex gi-items-center gi-justify-center gi-font-primary gi-rounded';

export const Default: Story = {
  ...gridDefault,
  render: ({ container, columns, gap, size, role, ariaLabel, dataTestId }) => (
    <Grid
      container={container}
      columns={columns}
      gap={gap}
      role={role}
      ariaLabel={ariaLabel}
      dataTestId={dataTestId}
    >
      {_.map(_.range(1, 13), (index) => (
        <Grid
          key={index}
          size={size}
          className={itemClasses}
          dataTestId={`grid-item-${index}`}
        >
          {index}
        </Grid>
      ))}
    </Grid>
  ),
};

export const ResponsiveGap: Story = {
  ...gridResponsiveGap,
  render: ({ gap, dataTestId }) => (
    <Grid container gap={gap} dataTestId={dataTestId}>
      {_.map(_.range(1, 9), (index) => (
        <Grid
          key={index}
          className={itemClasses}
          dataTestId={`grid-gap-item-${index}`}
        >
          {index}
        </Grid>
      ))}
    </Grid>
  ),
};

export const ResponsiveColumns: Story = {
  ...gridResponsiveColumns,
  render: ({ gap, columns, dataTestId }) => (
    <Grid container columns={columns} gap={gap} dataTestId={dataTestId}>
      {_.map(_.range(1, 13), (index) => (
        <Grid
          key={index}
          className={itemClasses}
          dataTestId={`grid-rcol-${index}`}
        >
          {index}
        </Grid>
      ))}
    </Grid>
  ),
};

export const ResponsiveSize: Story = {
  ...gridResponsiveSize,
  render: ({ gap, dataTestId }) => (
    <Grid container gap={gap} dataTestId={dataTestId}>
      <Grid
        size={{ base: 4, xs: 4, sm: 4, md: 6, lg: 8 }}
        className={itemClasses}
        dataTestId="grid-rsize-content"
      >
        Content
      </Grid>
      <Grid
        size={{ base: 4, xs: 4, sm: 2, md: 2, lg: 4 }}
        className={itemClasses}
        dataTestId="grid-rsize-sidebar"
      >
        Sidebar
      </Grid>
      <Grid
        size={{ base: 4, xs: 4, sm: 6, md: 8, lg: 12 }}
        className={itemClasses}
        dataTestId="grid-rsize-footer"
      >
        Footer
      </Grid>
    </Grid>
  ),
};

export const Nested: Story = {
  ...gridNested,
  render: ({ gap, dataTestId }) => (
    <Grid container gap={gap} dataTestId={dataTestId}>
      <Grid size={{ xs: 4, lg: 8 }}>
        <Grid container gap={2} dataTestId="grid-nested-inner">
          {_.map(_.range(1, 5), (index) => (
            <Grid
              key={index}
              className={itemClasses}
              dataTestId={`grid-nested-item-${index}`}
            >
              {index}
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid size={{ xs: 4, lg: 4 }} className={itemClasses}>
        5
      </Grid>
    </Grid>
  ),
};

export const ColumnOverride: Story = {
  ...gridColumnOverride,
  render: ({ gap, columns, dataTestId }) => (
    <Grid container columns={columns} gap={gap} dataTestId={dataTestId}>
      {_.map(_.range(1, 4), (index) => (
        <Grid
          key={index}
          className={itemClasses}
          dataTestId={`grid-col-${index}`}
        >
          {index}
        </Grid>
      ))}
    </Grid>
  ),
};
