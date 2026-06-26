import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import Footer from '@/atoms/Footer';
import FooterSection, { FooterSectionVariant } from '@/atoms/FooterSection';
import FooterLogo from '@/atoms/FooterLogo';
import { H3, Text } from '@/atoms';
import Link from '@/atoms/Link';
import Stack from '@/atoms/Stack';
import { Grid } from '@/Grid';
import Divider from '@/Divider';
import { Container } from '@/container/container';
import { LogoGoldGreen } from '@/atoms/icons/logos';
import XIcon from '@/atoms/icons/socials/X';
import FacebookIcon from '@/atoms/icons/socials/Facebook';
import BlueskyIcon from '@/atoms/icons/socials/Bluesky';
import LinkedinIcon from '@/atoms/icons/socials/Linkedin';
import { footerMeta, Default as defaultStory } from '@/atoms/storybook/Footer.meta';

const meta: Meta = {
  ...footerMeta,
  title: 'Layout/Footer/Footer',
  component: Footer,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FullyComposed: Story = {
  ...defaultStory,
  args: {
    footer: {
      ariaLabel: 'Footer',
      id: 'footer-id',
      dataTestId: 'gi-footer',
    },
  },
  render: ({ footer }) => (
    <Footer {...footer}>
      <FooterSection variant={FooterSectionVariant.PRIMARY} dataTestId="footer-section-primary">
        <Container className="gi-text-black">
          <Grid container columns={{ base: 4, md: 8, lg: 12 }} dataTestId="primary">
            <Grid size={{ base: 4, md: 4, lg: 3 }}>
              <H3 className="gi-my-4">Services</H3>
              <Divider className="gi-my-4" />
              <ul className="gi-space-y-2">
                <li>
                  <Link underline="always" href="/services/public-services">
                    Public Services
                  </Link>
                </li>
                <li>
                  <Link underline="always" href="/services/business-services">
                    Business Services
                  </Link>
                </li>
                <li>
                  <Link underline="always" href="/services/online-services">
                    Online Services
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid size={{ base: 4, md: 4, lg: 3 }}>
              <H3 className="gi-my-4">Departments</H3>
              <Divider className="gi-my-4" />
              <ul className="gi-space-y-2">
                <li>
                  <Link underline="always" href="/departments/health">
                    Department of Health
                  </Link>
                </li>
                <li>
                  <Link underline="always" href="/departments/education">
                    Department of Education
                  </Link>
                </li>
                <li>
                  <Link underline="always" href="/departments/finance">
                    Department of Finance
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid size={{ base: 4, md: 4, lg: 3 }}>
              <H3 className="gi-my-4">Publications</H3>
              <Divider className="gi-my-4" />
              <ul className="gi-space-y-2">
                <li>
                  <Link underline="always" href="/publications/reports">
                    Reports
                  </Link>
                </li>
                <li>
                  <Link underline="always" href="/publications/statistics">
                    Statistics
                  </Link>
                </li>
                <li>
                  <Link underline="always" href="/publications/legislation">
                    Legislation
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid size={{ base: 4, md: 4, lg: 3 }}>
              <H3 className="gi-my-4">Contact</H3>
              <Divider className="gi-my-4" />
              <ul className="gi-space-y-2">
                <li>
                  <Link underline="always" href="/contact/find-an-office">
                    Find an Office
                  </Link>
                </li>
                <li>
                  <Link underline="always" href="/contact/phone-directory">
                    Phone Directory
                  </Link>
                </li>
                <li>
                  <Link underline="always" href="/contact/feedback">
                    Feedback
                  </Link>
                </li>
              </ul>
            </Grid>
          </Grid>

          <Divider className="gi-my-8" />
          <Stack id="lower-section" direction={{ base: 'column', md: 'row' }} gap={6}>
            <Stack id="left-side-content" direction="column" gap={6}>
              <Stack direction={{ base: 'column', md: 'row' }} gap={4} wrap>
                <Link underline="always" href="/about-us">
                  About Us
                </Link>
                <Link underline="always" href="/contact">
                  Contact
                </Link>
                <Link underline="always" href="/sitemap">
                  Sitemap
                </Link>
                <Link underline="always" href="/privacy-policy">
                  Privacy Policy
                </Link>
                <Link underline="always" href="/terms-of-service">
                  Terms of Service
                </Link>
                <Link underline="always" href="/careers">
                  Careers
                </Link>
                <Link underline="always" href="/blog">
                  Blog
                </Link>
                <Link underline="always" href="/faq">
                  FAQ
                </Link>
                <Link underline="always" href="/support">
                  Support
                </Link>
                <Link underline="always" href="/press">
                  Press
                </Link>
                <Link underline="always" href="/partners">
                  Partners
                </Link>
                <Link underline="always" href="/investors">
                  Investors
                </Link>
                <Link underline="always" href="/events">
                  Events
                </Link>
              </Stack>
              <Stack direction="row" gap={4}>
                <XIcon label="social_x" />
                <FacebookIcon label="social_facebook" />
                <BlueskyIcon label="social_bluesky" />
                <LinkedinIcon label="social_linkedin" />
              </Stack>
            </Stack>
            <FooterLogo dataTestId="footer-logo">
              <LogoGoldGreen size="181" label="Gov.ie Logo" />
            </FooterLogo>
          </Stack>
        </Container>
      </FooterSection>

      <FooterSection variant={FooterSectionVariant.UTILITY} dataTestId="footer-section-utility">
        <Stack
          wrap
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          justify="center"
          align="center"
          dataTestId="utility"
        >
          <Link underline="always" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link underline="always" href="/cookies">
            Cookies
          </Link>
          <Link underline="always" href="/accessibility">
            Accessibility
          </Link>
          <Link underline="always" href="/terms-of-use">
            Terms of Use
          </Link>
          <Text className="gi-text-sm">© 2026 Design System of Government of Ireland.</Text>
        </Stack>
      </FooterSection>
    </Footer>
  ),
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
