import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createButton } from '../helpers/buttons';
import { createLink } from '../helpers/links';
import { beautifyHtmlNode } from '../storybook/storybook';
import {
  childrenAccepted,
  childrenDefault,
  childrenRejected,
} from './cookie-banner.content';
import { CookieBannerProps } from './types';

const meta: Meta<CookieBannerProps> = {
  title: 'application/CookieBanner',
};

export default meta;
type Story = StoryObj<CookieBannerProps>;

const createCookieBanner = (arguments_: CookieBannerProps) => {
  const cookieBannerContainer = document.createElement('div');
  cookieBannerContainer.ariaLabel = 'Cookie banner';
  cookieBannerContainer.dataset.module = 'gieds-cookie-banner';
  cookieBannerContainer.className = 'gi-cookie-banner-container';

  const mainContainer = document.createElement('div');
  mainContainer.className = 'gi-py-5';
  mainContainer.dataset.element = 'main-container';
  cookieBannerContainer.append(mainContainer);

  const container = document.createElement('div');
  container.className = 'gi-container gi-mx-auto';
  mainContainer.append(container);

  const defaultContainer = document.createElement('div');
  container.append(defaultContainer);
  defaultContainer.dataset.element = 'default-container';
  defaultContainer.dataset.testid = 'default-container';
  defaultContainer.innerHTML = arguments_.content;
  const buttonContainer = document.createElement('div');
  defaultContainer.append(buttonContainer);
  buttonContainer.className = 'gi-cookie-banner-buttons';

  const acceptButton = createButton(arguments_.accept.triggerButton);
  acceptButton.dataset.element = 'accept-btn';
  acceptButton.dataset.testid = 'accept-btn';
  buttonContainer.append(acceptButton);

  const rejectButton = createButton(arguments_.reject.triggerButton);
  rejectButton.dataset.element = 'reject-btn';
  rejectButton.dataset.testid = 'reject-btn';
  buttonContainer.append(rejectButton);

  if (arguments_.cookieLink) {
    const cookieLink = createLink(arguments_.cookieLink);
    buttonContainer.append(cookieLink);
  }

  const acceptedContainer = document.createElement('div');
  container.append(acceptedContainer);
  acceptedContainer.dataset.element = 'accepted-container';
  acceptedContainer.dataset.testid = 'accepted-container';
  acceptedContainer.className = 'gi-hidden';
  acceptedContainer.innerHTML = arguments_.accept.content;
  if (arguments_.dismissButton) {
    const dismissButton = createButton(arguments_.dismissButton);
    dismissButton.dataset.element = 'dismiss-btn-accepted';
    dismissButton.dataset.testid = 'dismiss-btn-accepted';
    acceptedContainer.append(dismissButton);
  }

  const rejectedContainer = document.createElement('div');
  container.append(rejectedContainer);
  rejectedContainer.dataset.element = 'rejected-container';
  rejectedContainer.dataset.testid = 'rejected-container';
  rejectedContainer.className = 'gi-hidden';
  rejectedContainer.innerHTML = arguments_.reject.content;
  if (arguments_.dismissButton) {
    const dismissButton = createButton(arguments_.dismissButton);
    dismissButton.dataset.element = 'dismiss-btn-rejected';
    dismissButton.dataset.testid = 'dismiss-btn-rejected';
    rejectedContainer.append(dismissButton);
  }

  return cookieBannerContainer;
};

const createElement = (arguments_: CookieBannerProps) => {
  const component = createCookieBanner(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    content: childrenDefault,
    accept: {
      content: childrenAccepted,
      triggerButton: {
        content: 'Accept cookies',
      },
    },
    reject: {
      content: childrenRejected,
      triggerButton: {
        content: 'Reject cookies',
      },
    },
    dismissButton: {
      content: 'Hide this message',
    },
    cookieLink: {
      href: '#',
      content: 'See Cookies',
    },
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const defaultScreen = canvas.getByTestId('default-container');
    const acceptedScreen = canvas.getByTestId('accepted-container');
    const rejectedScreen = canvas.getByTestId('rejected-container');

    expect(defaultScreen).toBeVisible();
    expect(acceptedScreen).not.toBeVisible();
    expect(rejectedScreen).not.toBeVisible();
  },
};

export const AcceptFlow: Story = {
  args: {
    content: childrenDefault,
    accept: {
      content: childrenAccepted,
      triggerButton: {
        content: 'Accept cookies',
      },
    },
    reject: {
      content: childrenRejected,
      triggerButton: {
        content: 'Reject cookies',
      },
    },
    dismissButton: {
      content: 'Hide this message',
    },
    cookieLink: {
      href: '#',
      content: 'See Cookies',
    },
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const defaultScreen = canvas.getByTestId('default-container');
    const acceptedScreen = canvas.getByTestId('accepted-container');
    const rejectedScreen = canvas.getByTestId('rejected-container');
    const acceptButton = canvas.getByTestId('accept-btn');
    const dismissButton = canvas.getByTestId('dismiss-btn-accepted');

    acceptButton.click();

    expect(defaultScreen).not.toBeVisible();
    expect(acceptedScreen).toBeVisible();
    expect(rejectedScreen).not.toBeVisible();

    dismissButton.click();

    expect(defaultScreen).not.toBeVisible();
    expect(acceptedScreen).not.toBeVisible();
    expect(rejectedScreen).not.toBeVisible();
  },
};
