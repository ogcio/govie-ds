import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import Stack from '@/atoms/Stack.js';
import { Footer as FooterLegacy } from './footer';
import Footer from '@/atoms/Footer';
import FooterSection from '@/atoms/FooterSection';
import FooterLogo from '@/atoms/FooterLogo';
import Link from '@/Link';
import Divider from '@/Divider';
import Text from '@/atoms/Text';
import Grid from '@/atoms/Grid';
import XIcon from '@/atoms/icons/socials/X';
import FacebookIcon from '@/atoms/icons/socials/Facebook';
import BlueskyIcon from '@/atoms/icons/socials/Bluesky';
import LinkedinIcon from '@/atoms/icons/socials/Linkedin';
import LogoGoldGreen from '@/atoms/icons/logos/LogoGoldGreen';
import H4 from '@/atoms/heading/H4';
import Container from '@/atoms/Container';
import { generateSvgPlaceholderDataUrl } from '@/utils/placeholder';

const meta: Meta<typeof FooterLegacy> = {
  component: FooterLegacy,
  title: 'layout/Footer/Footer (Legacy)',
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
      description: 'Utility stot - typically copyright, privacy policy, accessibility, etc.',
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
  parameters: {
    docs: {
      description: {
        component:
          'Legacy Footer component, with slot-like component placement for primary & utility sections, alongside the logo. See the new [Composable Footer](/docs/layout-footer-footer--docs) for better flexibility and support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FooterLegacy>;

export const CompleteFooter: Story = {
  args: {
    dataTestid: 'gi-footer',
    primarySlot: (
      <div className="gi-grid-responsive !gi-ml-0 !gi-mr-0" data-testid="primary">
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <h3 className="gi-heading-sm gi-mb-4">Services</h3>
          <Divider className="gi-my-4" />
          <ul className="gi-space-y-2">
            <li>
              <Link variant="inline" appearance="inherit" href="/services/public-services" ariaLabel="Public Services">
                Public Services
              </Link>
            </li>
            <li>
              <Link
                variant="inline"
                appearance="inherit"
                href="/services/business-services"
                ariaLabel="Business Services"
              >
                Business Services
              </Link>
            </li>
            <li>
              <Link variant="inline" appearance="inherit" href="/services/online-services" ariaLabel="Online Services">
                Online Services
              </Link>
            </li>
          </ul>
        </div>
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <h3 className="gi-heading-sm gi-mb-4">Departments</h3>
          <Divider className="gi-my-4" />
          <ul className="gi-space-y-2">
            <li>
              <Link variant="inline" appearance="inherit" href="/departments/health" ariaLabel="Department of Health">
                Department of Health
              </Link>
            </li>
            <li>
              <Link
                variant="inline"
                appearance="inherit"
                href="/departments/education"
                ariaLabel="Department of Education"
              >
                Department of Education
              </Link>
            </li>
            <li>
              <Link variant="inline" appearance="inherit" href="/departments/finance" ariaLabel="Department of Finance">
                Department of Finance
              </Link>
            </li>
          </ul>
        </div>
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <h3 className="gi-heading-sm gi-mb-4">Publications</h3>
          <Divider className="gi-my-4" />
          <ul className="gi-space-y-2">
            <li>
              <Link variant="inline" appearance="inherit" href="/publications/reports" ariaLabel="Reports">
                Reports
              </Link>
            </li>
            <li>
              <Link variant="inline" appearance="inherit" href="/publications/statistics" ariaLabel="Statistics">
                Statistics
              </Link>
            </li>
            <li>
              <Link variant="inline" appearance="inherit" href="/publications/legislation" ariaLabel="Legislation">
                Legislation
              </Link>
            </li>
          </ul>
        </div>
        <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
          <h3 className="gi-heading-sm gi-mb-4">Contact</h3>
          <Divider className="gi-my-4" />
          <ul className="gi-space-y-2">
            <li>
              <Link variant="inline" appearance="inherit" href="/contact/find-an-office" ariaLabel="Find an Office">
                Find an Office
              </Link>
            </li>
            <li>
              <Link variant="inline" appearance="inherit" href="/contact/phone-directory" ariaLabel="Phone Directory">
                Phone Directory
              </Link>
            </li>
            <li>
              <Link variant="inline" appearance="inherit" href="/contact/feedback" ariaLabel="Feedback">
                Feedback
              </Link>
            </li>
          </ul>
        </div>
      </div>
    ),
    secondarySlot: (
      <Stack direction={'column'} gap={4} role="region" dataTestId="secondary">
        <Stack ariaLabel="Footer Secondary Links" direction={{ base: 'column', md: 'row' }} gap={4} wrap>
          <Link variant="inline" appearance="inherit" href="/about-us" ariaLabel="About Us">
            About Us
          </Link>
          <Link variant="inline" appearance="inherit" href="/contact" ariaLabel="Contact">
            Contact
          </Link>
          <Link variant="inline" appearance="inherit" href="/sitemap" ariaLabel="Sitemap">
            Sitemap
          </Link>
          <Link variant="inline" appearance="inherit" href="/privacy-policy" ariaLabel="Privacy Policy">
            Privacy Policy
          </Link>
          <Link variant="inline" appearance="inherit" href="/terms-of-service" ariaLabel="Terms of Service">
            Terms of Service
          </Link>
          <Link variant="inline" appearance="inherit" href="/careers" ariaLabel="Careers">
            Careers
          </Link>
          <Link variant="inline" appearance="inherit" href="/blog" ariaLabel="Blog">
            Blog
          </Link>
          <Link variant="inline" appearance="inherit" href="/faq" ariaLabel="FAQ">
            FAQ
          </Link>
          <Link variant="inline" appearance="inherit" href="/support" ariaLabel="Support">
            Support
          </Link>
          <Link variant="inline" appearance="inherit" href="/press" ariaLabel="Press">
            Press
          </Link>
          <Link variant="inline" appearance="inherit" href="/partners" ariaLabel="Partners">
            Partners
          </Link>
          <Link variant="inline" appearance="inherit" href="/investors" ariaLabel="Investors">
            Investors
          </Link>
          <Link variant="inline" appearance="inherit" href="/events" ariaLabel="Events">
            Events
          </Link>
        </Stack>
        <Stack direction={'row'} gap={4} ariaLabel="Social Media Links" role="navigation">
          <XIcon label="social_x" />
          <FacebookIcon label="social_facebook" />
          <BlueskyIcon label="social_bluesky" />
          <LinkedinIcon label="social_linkedin" />
        </Stack>
      </Stack>
    ),
    utilitySlot: (
      <Stack direction={{ base: 'column', md: 'row' }} gap={4} justify="center" align="center" dataTestId="utility">
        <Link variant="inline" appearance="inherit" href="/privacy-policy" ariaLabel="Privacy Policy">
          Privacy Policy
        </Link>
        <Link variant="inline" appearance="inherit" href="/cookies" ariaLabel="Cookies">
          Cookies
        </Link>
        <Link variant="inline" appearance="inherit" href="/accessibility" ariaLabel="Accessibility">
          Accessibility
        </Link>
        <Link variant="inline" appearance="inherit" href="/terms-of-use" ariaLabel="Terms of Use">
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
      expect(footerElement).toHaveAttribute('ariaLabel', 'Footer');
      expect(footerElement).toHaveAttribute('data-testid', 'gi-footer');
    });

    await step('should not render primary nav when primarySlot is not provided', async () => {
      const navigationElement = canvas.queryByLabelText('Primary footer navigation');
      expect(navigationElement).not.toBeInTheDocument();
    });

    await step('should not render secondary nav when secondarySlot is not provided', async () => {
      const navigationElement = canvas.queryByLabelText('Secondary footer navigation');
      expect(navigationElement).not.toBeInTheDocument();
    });

    await step('should render secondary slot when provided', async () => {
      const element = canvas.getByTestId('gi-footer');
      expect(element).toBeInTheDocument();
    });

    await step('should render all slots when provided', async () => {
      expect(canvas.getByTestId('primary')).toBeInTheDocument();
      expect(canvas.getByTestId('secondary')).toBeInTheDocument();
      expect(canvas.getByTestId('utility')).toBeInTheDocument();
    });
  },
};

export const MigrationComparison: Story = {
  tags: ['skip-playwright'],
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'landmark-no-duplicate-contentinfo', enabled: false }],
      },
    },
    docs: {
      description: {
        story:
          'This story renders the same complete footer twice: the legacy slot-based Footer on top, and the new composable Footer below. The legacy API passes content through primarySlot, secondarySlot, and utilitySlot props, while the composable API builds the equivalent layout from FooterSection and FooterLogo.<br/> Secondary links, social icons, and the Gov.ie logo move from secondarySlot (with the built-in logo renderer) into the primary FooterSection, paired with an explicit FooterLogo child. The utility bar maps directly from utilitySlot to a separate FooterSection with variant="utility". Both versions are intended to look the same.',
      },
    },
  },
  render: function Render() {
    return (
      <Stack gap={2}>
        <FooterLegacy
          primarySlot={
            <div className="gi-grid-responsive !gi-ml-0 !gi-mr-0" data-testid="primary">
              <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
                <h3 className="gi-heading-sm gi-mb-4">Services</h3>
                <Divider className="gi-my-4" />
                <ul className="gi-space-y-2">
                  <li>
                    <Link
                      variant="inline"
                      appearance="inherit"
                      href="/services/public-services"
                      ariaLabel="Public Services"
                    >
                      Public Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      variant="inline"
                      appearance="inherit"
                      href="/services/business-services"
                      ariaLabel="Business Services"
                    >
                      Business Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      variant="inline"
                      appearance="inherit"
                      href="/services/online-services"
                      ariaLabel="Online Services"
                    >
                      Online Services
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
                <h3 className="gi-heading-sm gi-mb-4">Departments</h3>
                <Divider className="gi-my-4" />
                <ul className="gi-space-y-2">
                  <li>
                    <Link
                      variant="inline"
                      appearance="inherit"
                      href="/departments/health"
                      ariaLabel="Department of Health"
                    >
                      Department of Health
                    </Link>
                  </li>
                  <li>
                    <Link
                      variant="inline"
                      appearance="inherit"
                      href="/departments/education"
                      ariaLabel="Department of Education"
                    >
                      Department of Education
                    </Link>
                  </li>
                  <li>
                    <Link
                      variant="inline"
                      appearance="inherit"
                      href="/departments/finance"
                      ariaLabel="Department of Finance"
                    >
                      Department of Finance
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
                <h3 className="gi-heading-sm gi-mb-4">Publications</h3>
                <Divider className="gi-my-4" />
                <ul className="gi-space-y-2">
                  <li>
                    <Link variant="inline" appearance="inherit" href="/publications/reports" ariaLabel="Reports">
                      Reports
                    </Link>
                  </li>
                  <li>
                    <Link variant="inline" appearance="inherit" href="/publications/statistics" ariaLabel="Statistics">
                      Statistics
                    </Link>
                  </li>
                  <li>
                    <Link
                      variant="inline"
                      appearance="inherit"
                      href="/publications/legislation"
                      ariaLabel="Legislation"
                    >
                      Legislation
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="gi-col-span-4 md:gi-col-span-4 lg:gi-col-span-3">
                <h3 className="gi-heading-sm gi-mb-4">Contact</h3>
                <Divider className="gi-my-4" />
                <ul className="gi-space-y-2">
                  <li>
                    <Link
                      variant="inline"
                      appearance="inherit"
                      href="/contact/find-an-office"
                      ariaLabel="Find an Office"
                    >
                      Find an Office
                    </Link>
                  </li>
                  <li>
                    <Link
                      variant="inline"
                      appearance="inherit"
                      href="/contact/phone-directory"
                      ariaLabel="Phone Directory"
                    >
                      Phone Directory
                    </Link>
                  </li>
                  <li>
                    <Link variant="inline" appearance="inherit" href="/contact/feedback" ariaLabel="Feedback">
                      Feedback
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          }
          secondarySlot={
            <Stack direction={'column'} gap={4} role="region" dataTestId="secondary">
              <Stack ariaLabel="Footer Secondary Links" direction={{ base: 'column', md: 'row' }} gap={4} wrap>
                <Link variant="inline" appearance="inherit" href="/about-us" ariaLabel="About Us">
                  About Us
                </Link>
                <Link variant="inline" appearance="inherit" href="/contact" ariaLabel="Contact">
                  Contact
                </Link>
                <Link variant="inline" appearance="inherit" href="/sitemap" ariaLabel="Sitemap">
                  Sitemap
                </Link>
                <Link variant="inline" appearance="inherit" href="/privacy-policy" ariaLabel="Privacy Policy">
                  Privacy Policy
                </Link>
                <Link variant="inline" appearance="inherit" href="/terms-of-service" ariaLabel="Terms of Service">
                  Terms of Service
                </Link>
                <Link variant="inline" appearance="inherit" href="/careers" ariaLabel="Careers">
                  Careers
                </Link>
                <Link variant="inline" appearance="inherit" href="/blog" ariaLabel="Blog">
                  Blog
                </Link>
                <Link variant="inline" appearance="inherit" href="/faq" ariaLabel="FAQ">
                  FAQ
                </Link>
                <Link variant="inline" appearance="inherit" href="/support" ariaLabel="Support">
                  Support
                </Link>
                <Link variant="inline" appearance="inherit" href="/press" ariaLabel="Press">
                  Press
                </Link>
                <Link variant="inline" appearance="inherit" href="/partners" ariaLabel="Partners">
                  Partners
                </Link>
                <Link variant="inline" appearance="inherit" href="/investors" ariaLabel="Investors">
                  Investors
                </Link>
                <Link variant="inline" appearance="inherit" href="/events" ariaLabel="Events">
                  Events
                </Link>
              </Stack>
              <Stack direction={'row'} gap={4} ariaLabel="Social Media Links" role="navigation">
                <XIcon label="social_x" />
                <FacebookIcon label="social_facebook" />
                <BlueskyIcon label="social_bluesky" />
                <LinkedinIcon label="social_linkedin" />
              </Stack>
            </Stack>
          }
          utilitySlot={
            <Stack
              direction={{ base: 'column', md: 'row' }}
              gap={4}
              justify="center"
              align="center"
              dataTestId="utility"
            >
              <Link variant="inline" appearance="inherit" href="/privacy-policy" ariaLabel="Privacy Policy">
                Privacy Policy
              </Link>
              <Link variant="inline" appearance="inherit" href="/cookies" ariaLabel="Cookies">
                Cookies
              </Link>
              <Link variant="inline" appearance="inherit" href="/accessibility" ariaLabel="Accessibility">
                Accessibility
              </Link>
              <Link variant="inline" appearance="inherit" href="/terms-of-use" ariaLabel="Terms of Use">
                Terms of Use
              </Link>
              <div className="gi-text-sm">© 2025 Government of Ireland.</div>
            </Stack>
          }
        />
        <Footer>
          <FooterSection variant={'primary'} dataTestId="footer-section-primary">
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

          <FooterSection variant={'utility'} dataTestId="footer-section-utility">
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
              <Text className="gi-text-sm">© 2025 Government of Ireland.</Text>
            </Stack>
          </FooterSection>
        </Footer>
      </Stack>
    );
  },
};

