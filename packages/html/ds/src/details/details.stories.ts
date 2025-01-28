import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './details.html?raw';
import { DetailsProps } from './details.schema';

const path = import.meta.url.split('/details')[0];

const macro = { name: 'govieDetails', html, path };

const Details = renderComponent<DetailsProps>(macro);

const meta = {
  component: Details,
  title: 'Typography/Details',
  parameters: {
    macro,
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
    startsOpen: {
      control: 'boolean',
      description:
        'The details are shown when this attribute exists, or hidden when this attribute is absent. By default this attribute is absent which means the details are not visible at the first time.',
    },
  },
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
};

export const WithMultipleDetailsGrouped: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: '',
    label: '',
  },
  render: () => `
    <div class="gi-flex gi-gap-2 gi-flex-col">
      <details class="gi-details" name="group1">
        <summary class="gi-details-summary">Help with Nationality</summary>
        <div class="gi-details-text">
          We need to know your nationality so we can work out which elections
          you’re entitled to vote in. If you cannot provide your nationality,
          you’ll have to send copies of identity documents through the post.
        </div>
      </details>
      <details class="gi-details" name="group1">
        <summary class="gi-details-summary">More Information on Nationality</summary>
        <div class="gi-details-text">
          Your nationality helps us determine your eligibility for specific voting
          rights. Without it, you may need to submit additional documentation.
        </div>
      </details>
      <details class="gi-details" name="group2">
        <summary class="gi-details-summary">Help with Residency</summary>
        <div class="gi-details-text">
          Residency information is necessary to assign you to the correct
          electoral district. Please ensure it is accurate and up to date.
        </div>
      </details>
      <details class="gi-details" name="group2">
        <summary class="gi-details-summary">More Information on Residency</summary>
        <div class="gi-details-text">
          Providing your residency details ensures we comply with local election
          laws. If you’re unsure of your residency status, contact support.
        </div>
      </details>
    </div>
  `,
};

export const StartsOpen: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'This Details Starts Open',
    children: `This details component is open by default when the page loads. Use the
    "startsOpen" attribute to control the initial state.`,
    startsOpen: true,
  },
};
