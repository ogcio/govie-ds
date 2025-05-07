import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { createButton } from '../helpers/buttons';
import { createModal } from '../helpers/modal';
import { createParagraph } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import { modalBody, modalFooter, modalTitle } from './modal.content';
import { ModalWrapperPropsExtension } from './types';

const meta: Meta<ModalWrapperPropsExtension> = {
  title: 'Application/Modal',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A modal component that displays content on a button trigger or on page load',
      },
    },
  },
  decorators: (story) => `
    <div class="gi-h-[600px]">
      ${story()}
    </div>`,
};

export default meta;
type Story = StoryObj<ModalWrapperPropsExtension>;

const createElement = (arguments_: ModalWrapperPropsExtension) => {
  const component = createModal(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    body: modalBody,
    footer: modalFooter,
    triggerButton: { content: 'Open Modal' },
    isOpen: false,
    size: 'md',
    position: 'center',
  },
  render: createElement,
};

export const WithoutFooter: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    triggerButton: { content: 'Open Modal' },
    body: modalBody,
  },
  render: createElement,
};

export const WithLongContent: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    triggerButton: { content: 'Open Modal' },
    footer: modalFooter,
    body: beautifyHtmlNode(
      createParagraph({
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Incidunt esse magnam quis sit soluta cupiditate at
          deserunt exercitationem voluptas doloribus asperiores. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Incidunt esse magnam quis
          sit soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores.`,
      }),
    ),
  },
  render: createElement,
};

export const WithAllFooterButtonVariants: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    triggerButton: { content: 'Open Modal' },
    body: modalBody,
    footer: `
    <div data-orientation="unset" data-modal-size="lg">
        ${beautifyHtmlNode(
          createButton({
            content: 'Flat',
            variant: 'flat',
          }),
        )}
        ${beautifyHtmlNode(
          createButton({
            content: 'Secondary',
            variant: 'secondary',
          }),
        )}
        ${beautifyHtmlNode(
          createButton({
            content: 'Primary',
            variant: 'primary',
          }),
        )}
    </div>
    `,
  },
  render: createElement,
};

export const ModalNotCloseOnClick: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    triggerButton: { content: 'Open Modal' },
    closeOnClick: false,
    body: modalBody,
  },
  render: createElement,
};

export const ModalNotCloseOnOverlayClick: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    triggerButton: { content: 'Open Modal' },
    closeOnOverlayClick: false,
    body: modalBody,
  },
  render: createElement,
};

export const WithCenterLarge: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    body: modalBody,
    footer: modalFooter,
    isOpen: true,
    size: 'lg',
    position: 'center',
  },
  render: createElement,
};

export const WithCenterMedium: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    body: modalBody,
    footer: modalFooter,
    isOpen: true,
    size: 'md',
    position: 'center',
  },
  render: createElement,
};

export const WithCenterSmall: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    body: modalBody,
    footer: modalFooter,
    isOpen: true,
    size: 'sm',
    position: 'center',
  },
  render: createElement,
};

export const Test: Story = {
  args: {
    title: { content: modalTitle, as: 'h4' },
    body: modalBody,
    footer: modalFooter,
    triggerButton: { content: 'Open Modal' },
    isOpen: false,
    size: 'md',
    position: 'center',
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const modalElement = canvas.getByTestId('modal');
    const triggerButtonElement = canvas.getByTestId('trigger-button');
    const iconElement = canvas
      .getByTestId('modal-container')
      .querySelector('.gi-modal-icon') as HTMLElement;

    // Default state with Modal closed
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);

    // Modal Open
    await userEvent.click(triggerButtonElement);
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);

    // Modal Close using close button
    await userEvent.click(iconElement);
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);

    // Modal Open
    await userEvent.click(triggerButtonElement);
    expect(modalElement.classList.contains('gi-modal-open')).toBe(true);

    // Modal Closed by modal overlay
    await userEvent.click(modalElement);
    expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
  },
};
