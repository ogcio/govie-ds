import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

type LogoProps = {
  imageSmall?: string;
  imageLarge?: string;
  href?: string;
  external?: boolean;
  alt?: string;
};

type FooterProps = {
  primarySlot?: any;
  secondarySlot?: any;
  utilitySlot?: any;
  logo?: LogoProps;
  className?: string;
  dataTestid?: string;
};

const meta: Meta<FooterProps> = {
  title: 'Layout/Footer',
  argTypes: {
    primarySlot: { control: 'text', description: 'Primary content slot' },
    secondarySlot: { control: 'text', description: 'Secondary content slot' },
    utilitySlot: { control: 'text', description: 'Utility content slot' },
    className: { control: 'text', description: 'Additional CSS classes' },
    dataTestid: { control: 'text', description: 'Test ID for queries' },
  },
};
export default meta;

type Story = StoryObj<FooterProps>;

const renderFooter = (arguments_: FooterProps) => {
  const container = document.createElement('div');
  container.className =
    `gi-footer-container ${arguments_.className ?? ''}`.trim();
  if (arguments_.dataTestid) {
    container.dataset.testid = arguments_.dataTestid;
  }

  const footer = document.createElement('footer');
  footer.className = 'gi-footer';
  footer.append(container);

  if (arguments_.primarySlot) {
    const primary = document.createElement('div');
    primary.className = 'gi-footer-primary-slot';
    primary.innerHTML = arguments_.primarySlot;
    container.append(primary);
  }

  const sectionBreak = document.createElement('hr');
  sectionBreak.className = 'gi-section-break-md gi-border-gray-400';
  sectionBreak.setAttribute('role', 'separator');
  container.append(sectionBreak);

  if (arguments_.secondarySlot) {
    const secondary = document.createElement('div');
    secondary.className = 'gi-footer-secondary-slot';
    secondary.innerHTML = arguments_.secondarySlot;
    container.append(secondary);
  }

  if (arguments_.utilitySlot) {
    const utility = document.createElement('div');
    utility.className = 'gi-footer-utility-slot';
    utility.innerHTML = arguments_.utilitySlot;
    container.append(utility);
  }

  return React.createElement('div', {
    dangerouslySetInnerHTML: { __html: container.innerHTML },
  });
};

export const Default: Story = {
  args: {
    primarySlot: '<p>Primary Content</p>',
    secondarySlot: '<p>Secondary Content</p>',
    utilitySlot: '<p>Utility Content</p>',
    className: 'custom-footer',
    dataTestid: 'footer',
  },
  render: renderFooter,
};

export const WithoutSecondary: Story = {
  args: {
    primarySlot: '<p>Primary Content</p>',
    utilitySlot: '<p>Utility Content</p>',
    dataTestid: 'footer',
  },
  render: renderFooter,
};

export const OnlyPrimary: Story = {
  args: {
    primarySlot: '<p>Primary Content</p>',
    dataTestid: 'footer',
  },
  render: renderFooter,
};
