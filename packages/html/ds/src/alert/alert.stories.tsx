import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createIconButton } from '../helpers/buttons';
import { createIcon } from '../helpers/icons';
import { AlertProps, AlertVariant } from './alert.schema';

const meta: Meta<AlertProps> = {
  title: 'Application/Alert',
};

export default meta;
type Story = StoryObj<AlertProps>;

const createAlert = ({ showIcon, ...arguments_ }: AlertProps) => {
  const className = [];

  if (arguments_.variant == 'danger') {
    className.push('gi-alert-danger');
  } else if (arguments_.variant == 'success') {
    className.push('gi-alert-success');
  } else if (arguments_.variant == 'warning') {
    className.push('gi-alert-warning');
  } else {
    className.push('gi-alert-info');
  }

  if (arguments_.dismissible) {
    className.push('gi-alert-base-dismissible');
  } else {
    className.push('gi-alert-base');
  }

  const component = document.createElement('div');
  component.dataset.module = 'gieds-alert';
  component.role = 'alert';
  component.className = className.join(' ');

  let iconId;
  if (arguments_.variant == 'warning') {
    iconId = 'warning';
  } else if (arguments_.variant == 'success') {
    iconId = 'check_circle';
  } else if (arguments_.variant == 'danger') {
    iconId = 'error';
  } else {
    iconId = 'info';
  }

  if (showIcon) {
    const icon = createIcon({ icon: iconId, className: 'gi-alert-icon' });
    icon.dataset.variant = arguments_.variant;
    component.append(icon);
  }

  const container = document.createElement('div');
  container.className = 'gi-alert-container';

  if (arguments_.title) {
    container.classList.add('gi-gap-1');
    const title = document.createElement('p');
    title.className = 'gi-alert-title';
    title.textContent = arguments_.title;
    container.append(title);
  }

  component.append(container);
  container.innerHTML += arguments_.children || '';

  if (arguments_.dismissible) {
    const icon = createIconButton({
      size: 'small',
      className: 'gi-alert-dismiss',
      appearance: 'dark',
      variant: 'flat',
      icon: {
        icon: 'close',
      },
    });
    component.append(icon);
  }

  return component;
};

const createElement = (arguments_: AlertProps) => {
  const component = createAlert(arguments_);
  return parse(component.outerHTML) as React.ReactElement;
};

export const InfoAlert: Story = {
  args: {
    title: 'Info Alert',
    variant: AlertVariant.Info,
    children: '<p>Content</p>',
  },
  render: (arguments_) => createElement(arguments_),
};

export const DangerAlert: Story = {
  args: {
    title: 'Danger Alert',
    variant: AlertVariant.Danger,
    children: '<p>Content</p>',
  },
  render: (arguments_) => createElement(arguments_),
};

export const SuccessAlert: Story = {
  args: {
    title: 'Success Alert',
    variant: AlertVariant.Success,
    children: '<p>Content</p>',
  },
  render: (arguments_) => createElement(arguments_),
};

export const WarningAlert: Story = {
  args: {
    title: 'Warning Alert',
    variant: AlertVariant.Warning,
    children: '<p>Content</p>',
  },
  render: (arguments_) => createElement(arguments_),
};

export const isDismissible: Story = {
  args: {
    title: 'Info Alert',
    variant: AlertVariant.Info,
    dismissible: true,
    children: '<p>Content</p>',
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithoutTitle: Story = {
  args: {
    children: 'Content',
    variant: AlertVariant.Info,
    dismissible: true,
  },
  render: (arguments_) => createElement(arguments_),
};
