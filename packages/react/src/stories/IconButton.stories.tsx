import type { Meta, StoryObj } from '@storybook/react-vite';
import _ from 'lodash';
import Info from '../atoms/icons/Info';
import {
  iconButtonMeta,
  Default as defaultStory,
  InteractionStates as interactionStates,
  Disabled as disabledStory,
  AllVariants as allVariants,
  AllAppearances as allAppearances,
  AllSizes as allSizes,
} from '../atoms/storybook/IconButton.meta';
import { Variant, Appearance } from '../atoms/constants';
import IconButton, {
  IconButtonSize as Size,
  type Props,
} from '../atoms/IconButton';

const meta: Meta<typeof IconButton> = {
  ...iconButtonMeta,
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    ...iconButtonMeta.argTypes,
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

type Story = StoryObj<typeof IconButton>;

const iconSizeForButton: Record<string, number> = {
  [Size.SM]: 16,
  [Size.MD]: 24,
  [Size.LG]: 24,
  [Size.XL]: 32,
};

export const Default: Story = {
  tags: ['skip-playwright'],
  ...defaultStory,
  render: (props) => (
    <IconButton {...props}>
      <Info size={iconSizeForButton[props.size ?? Size.MD]} />
    </IconButton>
  ),
};

export const AllVariants: Story = {
  ...allVariants,
  render: () => (
    <div className="gi-flex gi-gap-4">
      {_.map(Variant, (variant) => (
        <IconButton
          key={variant}
          variant={variant}
          ariaLabel={variant}
          dataTestId={`icon-button-variant-${variant}`}
        >
          <Info size={iconSizeForButton[Size.MD]} />
        </IconButton>
      ))}
    </div>
  ),
};

export const AllAppearances: Story = {
  ...allAppearances,
  render: () => (
    <div className="gi-flex gi-gap-4">
      {_.map(Appearance, (appearance) => (
        <div
          key={appearance}
          className={appearance === 'light' ? 'gi-bg-black gi-p-2' : 'gi-p-2'}
        >
          <IconButton
            appearance={appearance}
            ariaLabel={appearance}
            dataTestId={`icon-button-appearance-${appearance}`}
          >
            <Info size={iconSizeForButton[Size.MD]} />
          </IconButton>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  ...allSizes,
  render: () => (
    <div className="gi-flex gi-items-center gi-gap-4">
      {_.map(Size, (size) => (
        <IconButton
          key={size}
          size={size}
          ariaLabel={size}
          dataTestId={`icon-button-size-${size}`}
        >
          <Info size={iconSizeForButton[size]} />
        </IconButton>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  ...disabledStory,
  render: ({ onClick, onFocus }: Props) => (
    <div className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      {_.map(Variant, (variant) =>
        _.map(Appearance, (appearance) => (
          <div
            key={`${variant}-${appearance}`}
            className={`gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row${appearance === Appearance.LIGHT ? ' gi-p-4 gi-bg-black' : ''}`}
          >
            <IconButton
              variant={variant}
              appearance={appearance}
              disabled
              onClick={onClick}
              onFocus={onFocus}
              ariaLabel={`${variant} ${appearance} disabled`}
              dataTestId={`icon-button-disabled-${variant}-${appearance}`}
            >
              <Info size={iconSizeForButton[Size.MD]} />
            </IconButton>
            <IconButton
              variant={variant}
              appearance={appearance}
              disabled
              ariaLabel={`${variant} ${appearance} disabled hover`}
              className="pseudo-hover"
            >
              <Info size={iconSizeForButton[Size.MD]} />
            </IconButton>
            <IconButton
              variant={variant}
              appearance={appearance}
              disabled
              ariaLabel={`${variant} ${appearance} disabled focus`}
              className="pseudo-focus"
            >
              <Info size={iconSizeForButton[Size.MD]} />
            </IconButton>
          </div>
        )),
      )}
    </div>
  ),
};

export const InteractionStates: Story = {
  ...interactionStates,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-2 gi-items-start">
      {_.map(Variant, (variant) =>
        _.map(Appearance, (appearance) => (
          <div
            key={`${variant}-${appearance}`}
            className={`gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row${appearance === Appearance.LIGHT ? ' gi-p-4 gi-bg-black' : ''}`}
          >
            <IconButton
              variant={variant}
              appearance={appearance}
              ariaLabel={`${variant} ${appearance}`}
              dataTestId={`icon-button-${variant}-${appearance}`}
            >
              <Info size={iconSizeForButton[Size.MD]} />
            </IconButton>
            <IconButton
              variant={variant}
              appearance={appearance}
              ariaLabel={`${variant} ${appearance} hover`}
              className="pseudo-hover"
            >
              <Info size={iconSizeForButton[Size.MD]} />
            </IconButton>
            <IconButton
              variant={variant}
              appearance={appearance}
              ariaLabel={`${variant} ${appearance} focus`}
              className="pseudo-focus"
            >
              <Info size={iconSizeForButton[Size.MD]} />
            </IconButton>
          </div>
        )),
      )}
    </div>
  ),
};
