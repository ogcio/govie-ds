import { Button } from '../button/button.js';
import { Link } from '../link/link.js';
import { cleanup, render } from '../test-utils.js';
import {
  ChildrenDefault,
  ChildrenAccepted,
  ChildrenRejected,
} from './cookie-banner.content.js';
import { CookieBanner, CookieBannerProps } from './cookie-banner.js';

const standardProps: CookieBannerProps = {
  children: ChildrenDefault,
  accept: {
    children: ChildrenAccepted,
    triggerButton: <Button>Accept cookies</Button>,
  },
  reject: {
    children: ChildrenRejected,
    triggerButton: <Button>Reject cookies</Button>,
  },
  dismissButton: <Button>'Hide this message'</Button>,
  cookieLink: <Link href="#">See Cookies</Link>,
};

describe('cookieBanner', () => {
  afterEach(cleanup);

  const renderCookieBanner = (props: CookieBannerProps) =>
    render(<CookieBanner {...props} />);

  it('should pass axe accessibility tests', async () => {
    const screen = renderCookieBanner(standardProps);

    await screen.axe();
  });
});
