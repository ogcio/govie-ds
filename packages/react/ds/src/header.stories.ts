import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header.js";

const meta = {
  title: "Example/Header",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
