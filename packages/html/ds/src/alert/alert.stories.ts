import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { createIcon } from '../helpers/icons';
import { beautifyHtmlNode } from '../storybook/storybook';
import { AlertProps, AlertVariant } from './alert-schema';
import { createIconButton } from '../helpers/buttons';

const meta: Meta<AlertProps> = {
  title: 'Application/Alert',
};

export default meta;
type Story = StoryObj<AlertProps>;

const createAlert = (arguments_: AlertProps) => {
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

  const icon = createIcon({ icon: iconId });
  component.append(icon);

  const container = document.createElement('div');
  container.className = 'gi-alert-container';
  component.append(container);

  const title = document.createElement('p');
  title.className = 'gi-alert-title';
  title.textContent = arguments_.title;
  container.append(title);
  container.innerHTML += arguments_.children || '';

  if (arguments_.dismissible) {
    const icon = createIconButton({
      size: 'small',
      appearance: 'dark',
      variant: 'flat',
      icon: {
        icon: 'close',
      },
    });
    icon.className = 'gi-alert-dismiss';
    component.append(icon);
  }

  return component;
};

const createElement = (arguments_: AlertProps) => {
  const component = createAlert(arguments_);
  return beautifyHtmlNode(component);
};

export const InfoAlert: Story = {
  args: {
    title: 'Info Alert',
    variant: AlertVariant.Info,
    children: '<p>Content</p>',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};

export const DangerAlert: Story = {
  args: {
    title: 'Danger Alert',
    variant: AlertVariant.Danger,
    children: '<p>Content</p>',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};

export const SuccessAlert: Story = {
  args: {
    title: 'Success Alert',
    variant: AlertVariant.Success,
    children: '<p>Content</p>',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};

export const WarningAlert: Story = {
  args: {
    title: 'Warning Alert',
    variant: AlertVariant.Warning,
    children: '<p>Content</p>',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};

export const isDismissible: Story = {
  args: {
    title: 'Info Alert',
    variant: AlertVariant.Info,
    dismissible: true,
    children: '<p>Content</p>',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
