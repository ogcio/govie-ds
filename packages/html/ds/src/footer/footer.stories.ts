import type { Meta, StoryObj } from '@storybook/react';
import { beautifyHtmlNode } from '../storybook/storybook';
import { getLogoContainer } from './footer.helpers.js';
import { FooterProps } from './footer.schema';

const meta: Meta<FooterProps> = {
  title: 'Layout/Footer',
  argTypes: {
    primarySlot: { control: 'text', description: 'Primary content slot' },
    secondarySlot: { control: 'text', description: 'Secondary content slot' },
    utilitySlot: { control: 'text', description: 'Utility content slot' },
    logo: {
      control: 'object',
      description: 'Optional custom logo component',
    },
    class: { control: 'text', description: 'Additional CSS classes' },
    dataTestid: { control: 'text', description: 'Test ID for queries' },
  },
};
export default meta;

type Story = StoryObj<FooterProps>;

const createFooter = (arguments_: FooterProps) => {
  const container = document.createElement('div');
  container.className = `gi-footer-container ${arguments_.class ?? ''}`.trim();
  if (arguments_.dataTestid) {
    container.dataset.testid = arguments_.dataTestid;
  }

  const footer = document.createElement('footer');
  footer.className = 'gi-footer';
  const mainContainer = document.createElement('div');
  mainContainer.className = 'gi-layout-container';

  mainContainer.append(container);
  footer.append(mainContainer);

  if (arguments_.primarySlot) {
    const primary = document.createElement('div');
    primary.innerHTML = arguments_.primarySlot;
    container.append(primary);
  }

  if (arguments_.primarySlot && arguments_.secondarySlot) {
    const sectionBreak = document.createElement('hr');
    sectionBreak.className = 'gi-section-break-lg gi-border-gray-100';
    sectionBreak.setAttribute('role', 'separator');
    container.append(sectionBreak);
  }

  const secondary = document.createElement('div');
  secondary.className = 'gi-footer-secondary-slot';

  secondary.append(getLogoContainer());
  container.append(secondary);

  if (arguments_.secondarySlot) {
    const secondaryContent = document.createElement('div');
    secondaryContent.className = 'gi-footer-secondary-slot-content';
    secondaryContent.innerHTML = arguments_.secondarySlot;
    secondary.append(secondaryContent);
  }

  if (arguments_.utilitySlot) {
    const utility = document.createElement('div');
    utility.className = 'gi-footer-utility';
    utility.innerHTML = arguments_.utilitySlot;
    footer.append(utility);
  }

  return beautifyHtmlNode(footer);
};

export const CompleteFooter: Story = {
  args: {
    primarySlot: `
    <div class="gi-grid-responsive !gi-ml-0 !gi-mr-0">
      <div class="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
        <h3 class="gi-heading-sm gi-mb-4">Services</h3>
        <hr
          class="gi-section-break-md gi-border-color-border-system-neutral-subtle"
          role="separator"
        />
        <ul class="gi-list gi-space-y-2">
          <li>
            <a href="#" class="gi-link gi-link-inherit">Public Services</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Business Services</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Online Services</a>
          </li>
        </ul>
      </div>
      <div class="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
        <h3 class="gi-heading-sm gi-mb-4">Departments</h3>
        <hr
          class="gi-border-color-border-system-neutral-subtle"
          role="separator"
        />
        <ul class="gi-list gi-space-y-2">
          <li>
            <a href="#" class="gi-link gi-link-inherit">Department of Health</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Department of Education</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Department of Finance</a>
          </li>
        </ul>
      </div>
      <div class="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
        <h3 class="gi-heading-sm gi-mb-4">Publications</h3>
        <hr
          class="gi-section-break-md gi-border-color-border-system-neutral-subtle"
          role="separator"
        />
        <ul class="gi-list gi-space-y-2">
          <li>
            <a href="#" class="gi-link gi-link-inherit">Reports</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Statistics</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Legislation</a>
          </li>
        </ul>
      </div>
      <div class="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
        <h3 class="gi-heading-sm gi-mb-4">Contact</h3>
        <hr
          class="gi-section-break-md gi-border-color-border-system-neutral-subtle"
          role="separator"
        />
        <ul class="gi-list gi-space-y-2">
          <li>
            <a href="#" class="gi-link gi-link-inherit">Find an Office</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Phone Directory</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Feedback</a>
          </li>
        </ul>
      </div>
    </div>
    `,
    secondarySlot: `
      <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col gi-gap-4 gi-flex-nowrap">
        <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-row gi-gap-4 gi-flex-wrap">
          <a href="#" class="gi-link gi-link-inherit">About Us</a>
          <a href="#" class="gi-link gi-link-inherit">Contact</a>
          <a href="#" class="gi-link gi-link-inherit">Sitemap</a>
          <a href="#" class="gi-link gi-link-inherit">Privacy Policy</a>
          <a href="#" class="gi-link gi-link-inherit">Terms of Service</a>
          <a href="#" class="gi-link gi-link-inherit">Careers</a>
          <a href="#" class="gi-link gi-link-inherit">Blog</a>
          <a href="#" class="gi-link gi-link-inherit">FAQ</a>
          <a href="#" class="gi-link gi-link-inherit">Support</a>
          <a href="#" class="gi-link gi-link-inherit">Press</a>
          <a href="#" class="gi-link gi-link-inherit">Partners</a>
          <a href="#" class="gi-link gi-link-inherit">Investors</a>
          <a href="#" class="gi-link gi-link-inherit">Events</a>
        </div>
        <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-row gi-gap-4 gi-flex-wrap">
          <img alt="X logo" src="https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/social/X.svg" />
          <img alt="Facebook logo" src="https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/social/Facebook.svg" />
          <img alt="Bluesky logo" src="https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/social/Bluesky.svg" />
          <img alt="Linkedin logo" src="https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/social/Linkedin.svg" />
        </div>
      </div>`,
    utilitySlot: `
    <div class="gi-flex gi-w-full gi-justify-center gi-items-center gi-flex-col xs:gi-flex-col md:gi-flex-row gi-gap-4 gi-flex-nowrap">
      <a href="#" data-testid="" class="gi-link gi-link-inherit">Privacy Policy</a>
      <a href="#" data-testid="" class="gi-link gi-link-inherit">Accessibility</a>
      <div class="gi-text-sm">
        © ${new Date().getFullYear()} Government of Ireland.
      </div>
    </div>`,
    class: 'custom-footer',
    dataTestid: 'footer-complete',
  },
  // @ts-expect-error Type mismatch: createFooter returns a string instead of a React element
  render: (arguments_) => createFooter(arguments_),
};

