import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent } from 'storybook/test';
import { Details } from './details.js';

const meta = {
  title: 'Typography/Details',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Make a page easier to scan by letting users reveal more detailed information only if they need it.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text displayed in the summary of the details.',
    },
    name: {
      control: 'text',
      description:
        'The name attribute specifies a group name — give multiple "details" elements the same name value to group them. Only one of the grouped "details" elements can be open at a time — opening one will cause another to close',
    },
    children: {
      control: 'text',
      description:
        'The content inside the details element, displayed when the element is open.',
    },
    open: {
      control: 'boolean',
      description:
        'The details are shown when this attribute exists, or hidden when this attribute is absent. By default this attribute is absent which means the details are not visible at the first time.',
    },
  },
  component: Details,
  decorators: (Story) => (
    <div className="gi-pl-6 gi-pt-6 gi-h-[200px]">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Details>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'Help with Nationality',
    children:
      'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should toggle open state on summary click', async () => {
      const detailsElement = canvas.getByTestId('govie-details');
      const summaryElement = canvas.getByTestId('govie-details-summary');

      expect(detailsElement).toBeInTheDocument();
      expect(detailsElement).not.toHaveAttribute('open');

      await userEvent.click(summaryElement);
      expect(detailsElement).toHaveAttribute('open');

      await userEvent.click(summaryElement);
      expect(detailsElement).not.toHaveAttribute('open');
    });
  },
};

export const WithMultipleDetailsGrouped: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="gi-flex gi-gap-2 gi-flex-col">
      <Details label="Help with Nationality" name="group1" open={false}>
        We need to know your nationality so we can work out which elections
        you’re entitled to vote in. If you cannot provide your nationality,
        you’ll have to send copies of identity documents through the post.
      </Details>
      <Details
        label="More Information on Nationality"
        name="group1"
        open={false}
      >
        Your nationality helps us determine your eligibility for specific voting
        rights. Without it, you may need to submit additional documentation.
      </Details>
      <Details label="Help with Residency" name="group2" open={false}>
        Residency information is necessary to assign you to the correct
        electoral district. Please ensure it is accurate and up to date.
      </Details>
      <Details label="More Information on Residency" name="group2" open={false}>
        Providing your residency details ensures we comply with local election
        laws. If you’re unsure of your residency status, contact support.
      </Details>
    </div>
  ),
  args: {
    label: '',
    children: '',
  },
};

export const StartsOpen: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'This Details Starts Open',
    children: `This details component is open by default when the page loads. Use the
    "open" attribute to control the initial state.`,
    open: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render with open set to true', async () => {
      const detailsElement = canvas.getByTestId('govie-details');
      expect(detailsElement).toBeInTheDocument();
      expect(detailsElement).toHaveAttribute('open');
    });
  },
};

export const TestLabel: Story = {
  tags: ['skip-playwright'],
  args: {
    label: 'Help with Details',
    children: 'Here is the body content of the details element.',
    open: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render the details element with the correct label',
      async () => {
        const detailsElement = canvas.getByTestId('govie-details');
        const summaryElement = canvas.getByTestId('govie-details-summary');
        expect(detailsElement).toBeInTheDocument();
        expect(summaryElement).toHaveTextContent('Help with Details');
      },
    );
  },
};

export const TestChildrenVisible: Story = {
  tags: ['skip-playwright'],
  args: {
    label: 'Help with Details',
    open: true,
    children: 'Here is the body content of the details element.',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render the children inside the details element',
      async () => {
        const contentElement = canvas.getByText(
          'Here is the body content of the details element.',
        );
        expect(contentElement).toBeInTheDocument();
      },
    );
  },
};
