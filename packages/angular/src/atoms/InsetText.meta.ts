const baseArgs = {
  id: 'inset-text-default',
  cite: 'https://example.com/source',
  describedBy: '',
  labelledBy: ''
};
export const meta = {
  tags: ['autodocs'] as string[],
  args: baseArgs,
  argTypes: {
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
  },
  parameters: {
    docs: {
      description: {
        component: 'Inset text component to differentiate a block of text from the content that surrounds it.'
      }
    }
  }
} as const;
export const stories = {
  default: {
    args: {
      ...baseArgs
    }
  }
}