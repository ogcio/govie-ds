import type { Meta, StoryObj } from '@storybook/react';
import InsetText from '../atoms/DsInsetText';

const meta = {
  title: 'Typography/InsetText',
  parameters: {
    docs: {
      description: {
        component:
          'Inset text component to differentiate a block of text from the content that surrounds it.',
      },
    },
  },
  component: InsetText,
} satisfies Meta<typeof InsetText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    id: {
      control: 'text',
      description: 'Optional id for linking/targeting and aria references.',
    },
    cite: {
      control: 'text',
      description: 'The source URL or description for the quotation.',
    },
    ariaDescribedBy: {
      control: 'text',
      description:
        'Points to element id(s) whose content describes the inset text. Maps to `aria-describedby`.',
    },
    ariaLabelledBy: {
      control: 'text',
      description:
        'Points to element id(s) whose content labels the inset text. Maps to `aria-labelledby`. If provided, `ariaLabel` is ignored.',
    },
    ariaLabel: {
      control: 'text',
      description:
        'Accessible name when there is no visible label. Maps to `aria-label`. Ignored if `ariaLabelledBy` is provided.',
    },
  },
  args: {
    id: 'inset-text-default',
    children:
      'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
    cite: 'https://example.com/source',
    ariaDescribedBy: '',
    ariaLabelledBy: '',
    ariaLabel: '',
  },
};
