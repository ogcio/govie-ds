import type { Meta, StoryObj } from "@storybook/react";
import { meta as govieMeta } from "@govie-ds/theme-govie";
import { SwatchSet } from "./swatch-set.js";

const meta = {
  title: "SwatchSet",
  component: SwatchSet,
} satisfies Meta<typeof SwatchSet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "Red",
    set: Object.entries(govieMeta.light.resolved.primitive.color.red).map(
      ([name, value]) => ({
        name,
        value: value.$value,
      })
    ),
  },
};

export const HideValues: Story = {
  args: {
    name: "Blue",
    set: Object.entries(govieMeta.light.resolved.primitive.color.blue).map(
      ([name, value]) => ({
        name,
        value: value.$value,
      })
    ),
    hideValues: true,
  },
};
