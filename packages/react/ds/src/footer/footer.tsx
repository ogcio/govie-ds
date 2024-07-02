import { Container } from '../container/container.js';
import styles from './footer.module.css';
import footerImage from './logo.png';
// import { OglLogo } from '../logos/ogl-logo';

export function Footer() {
  return (
    //  className="bg-gold-50 p-x-xl py-3xl border-solid border-t-xs border-gold-500">
    <footer className={styles.footer}>
      <Container>
        {/* flex flex-wrap gap-2xl justify-center sm:justify-end items-center */}
        <div className={styles.footerInner}>
          {/* <div className="flex gap-x-2xl items-center">
            <OglLogo />
            <span>
              All content is available under the{' '}
              <a
                className="underline hover:decoration-4" // TODO: add to theme
                href="#"
                rel="license"
              >
                Open Government Licence v3.0
              </a>
              , except where otherwise stated.
            </span>
          </div> */}
          <img
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
