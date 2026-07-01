import type { StoryObj } from '@storybook/angular';
import { within, expect } from 'storybook/test';
import { footerMeta, Default as defaultStory } from '@/atoms/storybook/Footer.meta';
import { Footer, FooterSection, FooterLogo, Link, Text, Grid } from '@/atoms';
import Container from '@/atoms/Container';
import Divider from '@/atoms/Divider';
import Stack from '@/atoms/Stack';
import H3 from '@/atoms/heading/H3';
import { LogoGoldGreen } from '@/atoms/icons/logos';
import { XIcon, FacebookIcon, BlueskyIcon, LinkedinIcon } from '@/atoms/icons';

const meta = {
  ...footerMeta,
  title: 'Layout/Footer',
};

export default meta;

const gridColumns = { base: 4, md: 8, lg: 12 };
const gridSize = { base: 4, md: 4, lg: 3 };
const lowerSectionDirection = { base: 'column', md: 'row' };
const linksStackDirection = { base: 'column', md: 'row' };
const utilityStackDirection = { base: 'column', md: 'row' };

const completeFooterImports = [
  Footer,
  FooterSection,
  FooterLogo,
  Container,
  Grid,
  H3,
  Divider,
  Link,
  Stack,
  Text,
  LogoGoldGreen,
  XIcon,
  FacebookIcon,
  BlueskyIcon,
  LinkedinIcon,
];

