import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { ErrorSize } from '../error-text/types';
import { createInputPassword } from '../helpers/forms';
import { HintSize } from '../hint-text/types';
import { LabelSize } from '../label/types';
import { InputPasswordProps } from './types';

const meta: Meta<InputPasswordProps> = {
  title: 'Form/InputPassword',
  parameters: {
    docs: {
      description: {
        component: 'Input Password component.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<InputPasswordProps>;

const createElement = (arguments_: InputPasswordProps) => {
  const component = createInputPassword(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  args: {
    id: 'input-password-default-id',
    halfFluid: true,
    label: {
      content: 'Password',
      htmlFor: 'input-password-default-id',
      size: LabelSize.Medium,
    },
    placeholder: 'Password',
  },
  render: (arguments_) => createElement(arguments_),
};

export const LabelAndHint: Story = {
  args: {
    id: 'input-password-label-hint',
    halfFluid: true,
    label: {
      content: 'Password',
      htmlFor: 'input-password-label-hint',
      size: LabelSize.Medium,
    },
    hint: {
      content: 'Support text',
      size: HintSize.Medium,
    },
    placeholder: 'Password',
  },
  render: (arguments_) => createElement(arguments_),
};

export const LabelHintAndError: Story = {
  args: {
    id: 'input-password-label-hint-and-error',
    halfFluid: true,
    label: {
      content: 'Password',
      htmlFor: 'input-password-label-hint-and-error',
      size: LabelSize.Medium,
    },
    hint: {
      content: 'Support text',
      size: HintSize.Medium,
    },
    error: {
      content: 'Error text',
      size: ErrorSize.Medium,
    },
    placeholder: 'Password',
  },
  render: (arguments_) => createElement(arguments_),
};
