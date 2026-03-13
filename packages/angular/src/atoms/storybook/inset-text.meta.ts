import type { ArgTypes } from '@storybook/types';
import { Props } from '../InsetText';
export const insetTextMeta = {
  tags: ['autodocs'] as string[],
  args: {
    id: 'inset-text-default',
    cite: 'https://example.com/source',
    describedBy: '',
    labelledBy: '',
    children: 'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.'
  },
  argTypes: {
    children: {
      table: {
        disable: true
      }
    },
    id: {
      control: 'text',
      description: 'Optional id for linking/targeting and aria references.'
    },
    cite: {
      control: 'text',
      description: 'The source URL or description for the quotation.'
    },
    describedBy: {
      control: 'text',
      description: 'Points to element id(s) whose content describes the inset text. Maps to `aria-describedby`.'
    },
    labelledBy: {
      control: 'text',
      description: 'Points to element id(s) whose content labels the inset text. Maps to `aria-labelledby`.'
    }
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component: 'Inset text component to differentiate a block of text from the content that surrounds it.'
      }
    }
  }
};
export const Default = {
  args: insetTextMeta.args
}