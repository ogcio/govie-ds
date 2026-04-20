import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect, fn, userEvent } from 'storybook/test';
import type { Props } from '../Button';
import { Variant, Appearance, ButtonSize } from '../Button';
import { enumType } from './utilities';
export const buttonMeta = {
  tags: ['autodocs'] as string[],
  title: 'Components/Button',
  args: {
    children: 'Button',
    variant: Variant.PRIMARY,
    appearance: Appearance.DEFAULT,
    size: ButtonSize.MD,
    disabled: false,
    dataTestId: 'button-test'
  },
  argTypes: {
    id: {
      control: false,
      description: 'Optional id for linking/targeting and aria references.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    className: {
      control: false,
      description: 'Additional CSS classes to apply to the button element.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    variant: enumType(Variant, {
      description: 'Visual style variant of the button.',
      defaultValue: Variant.PRIMARY
    }),
    appearance: enumType(Appearance, {
      description: 'Colour appearance of the button.',
      defaultValue: Appearance.DEFAULT
    }),
    size: enumType(ButtonSize, {
      description: 'Size of the button.',
      defaultValue: ButtonSize.MD
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
    children: {
      table: {
        disable: true
      }
    },
    role: {
      control: false,
      description: 'Overrides the implicit ARIA role of the element. Only set when a non-button semantic is required.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    type: {
      control: false,
      description: 'HTML button type attribute. Defaults to `"button"` to prevent accidental form submission. Accepts `"button"`, `"submit"`, or `"reset"`.',
      table: {
        type: {
          summary: '"button" | "submit" | "reset"'
        }
      }
    },
    form: {
      control: false,
      description: 'Associates the button with a form element by its id. Maps to the HTML `form` attribute.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    value: {
      control: false,
      description: 'Value submitted with the form when the button is of type `"submit"`. Maps to the HTML `value` attribute.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    tabIndex: {
      control: false,
      description: 'Controls the tab order of the button. Use `-1` to remove the button from the natural tab order.',
      table: {
        type: {
          summary: 'number'
        }
      }
    },
    ariaLabel: {
      control: false,
      description: 'Accessible label for the button. Use when the button has no visible text or when the visible text is insufficient to describe the action. Maps to `aria-label`.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    ariaLabelledBy: {
      control: false,
      description: 'Points to element id(s) whose content labels the button. Maps to `aria-labelledby`.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    ariaDescribedBy: {
      control: false,
      description: 'Points to element id(s) whose content describes the button. Maps to `aria-describedby`.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    ariaChecked: {
      control: false,
      description: 'Indicates the current checked state of the button when used in a toggle or checkbox role. Maps to `aria-checked`.',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    ariaPressed: {
      control: false,
      description: 'Indicates whether the button is currently pressed. Use for toggle buttons. Accepts `true`, `false`, or `"mixed"`. Maps to `aria-pressed`.',
      table: {
        type: {
          summary: 'boolean | "mixed"'
        }
      }
    },
    ariaExpanded: {
      control: false,
      description: 'Indicates whether a controlled element (e.g. a menu or disclosure) is expanded or collapsed. Maps to `aria-expanded`.',
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    ariaControls: {
      control: false,
      description: 'Points to the id of the element the button controls (e.g. a panel, menu, or dialog). Maps to `aria-controls`.',
      table: {
        type: {
          summary: 'string'
        }
      }
    },
    ariaHasPopup: {
      control: false,
      description: 'Indicates that the button can open a popup element such as a menu, listbox, or dialog. Maps to `aria-haspopup`.',
      table: {
        type: {
          summary: 'boolean | "menu" | "listbox" | "dialog" | "grid" | "tree"'
        }
      }
    },
    ariaBusy: {
      control: false,
      description: 'Indicates that the button or its associated region is being updated. Maps to `aria-busy`.',
      table: {
        type: {
          summary: 'boolean'
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
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component: 'Button component to help users carry out an action like starting an application or saving their information.'
      }
    }
  }
};
export const Default = {
  tags: ['skip-playwright'],
  args: buttonMeta.args,
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders a button element', async () => {
      const button = canvas.getByTestId('button-test');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toBeInTheDocument();
    });
  }
};
export const InteractionStates = {
  parameters: {
    pseudo: {
      hover: '.pseudo-hover',
      focus: '.pseudo-focus'
    }
  }
};
export const AllVariants = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders all button variants', async () => {
      for (const variant of Object.values(Variant)) {
        const button = canvas.getByTestId(`button-variant-${variant}`);
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe('BUTTON');
      }
    });
  }
};
export const AllAppearances = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders all button appearances', async () => {
      for (const appearance of Object.values(Appearance)) {
        const button = canvas.getByTestId(`button-appearance-${appearance}`);
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe('BUTTON');
      }
    });
  }
};
export const AllSizes = {
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders all button sizes', async () => {
      for (const size of Object.values(ButtonSize)) {
        const button = canvas.getByTestId(`button-size-${size}`);
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe('BUTTON');
      }
    });
  }
};
export const Disabled = {
  args: {
    onClick: fn(),
    onFocus: fn()
  },
  play: async ({
    canvasElement,
    args,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    await step('renders all disabled buttons with disabled attribute', async () => {
      for (const variant of Object.values(Variant)) {
        for (const appearance of Object.values(Appearance)) {
          const button = canvas.getByTestId(`button-disabled-${variant}-${appearance}`);
          expect(button).toBeInTheDocument();
          expect(button.tagName).toBe('BUTTON');
          expect(button).toBeDisabled();
        }
      }
    });
    await step('click on a disabled button does not fire onClick handler', async () => {
      const button = canvas.getByTestId(`button-disabled-${Variant.PRIMARY}-${Appearance.DEFAULT}`);
      await userEvent.click(button, {
        pointerEventsCheck: 0
      });
      expect(args.onClick).not.toHaveBeenCalled();
    });
    await step('focus on a disabled button does not fire onFocus handler', async () => {
      const button = canvas.getByTestId(`button-disabled-${Variant.PRIMARY}-${Appearance.DEFAULT}`);
      button.focus();
      expect(args.onFocus).not.toHaveBeenCalled();
      expect(document.activeElement).not.toBe(button);
    });
  }
}