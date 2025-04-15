import { Button } from '../button/button.js';
import { Link } from '../link/link.js';
import { cleanup, renderComponent } from '../test-utilities.js';
import {
  ChildrenDefault,
  ChildrenAccepted,
  ChildrenRejected,
} from './cookie-banner.content.js';
import { CookieBanner, CookieBannerProps } from './cookie-banner.js';

const standardProps: CookieBannerProps = {
  showConsent: true,
  children: ChildrenDefault,
  accept: <Button>Accept cookies</Button>,
  reject: <Button>Reject cookies</Button>,
  cookieLink: <Link href="#">See Cookies</Link>,
};

describe('cookieBanner', () => {
  afterEach(cleanup);

  const renderCookieBanner = (props: CookieBannerProps) =>
    renderComponent(<CookieBanner {...props} />);

  it('should pass axe accessibility tests', async () => {
    const screen = renderCookieBanner(standardProps);

    await screen.axe();
  });
});
