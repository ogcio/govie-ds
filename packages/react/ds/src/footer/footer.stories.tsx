import type { Meta, StoryObj } from '@storybook/react';
import { SectionBreak } from '../section-break/section-break.js';
import { Footer } from './footer.js';
import { Link } from '../link/link.js';

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
      <div className="gi-grid-responsive">
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <SectionBreak color="gi-border-gray-100" size="md" />
          <h3 className="gi-heading-sm gi-mb-4">Services</h3>
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
          <SectionBreak color="gi-border-gray-100" size="md" />
          <h3 className="gi-heading-sm gi-mb-4">Departments</h3>
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
          <SectionBreak color="gi-border-gray-100" size="md" />
          <h3 className="gi-heading-sm gi-mb-4">Publications</h3>
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
          <SectionBreak color="gi-border-gray-100" size="md" />
          <h3 className="gi-heading-sm gi-mb-4">Contact</h3>
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
      <div className="gi-grid-responsive">
        <div className="gi-col-span-12">
          <div className="gi-flex gi-flex-col md:gi-flex-row gi-space-y-4 md:gi-space-y-0 md:gi-space-x-6">
            <Link noColor href="/about-us" aria-label="About Us">
              About Us
            </Link>
            <Link noColor href="/news" aria-label="News">
              News
            </Link>
            <Link noColor href="/events" aria-label="Events">
              Events
            </Link>
            <Link noColor href="/jobs" aria-label="Jobs">
              Jobs
            </Link>
          </div>
        </div>
      </div>
    ),
    utilitySlot: (
      <div className="gi-grid-responsive">
        <div className="gi-col-span-12">
          <div className="gi-flex gi-flex-col md:gi-flex-row gi-justify-center gi-space-y-4 md:gi-space-y-0">
            <div className="gi-flex gi-flex-col md:gi-flex-row gi-space-y-3 md:gi-space-y-0 md:gi-space-x-6 gi-text-sm gi-items-center">
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
              <div className="gi-text-sm">
                © {new Date().getFullYear()} Government of Ireland.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const SimpleFooter: Story = {
  args: {
    secondarySlot: (
      <div className="gi-grid-responsive">
        <div className="gi-col-span-12">
          <div className="gi-flex gi-flex-col md:gi-flex-row gi-space-y-4 md:gi-space-y-0 md:gi-space-x-6">
            <Link href="/about-us" aria-label="About Us">
              About Us
            </Link>
            <Link href="/contact" aria-label="Contact">
              Contact
            </Link>
            <Link href="/sitemap" aria-label="Sitemap">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    ),
    utilitySlot: (
      <div className="gi-grid-responsive">
        <div className="gi-col-span-12">
          <div className="gi-flex gi-flex-col md:gi-flex-row gi-justify-center gi-space-y-4 md:gi-space-y-0 gi-py-4">
            <div className="gi-flex gi-flex-row gi-space-x-6 gi-text-sm">
              <Link href="/privacy-policy" aria-label="Privacy Policy">
                Privacy Policy
              </Link>
              <Link href="/accessibility" aria-label="Accessibility">
                Accessibility
              </Link>
              <div className="gi-text-sm">
                © {new Date().getFullYear()} Government of Ireland.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const MinimalFooter: Story = {
  args: {
    utilitySlot: (
      <div className="gi-grid-responsive">
        <div className="gi-col-span-12">
          <div className="gi-flex gi-flex-col md:gi-flex-row gi-justify-center gi-space-y-4 md:gi-space-y-0 gi-py-4">
            <div className="gi-flex gi-flex-row gi-space-x-6 gi-text-sm">
              <Link
                href="https://www.gov.ie/privacy/"
                external
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </Link>
              <Link
                href="https://www.gov.ie/cookies/"
                external
                aria-label="Cookies"
              >
                Cookies
              </Link>
              <div className="gi-text-sm">
                © {new Date().getFullYear()} Government of Ireland
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};
