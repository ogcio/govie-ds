import { Container, Link } from '@govie-react/ds';
import Image from 'next/image';
import styles from './footer.module.css';
import footerImage from './logo.png';
import { OglLogo } from './ogl-logo';

// INFO: This Footer component along with its styles is a temporary solution until we implement the Footer component from @govie-react/ds. The styles will also become redundant after we utilise the external Footer component
// TODO: Replace this Footer component with the Footer component from @govie-react/ds
// TODO: Create releveant pages related to the footer section in mdx ( content folder ) after getting more info from Content/Tamara
// TODO: Replace de MockLinks and MockLinkLong consts with relevant data

const MockLinks = [
  {
    label: 'Help',
    href: 'https://ogcio.github.io/ogcio-ds-website/help/',
  },
  {
    label: 'Privacy Policy',
    href: 'https://ogcio.github.io/ogcio-ds-website/privacy-policy/',
  },
  {
    label: 'Cookies Policy',
    href: 'https://ogcio.github.io/ogcio-ds-website/cookies-policy/',
  },
  {
    label: 'Accessibility statement',
    href: 'https://ogcio.github.io/ogcio-ds-website/accessibility/',
  },
  {
    label: 'Contact',
    href: 'https://ogcio.github.io/ogcio-ds-website/contact/',
  },
  {
    label: 'Government digital service',
    href: 'https://ogcio.github.io/ogcio-ds-website/government-digital-service/',
  },
];

const MockLinkLong = {
  label:
    'All content is available under the Open Government Licence v3.0, except where otherwise stated',
  href: 'https://ogcio.github.io/ogcio-ds-website/government-digital-service/#',
};

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerInner}>
          <div className={styles.footerLinksContainer}>
            <ul className={styles.footerLinkList}>
              {MockLinks.map((link, id) => (
                <li key={id}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className={styles.footerLogoContainer}>
              {OglLogo()}
              <Link href={MockLinkLong.href}>{MockLinkLong.label}</Link>
            </div>
          </div>

          <Image
            src={footerImage}
            alt="GOV IE"
            width={190}
            style={{ height: 'auto' }}
          />
        </div>
      </Container>
    </footer>
  );
}
