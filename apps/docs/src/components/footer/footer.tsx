import { Container, Link } from '@govie-react/ds';
import Image from 'next/image';
import styles from './footer.module.css';
import footerImage from './logo.png';

// INFO: This Footer component along with its styles is a temporary solution until we implement the Footer component from @govie-react/ds. The styles will also become redundant after we utilise the external Footer component
// TODO: Replace this Footer component with the Footer component from @govie-react/ds
// TODO: Review the content of each page from FooterLinks and update accordingly

const footerLinks = [
  {
    label: 'Help',
    href: '/help/',
  },
  {
    label: 'Privacy Policy',
    href: '/privacy-policy/',
  },
  {
    label: 'Cookies Policy',
    href: '/cookies-policy/',
  },
  {
    label: 'Accessibility statement',
    href: '/accessibility-statement/',
  },
  {
    label: 'Contact',
    href: '/contact/',
  },
  {
    label: 'Government digital service',
    href: '/government-digital-service/',
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerInner}>
          <div className={styles.footerLinksContainer}>
            <ul className={styles.footerLinkList}>
              {footerLinks.map((link, id) => (
                <li key={id}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
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
