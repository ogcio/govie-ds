import type { Meta, StoryObj } from "@storybook/react";
import { Alert, alertVariants } from "./alert.js";

const meta = {
	title: "application/Alert",
	component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Alert",
        children: "Alert description",
	},
};

// @ts-expect-error: we don't need args for this story
export const Variant: Story = {
	render: () => (
		<div className="gi-flex gi-flex-col gi-gap-4">
			{Object.keys(alertVariants.variants.variant).map((variant) => (
				<Alert
					key={variant}
					variant={variant as keyof typeof alertVariants.variants.variant}
					title={variant}
				>
                    Alert description
                </Alert>
			))}
		</div>
	),
};
