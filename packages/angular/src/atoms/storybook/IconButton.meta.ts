import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect, fn, userEvent } from 'storybook/test';
import { IconButtonSize as Size } from '../IconButton';
import { Variant, Appearance } from '../constants';
import { enumType } from './utilities';
export const iconButtonMeta = {
  tags: ['autodocs'] as string[],
  title: 'Components/IconButton',
  args: {
    id: 'icon-button-default',
    dataTestId: 'icon-button-default',
    ariaLabel: 'Favourite',
    variant: Variant.PRIMARY,
    appearance: Appearance.DEFAULT,
    size: Size.MD
  },
  argTypes: {
    variant: enumType(Variant, {
      description: 'Visual style variant of the button.',
      defaultValue: Variant.PRIMARY
    }),
    appearance: enumType(Appearance, {
      description: 'Colour appearance of the button.',
      defaultValue: Appearance.DEFAULT
    }),
    size: enumType(Size, {
      description: 'Size of the button.',
      defaultValue: Size.MD
    }),
    disabled: {
      control: false,
      description: 'Disables the button and prevents user interaction.',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    ariaLabel: {
      control: false,
      description: 'Accessible name for the button. Strongly recommended for icon-only buttons via ariaLabel, ariaLabelledBy, or a visually-hidden text child.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    ariaLabelledBy: {
      control: false,
      description: 'ID of the element that labels this button.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    ariaDescribedBy: {
      control: false,
      description: 'ID of the element that describes this button.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    ariaExpanded: {
      control: false,
      description: 'Indicates whether a controlled element is expanded.',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    ariaPressed: {
      control: false,
      description: 'Indicates the current pressed state of a toggle button.',
      table: {
        type: {
          summary: "boolean | 'mixed'"
        }
      }
    },
    ariaHasPopup: {
      control: false,
      description: 'Indicates the type of popup triggered by the button.',
      table: {
        type: {
          summary: "'menu' | 'listbox' | 'dialog' | 'grid' | 'tree' | boolean"
        }
      }
    },
    ariaControls: {
      control: false,
      description: 'ID of the element controlled by this button.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    ariaBusy: {
      control: false,
      description: 'Indicates the element is being modified and assistive technologies may want to wait until changes are complete.',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    role: {
      control: false,
      description: 'Overrides the implicit button role. Use only when required by composite patterns such as toolbars or menubars.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    form: {
      control: false,
      description: 'Associates the button with a form element by ID, even when not a descendant of that form.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    type: {
      control: false,
      description: 'HTML button type attribute.',
      table: {
        type: {
          summary: "'button' | 'submit' | 'reset'"
        },
        defaultValue: {
          summary: 'button'
        }
      }
    },
    tabIndex: {
      control: false,
      description: 'Tab index for the button element.',
      table: {
        type: {
          summary: 'number'
        }
      }
    },
    children: {
      table: {
        disable: true
      }
    },
    id: {
      control: false,
      description: 'HTML id attribute for the button element.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    className: {
      control: false,
      description: 'Additional CSS classes applied to the button element.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    dataTestId: {
      control: false,
      description: 'Test id for targeting the element in automated tests.',
      table: {
        type: {
          summary: 'string'
        }
      }
    }
  } as const,
  parameters: {
    controls: {
      sort: 'none'
    },
    docs: {
      description: {
        component: 'IconButton is a square button designed to contain only an icon. It accepts icon content via children, not icon-name props. Consumers must provide an accessible name via aria-label, aria-labelledby, or a visually-hidden text child.'
      }
    }
  }
};
export const Default = {
  args: iconButtonMeta.args,
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders a <button> element', async () => {
      const button = canvas.getByTestId('icon-button-default');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });
    await step('has an accessible name', async () => {
      const button = canvas.getByRole('button', {
        name: 'Favourite'
      });
      expect(button).toBeInTheDocument();
    });
    await step('has type="button" by default', async () => {
      const button = canvas.getByTestId('icon-button-default');
      expect(button).toHaveAttribute('type', 'button');
    });
  }
};
export const InteractionStates = {
  args: iconButtonMeta.args,
  parameters: {
    pseudo: {
      hover: '.pseudo-hover',
      focus: '.pseudo-focus'
    }
  }
};
export const Disabled = {
  args: {
    onClick: fn(),
    onFocus: fn()
  },
  play: async ({
    canvasElement,
    step,
    args
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    for (const variant of Object.values(Variant)) {
      for (const appearance of Object.values(Appearance)) {
        await step(`${variant} ${appearance} button is disabled`, async () => {
          const button = canvas.getByTestId(`icon-button-disabled-${variant}-${appearance}`);
          expect(button).toBeInTheDocument();
          expect(button).toBeDisabled();
        });
      }
    }
    await step('click on a disabled icon button does not fire onClick handler', async () => {
      const button = canvas.getByTestId(`icon-button-disabled-${Variant.PRIMARY}-${Appearance.DEFAULT}`);
      await userEvent.click(button, {
        pointerEventsCheck: 0
      });
      expect(args.onClick).not.toHaveBeenCalled();
    });
    await step('focus on a disabled icon button does not fire onFocus handler', async () => {
      const button = canvas.getByTestId(`icon-button-disabled-${Variant.PRIMARY}-${Appearance.DEFAULT}`);
      button.focus();
      expect(args.onFocus).not.toHaveBeenCalled();
      expect(document.activeElement).not.toBe(button);
    });
  }
};
export const AllVariants = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    for (const variant of Object.values(Variant)) {
      await step(`renders ${variant} variant`, async () => {
        const button = canvas.getByTestId(`icon-button-variant-${variant}`);
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe('BUTTON');
      });
    }
  }
};
export const AllAppearances = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    for (const appearance of Object.values(Appearance)) {
      await step(`renders ${appearance} appearance`, async () => {
        const button = canvas.getByTestId(`icon-button-appearance-${appearance}`);
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe('BUTTON');
      });
    }
  }
};
export const AllSizes = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    for (const size of Object.values(Size)) {
      await step(`renders ${size} size`, async () => {
        const button = canvas.getByTestId(`icon-button-size-${size}`);
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe('BUTTON');
      });
    }
  }
}