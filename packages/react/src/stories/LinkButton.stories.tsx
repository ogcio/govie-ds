import type { Meta, StoryObj } from '@storybook/react-vite';
import _ from 'lodash';
import LinkButton, { type Props } from '@/atoms/LinkButton';
import Box from '@/atoms/Box';
import { ButtonSize } from '@/atoms/Button';
import { Variant, Appearance } from '@/atoms/constants';
import {
  linkButtonMeta,
  Default as defaultStory,
  AllVariants as allVariants,
  AllAppearances as allAppearances,
  AllSizes as allSizes,
  InteractionStates as interactionStates,
  Disabled as disabledStory,
} from '@/atoms/storybook/LinkButton.meta';

const meta: Meta<typeof LinkButton> = {
  ...linkButtonMeta,
  title: 'Components/LinkButton',
  argTypes: {
    ...linkButtonMeta.argTypes,
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
      <Box className={`gi-p-4 ${isLight} gi-w-fit`}>
        <Story />
      </Box>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  render: (props) => <LinkButton {...props}>LinkButton</LinkButton>,
};

export const AllVariants: Story = {
  ...allVariants,
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-2 gi-items-start">
      {_.map(Variant, (variant) => (
        <LinkButton
          key={variant}
          href="https://www.gov.ie"
          dataTestId={`link-button-variant-${variant}`}
          variant={variant}
        >
          {variant} LinkButton
        </LinkButton>
      ))}
    </Box>
  ),
};

export const AllAppearances: Story = {
  ...allAppearances,
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-2 gi-items-start">
      {_.map(Appearance, (appearance) => (
        <Box key={appearance} className={appearance === Appearance.LIGHT ? 'gi-p-4 gi-bg-black gi-w-fit' : ''}>
          <LinkButton
            href="https://www.gov.ie"
            dataTestId={`link-button-appearance-${appearance}`}
            appearance={appearance}
          >
            {appearance} LinkButton
          </LinkButton>
        </Box>
      ))}
    </Box>
  ),
};

export const AllSizes: Story = {
  ...allSizes,
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-2 gi-items-start">
      {_.map(ButtonSize, (size) => (
        <LinkButton key={size} href="https://www.gov.ie" dataTestId={`link-button-size-${size}`} size={size}>
          {size} LinkButton
        </LinkButton>
      ))}
    </Box>
  ),
};

export const InteractionStates: Story = {
  ...interactionStates,
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      {_.map(Variant, (variant) =>
        _.map(Appearance, (appearance) => (
          <Box
            key={`${variant}-${appearance}`}
            className={`gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row ${appearance === Appearance.LIGHT ? 'gi-p-4 gi-bg-black' : ''}`}
          >
            <LinkButton href="https://www.gov.ie" variant={variant} appearance={appearance} className="pseudo-hover">
              {variant} {appearance} hover
            </LinkButton>
            <LinkButton href="https://www.gov.ie" variant={variant} appearance={appearance} className="pseudo-focus">
              {variant} {appearance} focus
            </LinkButton>
          </Box>
        )),
      )}
    </Box>
  ),
};

export const Disabled: Story = {
  ...disabledStory,
  render: ({ onClick, onFocus }: Props) => (
    <Box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      {_.map(Variant, (variant) =>
        _.map(Appearance, (appearance) => (
          <Box
            key={`${variant}-${appearance}`}
            className={`gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row ${appearance === Appearance.LIGHT ? 'gi-p-4 gi-bg-black' : ''}`}
          >
            <LinkButton
              href="https://www.gov.ie"
              variant={variant}
              appearance={appearance}
              disabled
              onClick={onClick}
              onFocus={onFocus}
              dataTestId={`link-button-disabled-${variant}-${appearance}`}
            >
              {variant} {appearance}
            </LinkButton>
            <LinkButton
              href="https://www.gov.ie"
              variant={variant}
              appearance={appearance}
              disabled
              className="pseudo-hover"
            >
              {variant} {appearance} hover
            </LinkButton>
            <LinkButton
              href="https://www.gov.ie"
              variant={variant}
              appearance={appearance}
              disabled
              className="pseudo-focus"
            >
              {variant} {appearance} focus
            </LinkButton>
          </Box>
        )),
      )}
    </Box>
  ),
};