export const SimpleFooter: Story = {
  args: {
    secondarySlot: (
      <Stack direction={{ base: 'column', md: 'row' }} gap={4} wrap ariaLabel="Footer Secondary Links">
        <Link variant="inline" appearance="inherit" href="/about-us" ariaLabel="About Us">
          About Us
        </Link>
        <Link variant="inline" appearance="inherit" href="/contact" ariaLabel="Contact">
          Contact
        </Link>
        <Link variant="inline" appearance="inherit" href="/sitemap" ariaLabel="Sitemap">
          Sitemap
        </Link>
        <Link variant="inline" appearance="inherit" href="/privacy-policy" ariaLabel="Privacy Policy">
          Privacy Policy
        </Link>
        <Link variant="inline" appearance="inherit" href="/terms-of-service" ariaLabel="Terms of Service">
          Terms of Service
        </Link>
        <Link variant="inline" appearance="inherit" href="/careers" ariaLabel="Careers">
          Careers
        </Link>
        <Link variant="inline" appearance="inherit" href="/blog" ariaLabel="Blog">
          Blog
        </Link>
        <Link variant="inline" appearance="inherit" href="/faq" ariaLabel="FAQ">
          FAQ
        </Link>
        <Link variant="inline" appearance="inherit" href="/support" ariaLabel="Support">
          Support
        </Link>
        <Link variant="inline" appearance="inherit" href="/press" ariaLabel="Press">
          Press
        </Link>
        <Link variant="inline" appearance="inherit" href="/partners" ariaLabel="Partners">
          Partners
        </Link>
        <Link variant="inline" appearance="inherit" href="/investors" ariaLabel="Investors">
          Investors
        </Link>
        <Link variant="inline" appearance="inherit" href="/events" ariaLabel="Events">
          Events
        </Link>
      </Stack>
    ),
    utilitySlot: (
      <Stack direction={{ base: 'column', md: 'row' }} gap={4} justify="center">
        <Link variant="inline" appearance="inherit" href="/privacy-policy" ariaLabel="Privacy Policy">
          Privacy Policy
        </Link>
        <Link variant="inline" appearance="inherit" href="/accessibility" ariaLabel="Accessibility">
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
      <Stack direction={{ base: 'column', md: 'row' }} gap={4} justify="center">
        <Link variant="inline" appearance="inherit" href="/privacy-policy" ariaLabel="Privacy Policy">
          Privacy Policy
        </Link>
        <Link variant="inline" appearance="inherit" href="/accessibility" ariaLabel="Accessibility">
          Accessibility
        </Link>
        <div className="gi-text-sm">© 2025 Government of Ireland.</div>
      </Stack>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should render the default logo with default width and height', async () => {
      const img = canvas.getByAltText('Gov.ie Logo');
      expect(img).toHaveAttribute('width', '181');
      expect(img).toHaveAttribute('height', '64');
    });
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
    await step('should not render utility section when utilitySlot is not provided', async () => {
      const utilitySectionElement = canvas.queryByLabelText('Utility links');
      expect(utilitySectionElement).not.toBeInTheDocument();
    });
  },
};

export const CustomLogo: Story = {
  args: {
    logo: {
      width: 220,
      height: 80,
      imageLarge: generateSvgPlaceholderDataUrl(220, 80),
    },
    primarySlot: <div>Primary</div>,
    secondarySlot: <div>This footer uses a custom logo image.</div>,
    utilitySlot: <div>Utility</div>,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should propagate custom logo dimensions to the img', async () => {
      const img = canvas.getByAltText('Gov.ie Logo');
      expect(img).toHaveAttribute('width', '220');
      expect(img).toHaveAttribute('height', '80');
    });
  },
};