export const MinimalFooter: Story = {
  args: {
    secondarySlot: `
      <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-row gi-gap-4 gi-flex-wrap">
        <a href="#" class="gi-link gi-link-inherit">About Us</a>
        <a href="#" class="gi-link gi-link-inherit">Contact</a>
        <a href="#" class="gi-link gi-link-inherit">Sitemap</a>
        <a href="#" class="gi-link gi-link-inherit">Privacy Policy</a>
        <a href="#" class="gi-link gi-link-inherit">Terms of Service</a>
        <a href="#" class="gi-link gi-link-inherit">Careers</a>
        <a href="#" class="gi-link gi-link-inherit">Blog</a>
        <a href="#" class="gi-link gi-link-inherit">FAQ</a>
        <a href="#" class="gi-link gi-link-inherit">Support</a>
        <a href="#" class="gi-link gi-link-inherit">Press</a>
        <a href="#" class="gi-link gi-link-inherit">Partners</a>
        <a href="#" class="gi-link gi-link-inherit">Investors</a>
        <a href="#" class="gi-link gi-link-inherit">Events</a>
      </div>`,
    utilitySlot: `
      <div class="gi-flex gi-w-full gi-justify-center gi-items-center gi-flex-col xs:gi-flex-col md:gi-flex-row gi-gap-4 gi-flex-nowrap">
        <a href="#" data-testid="" class="gi-link gi-link-inherit">Privacy Policy</a>
        <a href="#" data-testid="" class="gi-link gi-link-inherit">Accessibility</a>
        <div class="gi-text-sm">
          © ${new Date().getFullYear()} Government of Ireland.
        </div>
      </div>`,
    dataTestid: 'footer-minimal',
  },
  // @ts-expect-error Type mismatch: createFooter returns a string instead of a React element
  render: (arguments_) => createFooter(arguments_),
};

export const SimpleFooter: Story = {
  args: {
    dataTestid: 'footer',
    utilitySlot: `
      <div class="gi-flex gi-w-full gi-justify-center gi-items-center gi-flex-col xs:gi-flex-col md:gi-flex-row gi-gap-4 gi-flex-nowrap">
        <a href="#" data-testid="" class="gi-link gi-link-inherit">Privacy Policy</a>
        <a href="#" data-testid="" class="gi-link gi-link-inherit">Accessibility</a>
        <div class="gi-text-sm">
          © ${new Date().getFullYear()} Government of Ireland.
        </div>
      </div>`,
  },
  // @ts-expect-error Type mismatch: createFooter returns a string instead of a React element
  render: (arguments_) => createFooter(arguments_),
};

export const GovieFooter: Story = {
  args: {
    primarySlot: `
    <div class="gi-grid-responsive !gi-ml-0 !gi-mr-0">
      <div class="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
        <ul class="gi-list gi-space-y-2">
          <li>
            <a href="#" class="gi-link gi-link-inherit">Circulars</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Consultations</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Directory</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Policies</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Publications</a>
          </li>
        </ul>
      </div>
      <div class="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
        <ul class="gi-list gi-space-y-2">
          <li>
            <a href="#" class="gi-link gi-link-inherit">Latest financial accounts</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Sell to Government</a>
          </li>
          <li>
            <a href="#" class="gi-link gi-link-inherit">Who Does What</a>
          </li>
        </ul>
      </div>
    </div>
    `,
    secondarySlot: `
      <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col gi-gap-4 gi-flex-nowrap">
        <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-row gi-gap-4 gi-flex-wrap">
          <a href="#" class="gi-link gi-link-inherit">Privacy Policy</a>
          <a href="#" class="gi-link gi-link-inherit">Accessibility</a>
        </div>
      </div>`,
    utilitySlot: `
    <div class="gi-flex gi-w-full gi-justify-center gi-items-center gi-flex-col xs:gi-flex-col md:gi-flex-row gi-gap-4 gi-flex-nowrap">
      <div class="gi-text-sm">
        © ${new Date().getFullYear()} Government of Ireland.
      </div>
    </div>`,
    class: 'custom-footer',
    dataTestid: 'footer-complete',
  },
  // @ts-expect-error Type mismatch: createFooter returns a string instead of a React element
  render: (arguments_) => createFooter(arguments_),
};
