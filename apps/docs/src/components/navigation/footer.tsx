import {
  Footer,
  FooterSection,
  FooterLogo,
  Link,
} from '@ogcio/design-system-react/next';
import {
  Grid,
  Container,
  Heading,
  Divider,
  Stack,
  Text,
} from '@ogcio/design-system-react';
import {
  BlueskyIcon,
  FacebookIcon,
  XIcon,
  LinkedinIcon,
} from '@ogcio/design-system-react/icons';
import { LogoGoldGreen } from '@ogcio/design-system-react/logos';

/**
 * Template content for the Footer component for reuse across the Footer docs
 */
const FooterTemplate = () => (
  <Footer>
    <FooterSection>
      <Container className="gi-text-gray-800">
        <FooterPrimaryContent />
        <Divider className="gi-my-8" />
        <FooterSecondaryContent />
      </Container>
    </FooterSection>
    <FooterSection variant="utility">
      <FooterUtilityContent />
    </FooterSection>
  </Footer>
);

const FooterPrimaryContent = () => (
  <Grid container columns={{ base: 4, md: 8, lg: 12 }} gap={4}>
    <Grid size={{ base: 4, md: 4, lg: 3 }}>
      <Heading as={'h4'} className="gi-my-4">
        Services
      </Heading>
      <Divider className="gi-my-4" />
      <Stack gap={2}>
        {['Public Services', 'Business Services', 'Online Services'].map(
          (link) => (
            <Link key={link} variant="inline" appearance="inherit" href="#">
              {link}
            </Link>
          ),
        )}
      </Stack>
    </Grid>
    <Grid size={{ base: 4, md: 4, lg: 3 }}>
      <Heading as={'h4'} className="gi-my-4">
        Departments
      </Heading>
      <Divider className="gi-my-4" />
      <Stack gap={2}>
        {[
          'Department of Health',
          'Department of Education',
          'Department of Finance',
        ].map((link) => (
          <Link key={link} variant="inline" appearance="inherit" href="#">
            {link}
          </Link>
        ))}
      </Stack>
    </Grid>
    <Grid size={{ base: 4, md: 4, lg: 3 }}>
      <Heading as={'h4'} className="gi-my-4">
        Publications
      </Heading>
      <Divider className="gi-my-4" />
      <Stack gap={2}>
        {['Reports', 'Statistics', 'Legislation'].map((link) => (
          <Link key={link} variant="inline" appearance="inherit" href="#">
            {link}
          </Link>
        ))}
      </Stack>
    </Grid>
    <Grid size={{ base: 4, md: 4, lg: 3 }}>
      <Heading as={'h4'} className="gi-my-4">
        Contact
      </Heading>
      <Divider className="gi-my-4" />
      <Stack gap={2}>
        {['Find an Office', 'Phone Directory', 'Feedback'].map((link) => (
          <Link key={link} variant="inline" appearance="inherit" href="#">
            {link}
          </Link>
        ))}
      </Stack>
    </Grid>
  </Grid>
);

const FooterSecondaryContent = () => (
  <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 0, md: 6 }}>
    <Stack direction="column" gap={6}>
      <Stack direction={{ base: 'column', md: 'row' }} gap={4} wrap>
        {[
          'About Us',
          'Contact',
          'Sitemap',
          'Privacy Policy',
          'Terms of Service',
          'Careers',
          'Blog',
          'FAQ',
          'Support',
          'Press',
          'Partners',
          'Investors',
          'Events',
        ].map((link) => (
          <Link key={link} variant="inline" appearance="inherit" href="#">
            {link}
          </Link>
        ))}
      </Stack>
      <Stack direction="row" gap={4}>
        <XIcon label="social_x" />
        <FacebookIcon label="facebook" />
        <BlueskyIcon label="bluesky" />
        <LinkedinIcon label="linkedin" />
      </Stack>
    </Stack>
    <FooterLogo>
      <LogoGoldGreen size="181" label="Gov.ie Logo" />
    </FooterLogo>
  </Stack>
);

const FooterUtilityContent = () => (
  <Stack
    wrap
    direction={{ base: 'column', md: 'row' }}
    gap={4}
    justify="center"
    align="center"
  >
    {['Privacy Policy', 'Cookies', 'Accessibility', 'Terms of Use'].map(
      (link) => (
        <Link key={link} href="#" variant="inline" appearance="inherit">
          {link}
        </Link>
      ),
    )}
    <Text className="gi-text-sm">
      © 2026 Design System of Government of Ireland.
    </Text>
  </Stack>
);

export { FooterSecondaryContent, FooterUtilityContent, FooterTemplate };
