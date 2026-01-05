import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { Icon } from '../icon/icon.js';
import { Link } from '../link/link.js';
import { SectionBreak } from '../section-break/section-break.js';
import { Stack } from '../stack/stack.js';
import { Footer } from './footer.js';

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'layout/Footer',
  argTypes: {
    primarySlot: {
      control: 'object',
      description: 'Primary slot - typically main site sections',
    },
    secondarySlot: {
      control: 'object',
      description: 'Secondary slot - typically department/org specific links',
    },
    utilitySlot: {
      control: 'object',
      description:
        'Utility stot - typically copyright, privacy policy, accessibility, etc.',
    },
    logo: {
      control: 'object',
      description: 'Optional custom logo component',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    dataTestid: {
      control: 'text',
      description: 'Test ID for automated testing',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const CompleteFooter: Story = {
  args: {
    dataTestid: 'gi-footer',
    primarySlot: (
      <div className="gi-grid-responsive !gi-ml-0 !gi-mr-0">
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <h3 className="gi-heading-sm gi-mb-4">Services</h3>
          <SectionBreak
            color="gi-border-color-border-system-neutral-subtle"
            size="md"
          />
          <ul className="gi-space-y-2">
            <li>
              <Link
                noColor
                href="/services/public-services"
                aria-label="Public Services"
              >
                Public Services
              </Link>
            </li>
            <li>
              <Link
                noColor
                href="/services/business-services"
                aria-label="Business Services"
              >
                Business Services
              </Link>
            </li>
            <li>
              <Link
                noColor
                href="/services/online-services"
                aria-label="Online Services"
              >
                Online Services
              </Link>
            </li>
          </ul>
        </div>
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <h3 className="gi-heading-sm gi-mb-4">Departments</h3>
          <SectionBreak
            color="gi-border-color-border-system-neutral-subtle"
            size="md"
          />
          <ul className="gi-space-y-2">
            <li>
              <Link
                noColor
                href="/departments/health"
                aria-label="Department of Health"
              >
                Department of Health
              </Link>
            </li>
            <li>
              <Link
                noColor
                href="/departments/education"
                aria-label="Department of Education"
              >
                Department of Education
              </Link>
            </li>
            <li>
              <Link
                noColor
                href="/departments/finance"
                aria-label="Department of Finance"
              >
                Department of Finance
              </Link>
            </li>
          </ul>
        </div>
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <h3 className="gi-heading-sm gi-mb-4">Publications</h3>
          <SectionBreak
            color="gi-border-color-border-system-neutral-subtle"
            size="md"
          />
          <ul className="gi-space-y-2">
            <li>
              <Link noColor href="/publications/reports" aria-label="Reports">
                Reports
              </Link>
            </li>
            <li>
              <Link
                noColor
                href="/publications/statistics"
                aria-label="Statistics"
              >
                Statistics
              </Link>
            </li>
            <li>
              <Link
                noColor
                href="/publications/legislation"
                aria-label="Legislation"
              >
                Legislation
              </Link>
            </li>
          </ul>
        </div>
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <h3 className="gi-heading-sm gi-mb-4">Contact</h3>
          <SectionBreak
            color="gi-border-color-border-system-neutral-subtle"
            size="md"
          />
          <ul className="gi-space-y-2">
            <li>
              <Link
                noColor
                href="/contact/find-an-office"
                aria-label="Find an Office"
              >
                Find an Office
              </Link>
            </li>
            <li>
              <Link
                noColor
                href="/contact/phone-directory"
                aria-label="Phone Directory"
              >
                Phone Directory
              </Link>
            </li>
            <li>
              <Link noColor href="/contact/feedback" aria-label="Feedback">
                Feedback
              </Link>
            </li>
          </ul>
        </div>
      </div>
    ),
    secondarySlot: (
      <Stack direction={'column'} gap={4} role="region">
        <Stack
          aria-label="Footer Secondary Links"
          direction={{ base: 'column', xs: 'column', md: 'row' }}
          gap={4}
          wrap
        >
          <Link noColor href="/about-us" aria-label="About Us">
            About Us
          </Link>
          <Link noColor href="/contact" aria-label="Contact">
            Contact
          </Link>
          <Link noColor href="/sitemap" aria-label="Sitemap">
            Sitemap
          </Link>
          <Link noColor href="/privacy-policy" aria-label="Privacy Policy">
            Privacy Policy
          </Link>
          <Link noColor href="/terms-of-service" aria-label="Terms of Service">
            Terms of Service
          </Link>
          <Link noColor href="/careers" aria-label="Careers">
            Careers
          </Link>
          <Link noColor href="/blog" aria-label="Blog">
            Blog
          </Link>
          <Link noColor href="/faq" aria-label="FAQ">
            FAQ
          </Link>
          <Link noColor href="/support" aria-label="Support">
            Support
          </Link>
          <Link noColor href="/press" aria-label="Press">
            Press
          </Link>
          <Link noColor href="/partners" aria-label="Partners">
            Partners
          </Link>
          <Link noColor href="/investors" aria-label="Investors">
            Investors
          </Link>
          <Link noColor href="/events" aria-label="Events">
            Events
          </Link>
        </Stack>
        <Stack
          direction={'row'}
          gap={4}
          aria-label="Social Media Links"
          role="navigation"
        >
          <Icon icon="social_x" />
          <Icon icon="social_facebook" />
          <Icon icon="social_bluesky" />
          <Icon icon="social_linkedin" />
        </Stack>
      </Stack>
    ),
    utilitySlot: (
      <Stack
        direction={{ base: 'column', xs: 'column', md: 'row' }}
        gap={4}
        itemsDistribution="center"
        itemsAlignment="center"
      >
        <Link noColor href="/privacy-policy" aria-label="Privacy Policy">
          Privacy Policy
        </Link>
        <Link noColor href="/cookies" aria-label="Cookies">
          Cookies
        </Link>
        <Link noColor href="/accessibility" aria-label="Accessibility">
          Accessibility
        </Link>
        <Link noColor href="/terms-of-use" aria-label="Terms of Use">
          Terms of Use
        </Link>
        <div className="gi-text-sm">© 2025 Government of Ireland.</div>
      </Stack>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render the footer with default props', async () => {
      const footerElement = canvas.getByRole('contentinfo');
      expect(footerElement).toBeInTheDocument();
      expect(footerElement).toHaveAttribute('aria-label', 'Footer');
      expect(footerElement).toHaveAttribute('data-testid', 'gi-footer');
      expect(footerElement).toHaveClass('gi-footer');
    });

    await step(
      'should not render primary nav when primarySlot is not provided',
      async () => {
        const navigationElement = canvas.queryByLabelText(
          'Primary footer navigation',
        );
        expect(navigationElement).not.toBeInTheDocument();
      },
    );

    await step(
      'should not render secondary nav when secondarySlot is not provided',
      async () => {
        const navigationElement = canvas.queryByLabelText(
          'Secondary footer navigation',
        );
        expect(navigationElement).not.toBeInTheDocument();
      },
    );

    await step('should render secondary slot when provided', async () => {
      const element = canvas.getByTestId('gi-footer');
      expect(element).toBeInTheDocument();
    });
  },
};

export const SimpleFooter: Story = {
  args: {
    secondarySlot: (
      <Stack
        direction={{ base: 'column', xs: 'column', md: 'row' }}
        gap={4}
        wrap
        aria-label="Footer Secondary Links"
      >
        <Link noColor href="/about-us" aria-label="About Us">
          About Us
        </Link>
        <Link noColor href="/contact" aria-label="Contact">
          Contact
        </Link>
        <Link noColor href="/sitemap" aria-label="Sitemap">
          Sitemap
        </Link>
        <Link noColor href="/privacy-policy" aria-label="Privacy Policy">
          Privacy Policy
        </Link>
        <Link noColor href="/terms-of-service" aria-label="Terms of Service">
          Terms of Service
        </Link>
        <Link noColor href="/careers" aria-label="Careers">
          Careers
        </Link>
        <Link noColor href="/blog" aria-label="Blog">
          Blog
        </Link>
        <Link noColor href="/faq" aria-label="FAQ">
          FAQ
        </Link>
        <Link noColor href="/support" aria-label="Support">
          Support
        </Link>
        <Link noColor href="/press" aria-label="Press">
          Press
        </Link>
        <Link noColor href="/partners" aria-label="Partners">
          Partners
        </Link>
        <Link noColor href="/investors" aria-label="Investors">
          Investors
        </Link>
        <Link noColor href="/events" aria-label="Events">
          Events
        </Link>
      </Stack>
    ),
    utilitySlot: (
      <Stack
        direction={{ base: 'column', xs: 'column', md: 'row' }}
        gap={4}
        itemsDistribution="center"
      >
        <Link noColor href="/privacy-policy" aria-label="Privacy Policy">
          Privacy Policy
        </Link>
        <Link noColor href="/accessibility" aria-label="Accessibility">
          Accessibility
        </Link>
        <div className="gi-text-sm">© 2025 Government of Ireland.</div>
      </Stack>
    ),
  },
};

export const MinimalFooter: Story = {
  args: {
    utilitySlot: (
      <Stack
        direction={{ base: 'column', xs: 'column', md: 'row' }}
        gap={4}
        itemsDistribution="center"
      >
        <Link noColor href="/privacy-policy" aria-label="Privacy Policy">
          Privacy Policy
        </Link>
        <Link noColor href="/accessibility" aria-label="Accessibility">
          Accessibility
        </Link>
        <div className="gi-text-sm">© 2025 Government of Ireland.</div>
      </Stack>
    ),
  },
};

export const GovieFooter: Story = {
  args: {
    primarySlot: (
      <div className="gi-grid-responsive !gi-ml-0 !gi-mr-0">
        <div className="gi-col-span-6">
          <ul className="gi-list gi-space-y-2">
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                Circulars
              </a>
            </li>
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                Consultations
              </a>
            </li>
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                Directory
              </a>
            </li>
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                Policies
              </a>
            </li>
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                Publications
              </a>
            </li>
          </ul>
        </div>
        <div className="gi-col-span-6">
          <ul className="gi-list gi-space-y-2">
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                About gov.ie
              </a>
            </li>
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                Accessibility
              </a>
            </li>
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                Latest financial accounts
              </a>
            </li>
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                Sell to Government
              </a>
            </li>
            <li>
              <a href="#" className="gi-link gi-link-inherit">
                Who Does What
              </a>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should not render utility section when utilitySlot is not provided',
      async () => {
        const utilitySectionElement = canvas.queryByLabelText('Utility links');
        expect(utilitySectionElement).not.toBeInTheDocument();
      },
    );
  },
};

export const TestAllSlots: Story = {
  tags: ['skip-playwright'],
  args: {
    primarySlot: <div data-testid="primary">Primary</div>,
    secondarySlot: <div data-testid="secondary">Secondary</div>,
    utilitySlot: <div data-testid="utility">Utility</div>,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render all slots when provided', async () => {
      const primaryElement = canvas.getByTestId('primary');
      const secondaryElement = canvas.getByTestId('secondary');
      const utilityElement = canvas.getByTestId('utility');
      expect(primaryElement).toBeInTheDocument();
      expect(secondaryElement).toBeInTheDocument();
      expect(utilityElement).toBeInTheDocument();
    });
  },
};
