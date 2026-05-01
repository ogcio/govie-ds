import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '../atoms/Box';
import {
  boxMeta,
  Default as boxDefault,
  Spacing as boxSpacing,
  Background as boxBackground,
  Sizing as boxSizing,
} from '../atoms/storybook/Box.meta';

const meta: Meta<typeof Box> = {
  ...boxMeta,
  title: 'Layout/Box',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...boxDefault,
};

export const Spacing: Story = {
  ...boxSpacing,
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-4">
      <Box>
        <p className="gi-text-sm gi-font-bold gi-mb-2">gi-p-2</p>
        <Box className="gi-p-2 gi-bg-gray-100" dataTestId="box-spacing">
          Padding 2
        </Box>
      </Box>
      <Box>
        <p className="gi-text-sm gi-font-bold gi-mb-2">gi-p-4</p>
        <Box className="gi-p-4 gi-bg-gray-100">Padding 4</Box>
      </Box>
      <Box>
        <p className="gi-text-sm gi-font-bold gi-mb-2">gi-p-8</p>
        <Box className="gi-p-8 gi-bg-gray-100">Padding 8</Box>
      </Box>
      <Box>
        <p className="gi-text-sm gi-font-bold gi-mb-2">gi-m-4 gi-p-4</p>
        <Box className="gi-m-4 gi-p-4 gi-bg-gray-100">Margin + Padding</Box>
      </Box>
    </Box>
  ),
};

export const Background: Story = {
  ...boxBackground,
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-4">
      <Box>
        <p className="gi-text-sm gi-font-bold gi-mb-2">gi-bg-gray-100</p>
        <Box className="gi-bg-gray-100 gi-p-4" dataTestId="box-background">
          Gray 100
        </Box>
      </Box>
      <Box>
        <p className="gi-text-sm gi-font-bold gi-mb-2">
          gi-bg-emerald-700 gi-text-white
        </p>
        <Box className="gi-bg-emerald-700 gi-text-white gi-p-4">
          Emerald 700
        </Box>
      </Box>
      <Box>
        <p className="gi-text-sm gi-font-bold gi-mb-2">
          gi-bg-emerald-800 gi-text-white
        </p>
        <Box className="gi-bg-emerald-800 gi-text-white gi-p-4">
          Emerald 800
        </Box>
      </Box>
    </Box>
  ),
};

export const Sizing: Story = {
  ...boxSizing,
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-4">
      <Box>
        <p className="gi-text-sm gi-font-bold gi-mb-2">gi-w-32 gi-h-16</p>
        <Box
          className="gi-w-32 gi-h-16 gi-bg-gray-100 gi-flex gi-items-center gi-justify-center"
          dataTestId="box-sizing"
        >
          32 x 16
        </Box>
      </Box>
      <Box>
        <p className="gi-text-sm gi-font-bold gi-mb-2">gi-w-64 gi-h-32</p>
        <Box className="gi-w-64 gi-h-32 gi-bg-gray-100 gi-flex gi-items-center gi-justify-center">
          64 x 32
        </Box>
      </Box>
      <Box>
        <p className="gi-text-sm gi-font-bold gi-mb-2">gi-w-full gi-h-24</p>
        <Box className="gi-w-full gi-h-24 gi-bg-gray-100 gi-flex gi-items-center gi-justify-center">
          Full width x 24
        </Box>
      </Box>
    </Box>
  ),
};
