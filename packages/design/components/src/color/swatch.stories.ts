import type { Meta, StoryObj } from "@storybook/react";
import { meta as govieMeta } from "@ogcio-ds/theme-govie";
import { Swatch } from "./swatch.js";

const meta = {
  title: "Swatch",
  component: Swatch,
} satisfies Meta<typeof Swatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "Red",
    value: govieMeta.light.resolved.primitive.color.red["500"].$value,
  },
};

export const HideValue: Story = {
  args: {
    name: "Blue",
    value: govieMeta.light.resolved.primitive.color.blue["500"].$value,
    hideValue: true,
  },
};
