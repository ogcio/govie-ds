import type { Meta, StoryObj } from "@storybook/react";
import { meta as govieMeta } from "@ogcio-ds/theme-govie";
import { Shadow } from "./shadow.js";

const meta = {
  title: "Shadow",
  component: Shadow,
} satisfies Meta<typeof Shadow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "shadow/100",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  },
};
