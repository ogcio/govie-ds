import type { Meta, StoryObj } from '@storybook/react-vite';
import _ from 'lodash';
import { Button } from '../atoms/index.js';
import { ButtonSize } from '../atoms/Button';
import { Variant, Appearance } from '../atoms/utilities.js';
import {
  buttonMeta,
  Default as buttonDefault,
  AllVariants as buttonAllVariants,
  AllAppearances as buttonAllAppearances,
  AllSizes as buttonAllSizes,
  InteractionStates as buttonInteractionStates,
  Disabled as buttonDisabled,
} from '../atoms/storybook/Button.meta';

const meta: Meta<typeof Button> = {
  ...buttonMeta,
  title: 'Components/Button',
  component: Button,
  argTypes: {
    ...buttonMeta.argTypes,
    onClick: {
      control: false,
      description: 'Click event handler.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onFocus: {
      control: false,
      description: 'Focus event handler.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onBlur: {
      control: false,
      description: 'Blur event handler.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onKeyDown: {
      control: false,
      description: 'Keydown event handler.',
      table: { type: { summary: '(event: any) => void' } },
    },
    onKeyUp: {
      control: false,
      description: 'Keyup event handler.',
      table: { type: { summary: '(event: any) => void' } },
    },
  },
  decorators: (Story, context) => {
    const isLight = context?.args?.appearance === 'light' ? 'gi-bg-black' : '';
    return (
      <div className={`gi-p-4 ${isLight} gi-w-fit`}>
        <Story />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...buttonDefault,
};

export const AllVariants: Story = {
  ...buttonAllVariants,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-2 gi-items-start">
      {_.map(Variant, (variant) => (
        <Button
          key={variant}
          dataTestId={`button-variant-${variant}`}
          variant={variant}
        >
          {variant} Button
        </Button>
      ))}
    </div>
  ),
};

export const AllAppearances: Story = {
  ...buttonAllAppearances,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-2 gi-items-start">
      {_.map(Appearance, (appearance) => (
        <div
          key={appearance}
          className={
            appearance === Appearance.LIGHT ? 'gi-p-4 gi-bg-black gi-w-fit' : ''
          }
        >
          <Button
            dataTestId={`button-appearance-${appearance}`}
            appearance={appearance}
          >
            {appearance} Button
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  ...buttonAllSizes,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-2 gi-items-start">
      {_.map(ButtonSize, (size) => (
        <Button key={size} dataTestId={`button-size-${size}`} size={size}>
          {size} Button
        </Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  ...buttonDisabled,
  render: ({ onClick, onFocus }) => (
    <div className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      {_.map(Variant, (variant) =>
        _.map(Appearance, (appearance) => (
          <div
            key={`${variant}-${appearance}`}
            className={`gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row ${appearance === Appearance.LIGHT ? 'gi-p-4 gi-bg-black' : ''}`}
          >
            <Button
              variant={variant}
              appearance={appearance}
              disabled
              onClick={onClick}
              onFocus={onFocus}
              dataTestId={`button-disabled-${variant}-${appearance}`}
            >
              {variant} {appearance}
            </Button>
            <Button
              variant={variant}
              appearance={appearance}
              disabled
              className="pseudo-hover"
            >
              {variant} {appearance} hover
            </Button>
            <Button
              variant={variant}
              appearance={appearance}
              disabled
              className="pseudo-focus"
            >
              {variant} {appearance} focus
            </Button>
          </div>
        )),
      )}
    </div>
  ),
};

export const InteractionStates: Story = {
  ...buttonInteractionStates,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      {_.map(Variant, (variant) =>
        _.map(Appearance, (appearance) => (
          <div
            key={`${variant}-${appearance}`}
            className={`gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row ${appearance === Appearance.LIGHT ? 'gi-p-4 gi-bg-black' : ''}`}
          >
            <Button
              variant={variant}
              appearance={appearance}
              className="pseudo-hover"
            >
              {variant} {appearance} hover
            </Button>
            <Button
              variant={variant}
              appearance={appearance}
              className="pseudo-focus"
            >
              {variant} {appearance} focus
            </Button>
          </div>
        )),
      )}
    </div>
  ),
};
