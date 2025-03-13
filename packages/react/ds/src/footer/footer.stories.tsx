import type { Meta, StoryObj } from '@storybook/react';
import { Anchor } from '../primitives/anchor.js';
import { SectionBreak } from '../section-break/section-break.js';
import { Footer } from './footer.js';

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'layout/Footer',
  argTypes: {
    primarySlot: {
      control: 'object',
      description: 'Primary navigation links - typically main site sections',
    },
    secondarySlot: {
      control: 'object',
      description:
        'Secondary navigation links - typically department/org specific links',
    },
    utilitySlot: {
      control: 'object',
      description:
        'Utility links - typically copyright, privacy policy, accessibility, etc.',
    },
    logoComponent: {
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
    primarySlot: (
      <div className="!gi-ml-0 !gi-mr-0 gi-grid-responsive">
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <SectionBreak color="gi-border-gray-100" size="md" />
          <h3 className="gi-heading-sm gi-mb-4">Services</h3>
          <ul className="gi-space-y-2">
            <li>
              <Anchor
                href="/services/public-services"
                aria-label="Public Services"
              >
                Public Services
              </Anchor>
            </li>
            <li>
              <Anchor
                href="/services/business-services"
                aria-label="Business Services"
              >
                Business Services
              </Anchor>
            </li>
            <li>
              <Anchor
                href="/services/online-services"
                aria-label="Online Services"
              >
                Online Services
              </Anchor>
            </li>
          </ul>
        </div>
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <SectionBreak color="gi-border-gray-100" size="md" />
          <h3 className="gi-heading-sm gi-mb-4">Departments</h3>
          <ul className="gi-space-y-2">
            <li>
              <Anchor
                href="/departments/health"
                aria-label="Department of Health"
              >
                Department of Health
              </Anchor>
            </li>
            <li>
              <Anchor
                href="/departments/education"
                aria-label="Department of Education"
              >
                Department of Education
              </Anchor>
            </li>
            <li>
              <Anchor
                href="/departments/finance"
                aria-label="Department of Finance"
              >
                Department of Finance
              </Anchor>
            </li>
          </ul>
        </div>
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <SectionBreak color="gi-border-gray-100" size="md" />
          <h3 className="gi-heading-sm gi-mb-4">Publications</h3>
          <ul className="gi-space-y-2">
            <li>
              <Anchor href="/publications/reports" aria-label="Reports">
                Reports
              </Anchor>
            </li>
            <li>
              <Anchor href="/publications/statistics" aria-label="Statistics">
                Statistics
              </Anchor>
            </li>
            <li>
              <Anchor href="/publications/legislation" aria-label="Legislation">
                Legislation
              </Anchor>
            </li>
          </ul>
        </div>
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <SectionBreak color="gi-border-gray-100" size="md" />
          <h3 className="gi-heading-sm gi-mb-4">Contact</h3>
          <ul className="gi-space-y-2">
            <li>
              <Anchor
                href="/contact/find-an-office"
                aria-label="Find an Office"
              >
                Find an Office
              </Anchor>
            </li>
            <li>
              <Anchor
                href="/contact/phone-directory"
                aria-label="Phone Directory"
              >
                Phone Directory
              </Anchor>
            </li>
            <li>
              <Anchor href="/contact/feedback" aria-label="Feedback">
                Feedback
              </Anchor>
            </li>
          </ul>
        </div>
      </div>
    ),
    secondarySlot: (
      <div className="gi-flex gi-flex-col md:gi-flex-row gi-space-y-4 md:gi-space-y-0 md:gi-space-x-6">
        <Anchor href="/about-us" aria-label="About Us">
          About Us
        </Anchor>
        <Anchor href="/news" aria-label="News">
          News
        </Anchor>
        <Anchor href="/events" aria-label="Events">
          Events
        </Anchor>
        <Anchor href="/jobs" aria-label="Jobs">
          Jobs
        </Anchor>
      </div>
    ),
    utilitySlot: (
      <div className="gi-flex gi-flex-col md:gi-flex-row gi-justify-center gi-space-y-4 md:gi-space-y-0 gi-py-4">
        <div className="gi-flex gi-flex-row gi-space-x-6 gi-text-sm">
          <Anchor href="/privacy-policy" aria-label="Privacy Policy">
            Privacy Policy
          </Anchor>
          <Anchor href="/cookies" aria-label="Cookies">
            Cookies
          </Anchor>
          <Anchor href="/accessibility" aria-label="Accessibility">
            Accessibility
          </Anchor>
          <Anchor href="/terms-of-use" aria-label="Terms of Use">
            Terms of Use
          </Anchor>
          <div className="gi-text-sm">
            © {new Date().getFullYear()} Government of Ireland.
          </div>
        </div>
      </div>
    ),
  },
};

export const SimpleFooter: Story = {
  args: {
    secondarySlot: (
      <div className="gi-flex gi-flex-col md:gi-flex-row gi-space-y-4 md:gi-space-y-0 md:gi-space-x-6">
        <Anchor href="/about-us" aria-label="About Us">
          About Us
        </Anchor>
        <Anchor href="/contact" aria-label="Contact">
          Contact
        </Anchor>
        <Anchor href="/sitemap" aria-label="Sitemap">
          Sitemap
        </Anchor>
      </div>
    ),
    utilitySlot: (
      <div className="gi-flex gi-flex-col md:gi-flex-row gi-justify-center gi-space-y-4 md:gi-space-y-0 gi-py-4">
        <div className="gi-flex gi-flex-row gi-space-x-6 gi-text-sm">
          <Anchor href="/privacy-policy" aria-label="Privacy Policy">
            Privacy Policy
          </Anchor>
          <Anchor href="/accessibility" aria-label="Accessibility">
            Accessibility
          </Anchor>
          <div className="gi-text-sm">
            © {new Date().getFullYear()} Government of Ireland.
          </div>
        </div>
      </div>
    ),
  },
};

export const MinimalFooter: Story = {
  args: {
    utilitySlot: (
      <div className="gi-flex gi-flex-col md:gi-flex-row gi-justify-center gi-space-y-4 md:gi-space-y-0 gi-py-4">
        <div className="gi-flex gi-flex-row gi-space-x-6 gi-text-sm">
          <Anchor
            href="https://www.gov.ie/privacy/"
            external
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </Anchor>
          <Anchor
            href="https://www.gov.ie/cookies/"
            external
            aria-label="Cookies"
          >
            Cookies
          </Anchor>
          <div className="gi-text-sm">
            © {new Date().getFullYear()} Government of Ireland
          </div>
        </div>
      </div>
    ),
  },
};
