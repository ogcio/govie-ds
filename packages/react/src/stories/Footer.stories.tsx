import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import Footer from '@/atoms/Footer';
import FooterSection, { FooterSectionVariant } from '@/atoms/FooterSection';
import FooterLogo from '@/atoms/FooterLogo';
import Text from '@/atoms/Text';
import H4 from '@/atoms/heading/H4';
import Link from '@/Link';
import Stack from '@/atoms/Stack';
import Grid from '@/atoms/Grid';
import Divider from '@/Divider';
import Container from '@/atoms/Container';
import LogoGoldGreen from '@/atoms/icons/logos/LogoGoldGreen';
import XIcon from '@/atoms/icons/socials/X';
import FacebookIcon from '@/atoms/icons/socials/Facebook';
import BlueskyIcon from '@/atoms/icons/socials/Bluesky';
import LinkedinIcon from '@/atoms/icons/socials/Linkedin';
import { footerMeta, CompleteFooter as CompleteFooterStory } from '@/atoms/storybook/Footer.meta';

const meta: Meta = {
  ...footerMeta,
  title: 'Layout/Footer/Footer',
  component: Footer,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteFooter: Story = {
  ...CompleteFooterStory,
  render: (props) => (
    <Footer {...props}>
      <FooterSection variant={FooterSectionVariant.PRIMARY} dataTestId="footer-section-primary">
        <Container className="gi-text-black">
          <Grid container columns={{ base: 4, md: 8, lg: 12 }} gap={4} dataTestId="primary">
            <Grid size={{ base: 4, md: 4, lg: 3 }}>
              <H4 className="gi-my-4">Services</H4>
              <Divider className="gi-my-4" />
              <Stack direction={'column'} gap={2}>
                <Link variant="inline" appearance="inherit" href="/services/public-services">
                  Public Services
                </Link>
                <Link variant="inline" appearance="inherit" href="/services/business-services">
                  Business Services
                </Link>
                <Link variant="inline" appearance="inherit" href="/services/online-services">
                  Online Services
                </Link>
              </Stack>
            </Grid>
            <Grid size={{ base: 4, md: 4, lg: 3 }}>
              <H4 className="gi-my-4">Departments</H4>
              <Divider className="gi-my-4" />
              <Stack direction={'column'} gap={2}>
                <Link variant="inline" appearance="inherit" href="/departments/health">
                  Department of Health
                </Link>
                <Link variant="inline" appearance="inherit" href="/departments/education">
                  Department of Education
                </Link>
                <Link variant="inline" appearance="inherit" href="/departments/finance">
                  Department of Finance
                </Link>
              </Stack>
            </Grid>
            <Grid size={{ base: 4, md: 4, lg: 3 }}>
              <H4 className="gi-my-4">Publications</H4>
              <Divider className="gi-my-4" />
              <Stack direction={'column'} gap={2}>
                <Link variant="inline" appearance="inherit" href="/departments/education">
                  Reports
                </Link>
                <Link variant="inline" appearance="inherit" href="/departments/finance">
                  Statistics
                </Link>
                <Link variant="inline" appearance="inherit" href="/departments/health">
                  Legislation
                </Link>
              </Stack>
            </Grid>
            <Grid size={{ base: 4, md: 4, lg: 3 }}>
              <H4 className="gi-my-4">Contact</H4>
              <Divider className="gi-my-4" />
              <Stack direction={'column'} gap={2}>
                <Link variant="inline" appearance="inherit" href="/departments/education">
                  Find an Office
                </Link>
                <Link variant="inline" appearance="inherit" href="/departments/finance">
                  Phone Directory
                </Link>
                <Link variant="inline" appearance="inherit" href="/departments/health">
                  Feedback
                </Link>
              </Stack>
            </Grid>
          </Grid>

          <Divider className="gi-my-8" />
          <Stack id="lower-section" direction={{ base: 'column', md: 'row' }} gap={6}>
            <Stack id="left-side-content" direction="column" gap={6}>
              <Stack direction={{ base: 'column', md: 'row' }} gap={4} wrap>
                <Link variant="inline" appearance="inherit" href="/about-us">
                  About Us
                </Link>
                <Link variant="inline" appearance="inherit" href="/contact">
                  Contact
                </Link>
                <Link variant="inline" appearance="inherit" href="/sitemap">
                  Sitemap
                </Link>
                <Link variant="inline" appearance="inherit" href="/privacy-policy">
                  Privacy Policy
                </Link>
                <Link variant="inline" appearance="inherit" href="/terms-of-service">
                  Terms of Service
                </Link>
                <Link variant="inline" appearance="inherit" href="/careers">
                  Careers
                </Link>
                <Link variant="inline" appearance="inherit" href="/blog">
                  Blog
                </Link>
                <Link variant="inline" appearance="inherit" href="/faq">
                  FAQ
                </Link>
                <Link variant="inline" appearance="inherit" href="/support">
                  Support
                </Link>
                <Link variant="inline" appearance="inherit" href="/press">
                  Press
                </Link>
                <Link variant="inline" appearance="inherit" href="/partners">
                  Partners
                </Link>
                <Link variant="inline" appearance="inherit" href="/investors">
                  Investors
                </Link>
                <Link variant="inline" appearance="inherit" href="/events">
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
          <Link variant="inline" appearance="inherit" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link variant="inline" appearance="inherit" href="/cookies">
            Cookies
          </Link>
          <Link variant="inline" appearance="inherit" href="/accessibility">
            Accessibility
          </Link>
          <Link variant="inline" appearance="inherit" href="/terms-of-use">
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
      expect(footerElement).toHaveAttribute('aria-label', 'footer');
      expect(footerElement).toHaveAttribute('data-testid', 'footer');
    });
  },
};
