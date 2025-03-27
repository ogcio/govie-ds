import type { Meta, StoryObj } from '@storybook/react';
import { beautifyHtmlNode } from '../storybook/storybook';
import { DetailsProps } from './types';

const meta: Meta<DetailsProps> = {
  title: 'Typography/Details',
};

export default meta;
type Story = StoryObj<DetailsProps>;

const createDetails = (arguments_: DetailsProps) => {
  const details = document.createElement('details');
  details.className = 'gi-details';
  details.name = arguments_.name!;
  details.open = arguments_.open || false;
  details.dataset.module = 'gi-details';
  details.dataset.testid = 'govie-details';
  details.ariaExpanded = arguments_.open ? 'true' : 'false';

  const summary = document.createElement('summary');
  summary.className = 'gi-details-summary';
  summary.dataset.testid = 'govie-details-summary';
  summary.role = 'button';
  summary.ariaExpanded = arguments_.open ? 'true' : 'false';

  const summaryText = document.createElement('span');
  summaryText.className = 'gi-details-summary-text';
  summaryText.textContent = arguments_.label;
  summary.append(summaryText);

  const detailsContent = document.createElement('div');
  detailsContent.id = 'details-content';
  detailsContent.className = 'gi-details-text';
  detailsContent.ariaHidden = arguments_.open ? 'false' : 'true';
  detailsContent.textContent = arguments_.content || '';

  details.append(summary, detailsContent);

  return details;
};

const createElement = (arguments_: DetailsProps) => {
  const component = createDetails(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'Help with Nationality',
    content:
      'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.',
  },
  render: createElement,
};

export const WithMultipleDetailsGrouped: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    content: '',
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
    content: `This details component is open by default when the page loads. Use the
    "startsOpen" attribute to control the initial state.`,
    open: true,
  },
  render: createElement,
};
