import { Container } from '../container/container.js';
import footerImage from './logo.png';

export function Footer() {
  return (
    <footer
      className={`gi-bg-gold-50 gi-p-x-xl gi-py-3xl gi-border-solid gi-border-t-xs gi-border-gold-500`}
    >
      <Container>
        <div
          className={`gi-flex gi-flex-wrap gi-gap-2xl gi-justify-center sm:gi-justify-end gi-items-center`}
        >
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
