import { Footer as GovieFooter } from '@govie-react/ds';

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
  return <GovieFooter links={footerLinks}></GovieFooter>;
}
