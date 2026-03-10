const baseArgs = {
  variant: 'primary' as const,
  appearance: 'default' as const,
  size: 'medium' as const,
  disabled: false,
};

export const meta = {
  tags: ['autodocs'] as string[],
  args: baseArgs,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'flat'],
      description: 'Controls the button style variant.',
    },
    appearance: {
      control: 'select',
      options: ['default', 'dark', 'light'],
      description:
        'Controls the button appearance within the selected variant.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Controls the button size.',
    },
    disabled: {
      control: 'boolean',
      description: 'Sets whether the button is disabled.',
    },
  } as const,
  parameters: {
    docs: {
      description: {
        component:
          'Button component with multiple variants, appearances, and sizes.',
      },
    },
  },
} as const;

export const stories = {
  default: {
    args: {
      ...baseArgs,
    },
  },
  secondary: {
    args: {
      ...baseArgs,
      variant: 'secondary' as const,
    },
  },
  flat: {
    args: {
      ...baseArgs,
      variant: 'flat' as const,
    },
  },
  disabled: {
    args: {
      ...baseArgs,
      disabled: true,
    },
  },
};
