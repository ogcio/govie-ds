import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createDetails } from '../helpers/details';
import { DetailsProps } from './types';

const meta: Meta<DetailsProps> = {
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
    content: {
      control: 'text',
      description:
        'The content inside the details element, displayed when the element is open.',
    },
  },
};

export default meta;
type Story = StoryObj<DetailsProps>;

const createElement = (arguments_: DetailsProps) => {
  const component = createDetails(arguments_);

  return (
    <div className="gi-pl-6 gi-pt-6 gi-h-[200px]">
      {parse(component.outerHTML)}
    </div>
  );
};

export const Default: Story = {
  args: {
    label: 'Help with Nationality',
    content:
      'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.',
  },
  render: createElement,
};

const createGrouped = () => {
  const wrapper = document.createElement('div');
  wrapper.className = 'gi-flex gi-gap-2 gi-flex-col';
  wrapper.innerHTML = `
    ${
      createDetails({
        label: 'Help with Nationality',
        name: 'group1',
        open: false,
        content:
          'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.',
      }).outerHTML
    }
    ${
      createDetails({
        label: 'More Information on Nationality',
        name: 'group1',
        open: false,
        content:
          'Your nationality helps us determine your eligibility for specific voting rights. Without it, you may need to submit additional documentation.',
      }).outerHTML
    }
   ${
     createDetails({
       label: 'Help with Residency',
       name: 'group2',
       open: false,
       content:
         'Residency information is necessary to assign you to the correct electoral district. Please ensure it is accurate and up to date.',
     }).outerHTML
   }
    ${
      createDetails({
        label: 'More Information on Residency',
        name: 'group2',
        open: false,
        content:
          'Providing your residency details ensures we comply with local election laws. If you’re unsure of your residency status, contact support.',
      }).outerHTML
    }
`;
  return (
    <div className="gi-pl-6 gi-pt-6 gi-h-[200px]">
      {parse(wrapper.outerHTML)}
    </div>
  );
};

export const WithMultipleDetailsGrouped: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: createGrouped,
};

export const StartsOpen: Story = {
  args: {
    label: 'This Details Starts Open',
    content: `This details component is open by default when the page loads. Use the
    "startsOpen" attribute to control the initial state.`,
    open: true,
  },
  render: createElement,
};
