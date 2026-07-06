import type { StoryObj } from '@storybook/angular';
import { within, expect } from 'storybook/test';
import { footerMeta, Default as defaultStory } from '@/atoms/storybook/Footer.meta';
import { Footer, FooterSection, FooterLogo, Link, Text, Grid } from '@/atoms';
import Container from '@/atoms/Container';
import Divider from '@/atoms/Divider';
import Stack from '@/atoms/Stack';
import H4 from '@/atoms/heading/H4';
import { LogoGoldGreen } from '@/atoms/icons/logos';
import { XIcon, FacebookIcon, BlueskyIcon, LinkedinIcon } from '@/atoms/icons';

const meta = {
  ...footerMeta,
  title: 'Layout/Footer',
};

export default meta;

export const CompleteFooter: StoryObj = {
  ...defaultStory,
  args: {
    ariaLabel: 'Footer',
    id: 'footer-id',
    dataTestId: 'gi-footer',
  },
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [
        Footer,
        FooterSection,
        FooterLogo,
        Container,
        Grid,
        H4,
        Divider,
        Link,
        Stack,
        Text,
        LogoGoldGreen,
        XIcon,
        FacebookIcon,
        BlueskyIcon,
        LinkedinIcon,
      ],
    },
    template: `
      <gi-footer
        [ariaLabel]="ariaLabel"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        <gi-footer-section variant="primary" dataTestId="footer-section-primary">
          <gi-container className="gi-text-black">
            <gi-grid [container]="true" [columns]="{ base: 4, md: 8, lg: 12 }" gap="4" dataTestId="primary">
              <gi-grid [size]="{ base: 4, md: 4, lg: 3 }">
                <gi-h4 className="gi-my-4">Services</gi-h4>
                <gi-divider className="gi-my-4"></gi-divider>
                <ul class="gi-space-y-2">
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/services/public-services">Public Services</gi-link>
                  </li>
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/services/business-services">Business Services</gi-link>
                  </li>
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/services/online-services">Online Services</gi-link>
                  </li>
                </ul>
              </gi-grid>
              <gi-grid [size]="{ base: 4, md: 4, lg: 3 }">
                <gi-h4 className="gi-my-4">Departments</gi-h4>
                <gi-divider className="gi-my-4"></gi-divider>
                <ul class="gi-space-y-2">
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/departments/health">Department of Health</gi-link>
                  </li>
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/departments/education">Department of Education</gi-link>
                  </li>
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/departments/finance">Department of Finance</gi-link>
                  </li>
                </ul>
              </gi-grid>
              <gi-grid [size]="{ base: 4, md: 4, lg: 3 }">
                <gi-h4 className="gi-my-4">Publications</gi-h4>
                <gi-divider className="gi-my-4"></gi-divider>
                <ul class="gi-space-y-2">
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/publications/reports">Reports</gi-link>
                  </li>
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/publications/statistics">Statistics</gi-link>
                  </li>
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/publications/legislation">Legislation</gi-link>
                  </li>
                </ul>
              </gi-grid>
              <gi-grid [size]="{ base: 4, md: 4, lg: 3 }">
                <gi-h4 className="gi-my-4">Contact</gi-h4>
                <gi-divider className="gi-my-4"></gi-divider>
                <ul class="gi-space-y-2">
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/contact/find-an-office">Find an Office</gi-link>
                  </li>
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/contact/phone-directory">Phone Directory</gi-link>
                  </li>
                  <li>
                    <gi-link variant="inline" appearance="inherit" href="/contact/feedback">Feedback</gi-link>
                  </li>
                </ul>
              </gi-grid>
            </gi-grid>

            <gi-divider className="gi-my-8"></gi-divider>
            <gi-stack id="lower-section" [direction]="{ base: 'column', md: 'row' }" [gap]="6">
              <gi-stack id="left-side-content" direction="column" [gap]="6">
                <gi-stack [direction]="{ base: 'column', md: 'row' }" [gap]="4" [wrap]="true">
                  <gi-link variant="inline" appearance="inherit" href="/about-us">About Us</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/contact">Contact</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/sitemap">Sitemap</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/privacy-policy">Privacy Policy</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/terms-of-service">Terms of Service</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/careers">Careers</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/blog">Blog</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/faq">FAQ</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/support">Support</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/press">Press</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/partners">Partners</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/investors">Investors</gi-link>
                  <gi-link variant="inline" appearance="inherit" href="/events">Events</gi-link>
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
            [direction]="{ base: 'column', md: 'row' }"
            [gap]="4"
            justify="center"
            align="center"
            dataTestId="utility"
          >
            <gi-link variant="inline" appearance="inherit" href="/privacy-policy">Privacy Policy</gi-link>
            <gi-link variant="inline" appearance="inherit" href="/cookies">Cookies</gi-link>
            <gi-link variant="inline" appearance="inherit" href="/accessibility">Accessibility</gi-link>
            <gi-link variant="inline" appearance="inherit" href="/terms-of-use">Terms of Use</gi-link>
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
  },
};