export const CompleteFooter: StoryObj = {
  ...defaultStory,
  args: {
    ariaLabel: 'Footer',
    id: 'footer-id',
    dataTestId: 'gi-footer',
  },
  render: (props) => ({
    props: {
      ...props,
      gridColumns,
      gridSize,
      lowerSectionDirection,
      linksStackDirection,
      utilityStackDirection,
    },
    moduleMetadata: { imports: completeFooterImports },
    template: `
      <gi-footer
        [ariaLabel]="ariaLabel"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        <gi-footer-section variant="primary" dataTestId="footer-section-primary">
          <gi-container className="gi-text-black">
            <gi-grid [container]="true" [columns]="gridColumns" gap="4" dataTestId="primary">
              <gi-grid [size]="gridSize">
                <gi-h3 className="gi-my-4">Services</gi-h3>
                <gi-divider className="gi-my-4"></gi-divider>
                <ul class="gi-space-y-2">
                  <li>
                    <gi-link underline="always" href="/services/public-services">Public Services</gi-link>
                  </li>
                  <li>
                    <gi-link underline="always" href="/services/business-services">Business Services</gi-link>
                  </li>
                  <li>
                    <gi-link underline="always" href="/services/online-services">Online Services</gi-link>
                  </li>
                </ul>
              </gi-grid>
              <gi-grid [size]="gridSize">
                <gi-h3 className="gi-my-4">Departments</gi-h3>
                <gi-divider className="gi-my-4"></gi-divider>
                <ul class="gi-space-y-2">
                  <li>
                    <gi-link underline="always" href="/departments/health">Department of Health</gi-link>
                  </li>
                  <li>
                    <gi-link underline="always" href="/departments/education">Department of Education</gi-link>
                  </li>
                  <li>
                    <gi-link underline="always" href="/departments/finance">Department of Finance</gi-link>
                  </li>
                </ul>
              </gi-grid>
              <gi-grid [size]="gridSize">
                <gi-h3 className="gi-my-4">Publications</gi-h3>
                <gi-divider className="gi-my-4"></gi-divider>
                <ul class="gi-space-y-2">
                  <li>
                    <gi-link underline="always" href="/publications/reports">Reports</gi-link>
                  </li>
                  <li>
                    <gi-link underline="always" href="/publications/statistics">Statistics</gi-link>
                  </li>
                  <li>
                    <gi-link underline="always" href="/publications/legislation">Legislation</gi-link>
                  </li>
                </ul>
              </gi-grid>
              <gi-grid [size]="gridSize">
                <gi-h3 className="gi-my-4">Contact</gi-h3>
                <gi-divider className="gi-my-4"></gi-divider>
                <ul class="gi-space-y-2">
                  <li>
                    <gi-link underline="always" href="/contact/find-an-office">Find an Office</gi-link>
                  </li>
                  <li>
                    <gi-link underline="always" href="/contact/phone-directory">Phone Directory</gi-link>
                  </li>
                  <li>
                    <gi-link underline="always" href="/contact/feedback">Feedback</gi-link>
                  </li>
                </ul>
              </gi-grid>
            </gi-grid>

            <gi-divider className="gi-my-8"></gi-divider>
            <gi-stack id="lower-section" [direction]="lowerSectionDirection" [gap]="6">
              <gi-stack id="left-side-content" direction="column" [gap]="6">
                <gi-stack [direction]="linksStackDirection" [gap]="4" [wrap]="true">
                  <gi-link underline="always" href="/about-us">About Us</gi-link>
                  <gi-link underline="always" href="/contact">Contact</gi-link>
                  <gi-link underline="always" href="/sitemap">Sitemap</gi-link>
                  <gi-link underline="always" href="/privacy-policy">Privacy Policy</gi-link>
                  <gi-link underline="always" href="/terms-of-service">Terms of Service</gi-link>
                  <gi-link underline="always" href="/careers">Careers</gi-link>
                  <gi-link underline="always" href="/blog">Blog</gi-link>
                  <gi-link underline="always" href="/faq">FAQ</gi-link>
                  <gi-link underline="always" href="/support">Support</gi-link>
                  <gi-link underline="always" href="/press">Press</gi-link>
                  <gi-link underline="always" href="/partners">Partners</gi-link>
                  <gi-link underline="always" href="/investors">Investors</gi-link>
                  <gi-link underline="always" href="/events">Events</gi-link>
                </gi-stack>
                <gi-stack direction="row" [gap]="4">
                  <gi-x-icon [size]="24" label="social_x"></gi-x-icon>
                  <gi-facebook-icon label="social_facebook"></gi-facebook-icon>
                  <gi-bluesky-icon label="social_bluesky"></gi-bluesky-icon>
                  <gi-linkedin-icon label="social_linkedin"></gi-linkedin-icon>
                </gi-stack>
              </gi-stack>
              <gi-footer-logo dataTestId="footer-logo">
                <logo-gold-green size="181" label="Gov.ie Logo"></logo-gold-green>
              </gi-footer-logo>
            </gi-stack>
          </gi-container>
        </gi-footer-section>

        <gi-footer-section variant="utility" dataTestId="footer-section-utility">
          <gi-stack
            [wrap]="true"
            [direction]="utilityStackDirection"
            [gap]="4"
            justify="center"
            align="center"
            dataTestId="utility"
          >
            <gi-link underline="always" href="/privacy-policy">Privacy Policy</gi-link>
            <gi-link underline="always" href="/cookies">Cookies</gi-link>
            <gi-link underline="always" href="/accessibility">Accessibility</gi-link>
            <gi-link underline="always" href="/terms-of-use">Terms of Use</gi-link>
            <gi-text className="gi-text-sm">© 2026 Design System of Government of Ireland.</gi-text>
          </gi-stack>
        </gi-footer-section>
      </gi-footer>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render the footer with default props', async () => {
      const footerElement = canvas.getByRole('contentinfo');
      expect(footerElement).toBeInTheDocument();
      expect(footerElement).toHaveAttribute('aria-label', 'Footer');
      expect(footerElement).toHaveAttribute('data-testid', 'gi-footer');
    });

    await step('should render all slots when provided', async () => {
      expect(canvas.getByTestId('primary')).toBeInTheDocument();
      expect(canvas.getByTestId('secondary')).toBeInTheDocument();
      expect(canvas.getByTestId('utility')).toBeInTheDocument();
    });
  },
};
