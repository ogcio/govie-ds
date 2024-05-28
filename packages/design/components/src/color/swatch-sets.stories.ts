import type { Meta, StoryObj } from "@storybook/react";
import { meta as govieMeta } from "@govie-ds/theme-govie";
import { SwatchSets } from "./swatch-sets.js";

const meta = {
  title: "SwatchSets",
  component: SwatchSets,
} satisfies Meta<typeof SwatchSets>;

export default meta;
type Story = StoryObj<typeof meta>;

type Token = {
  $type: string;
  $value: string;
};

function dtcgToSet(set: Record<string, Token>) {
  return Object.entries(set).map(([name, value]) => ({
    name,
    value: value.$value,
  }));
}

export const Primary: Story = {
  args: {
    sets: [
      {
        name: "Red",
        set: dtcgToSet(govieMeta.light.resolved.primitive.color.red),
      },
      {
        name: "Blue",
        set: dtcgToSet(govieMeta.light.resolved.primitive.color.blue),
      },
    ],
  },
};

export const HideValues: Story = {
  args: {
    sets: [
      {
        name: "Red",
        set: dtcgToSet(govieMeta.light.resolved.primitive.color.red),
      },
      {
        name: "Blue",
        set: dtcgToSet(govieMeta.light.resolved.primitive.color.blue),
      },
    ],
    hideValues: true,
  },
};
