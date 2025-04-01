import type { Meta, StoryObj } from '@storybook/react';
import { createButton, createIconButton } from '../helpers/buttons';
import { createIcon } from '../helpers/icons';
import { createLink } from '../helpers/links';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ToastProps } from './types';

const meta: Meta<ToastProps> = {
  title: 'Application/Toast',
};

export default meta;
type Story = StoryObj<ToastProps>;

const createToast = (arguments_: ToastProps) => {
  let iconId = 'info';
  if (arguments_.variant == 'warning') {
    iconId = 'warning';
  } else if (arguments_.variant == 'success') {
    iconId = 'check_circle';
  } else if (arguments_.variant == 'danger') {
    iconId = 'error';
  }

  let variantClass = 'gi-toast-info';
  if (arguments_.variant == 'danger') {
    variantClass = 'gi-toast-danger';
  } else if (arguments_.variant == 'success') {
    variantClass = 'gi-toast-success';
  } else if (arguments_.variant == 'warning') {
    variantClass = 'gi-toast-warning';
  }

  let baseToastClass = 'gi-toast-base';
  if (arguments_.dismissible) {
    baseToastClass = 'gi-toast-base-dismissible';
  }

  const toast = document.createElement('div');
  toast.className = 'gi-hidden';

  const dsToast = document.createElement('div');

  dsToast.role = 'alert';
  dsToast.dataset.module = 'gieds-dsToast';
  dsToast.className = `${variantClass} ${baseToastClass}`;

  const icon = createIcon({ icon: iconId });
  dsToast.append(icon);

  const container = document.createElement('div');
  container.className = 'gi-toast-container';

  const title = document.createElement('p');
  title.className = 'gi-toast-title';
  title.textContent = arguments_.title;
  container.append(title);

  if (arguments_.description) {
    const content = document.createElement('p');
    content.textContent = arguments_.description;
    container.append(content);
  }

  if (arguments_.action) {
    const action = document.createElement('div');
    action.className = 'gi-toast-action';
    const link = createLink({
      noColor: true,
      size: 'md',
      href: arguments_.action.href,
      content: arguments_.action.label,
    });
    action.append(link);
    container.append(action);
  }

  dsToast.append(container);

  if (arguments_.dismissible) {
    const dismissButton = createIconButton({
      className: 'gi-toast-dismiss',
      size: 'small',
      appearance: 'dark',
      variant: 'flat',
      icon: {
        icon: 'close',
      },
    });
    dsToast.append(dismissButton);
  }

  toast.append(dsToast);
  return toast;
};

const createTrigger = (arguments_: ToastProps) => {
  const trigger = document.createElement('div');
  trigger.role = 'alert';
  trigger.dataset.module = 'gieds-toast';

  if (arguments_.duration) {
    trigger.dataset.duration = arguments_.duration.toString();
  }
  if (arguments_.position) {
    trigger.dataset['position-x'] = arguments_.position?.x;
    trigger.dataset['position-y'] = arguments_.position?.y;
  }

  const button = createButton({ content: 'Trigger Toast' });
  trigger.append(button);
  return trigger;
};

const createElement = (arguments_: ToastProps, hasTrigger?: boolean) => {
  const container = document.createElement('div');

  if (hasTrigger) {
    const trigger = createTrigger(arguments_);
    container.append(trigger);
  }

  const component = createToast(arguments_);
  container.append(component);
  return beautifyHtmlNode(container);
};

export const Default: Story = {
  args: {
    title: 'This is a Toast',
    description: 'This is some content',
  },
  render: (arguments_) => {
    const component = createToast(arguments_);
    component.className = '';
    return beautifyHtmlNode(component);
  },
};

export const Success: Story = {
  args: {
    title: 'This is a Toast',
    description: 'This is some content',
    variant: 'success',
  },
  render: (arguments_) => {
    const component = createToast(arguments_);
    component.className = '';
    return beautifyHtmlNode(component);
  },
};

export const Warning: Story = {
  args: {
    title: 'This is a Toast',
    description: 'This is some content',
    variant: 'warning',
  },
  render: (arguments_) => {
    const component = createToast(arguments_);
    component.className = '';
    return beautifyHtmlNode(component);
  },
};

export const Danger: Story = {
  args: {
    title: 'This is a Toast',
    description: 'This is some content',
    variant: 'danger',
  },
  render: (arguments_) => {
    const component = createToast(arguments_);
    component.className = '';
    return beautifyHtmlNode(component);
  },
};

export const WithTrigger: Story = {
  args: {
    title: 'Toast Triggered',
    description: 'This is some content',
  },
  render: (arguments_) => createElement(arguments_, true),
};

export const WithAction: Story = {
  args: {
    title: 'With Action',
    description: 'This is some content',
    action: {
      href: '#',
      label: 'Go to Link',
    },
  },
  render: (arguments_) => {
    const component = createToast(arguments_);
    component.className = '';
    return beautifyHtmlNode(component);
  },
};

export const Dismissible: Story = {
  args: {
    title: 'Dismissible',
    description: 'This is some content',
    dismissible: true,
  },
  render: (arguments_) => {
    const component = createToast(arguments_);
    component.className = '';
    return beautifyHtmlNode(component);
  },
};

export const withLongerDuration: Story = {
  args: {
    title: 'WithDuration',
    description: 'This is some content',
    duration: 8000,
  },
  render: (arguments_) => createElement(arguments_),
};

export const withPositionChange: Story = {
  args: {
    title: 'withPositionChange',
    description: 'This is some content',
    position: {
      x: 'left',
      y: 'bottom',
    },
  },
  render: (arguments_) => createElement(arguments_),
};
