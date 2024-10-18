import { render } from '../common/render';
import { childrenDefault, childrenAccepted, childrenRejected } from './cookie-banner.content';
import html from './cookie-banner.html?raw';
import { CookieBannerProps } from './cookie-banner.schema';

const standardProps = {
    children: childrenDefault,
    accept: {
        children: childrenAccepted,
        triggerButton: {
            content: 'Accept cookies'
        }
    },
    reject: {
        children: childrenRejected,
        triggerButton: {
            content: "Reject cookies"
        }
    },
    dismissButton: {
        content: "Hide this message"
    },
    cookieLink: {
        href: '#',
        label: 'See Cookies'
    }
}

describe('cookieBanner', () => {
    const renderCookieBanner = render<CookieBannerProps>({
        componentName: 'cookie-banner',
        macroName: 'govieCookieBanner',
        html
    })

    it('should render the default state', () => {
        const screen = renderCookieBanner(standardProps);
        const defaultScreen = screen.getByTestId('default-container');
        const acceptedScreen = screen.getByTestId('accepted-container');
        const rejectedScreen = screen.getByTestId('rejected-container');

        expect(defaultScreen).toBeVisible();
        expect(acceptedScreen).not.toBeVisible();
        expect(rejectedScreen).not.toBeVisible();
    })
    it('should render the accepted state', () => {
        const screen = renderCookieBanner(standardProps);
        const defaultScreen = screen.getByTestId('default-container');
        const acceptedScreen = screen.getByTestId('accepted-container');
        const rejectedScreen = screen.getByTestId('rejected-container');
        const acceptButton = screen.getByTestId('accept-btn');

        acceptButton.click()

        expect(defaultScreen).not.toBeVisible();
        expect(acceptedScreen).toBeVisible();
        expect(rejectedScreen).not.toBeVisible();

    })
    it('should render the rejected state', () => {
        const screen = renderCookieBanner(standardProps);
        const defaultScreen = screen.getByTestId('default-container');
        const acceptedScreen = screen.getByTestId('accepted-container');
        const rejectedScreen = screen.getByTestId('rejected-container');
        const rejectButton = screen.getByTestId('reject-btn');

        rejectButton.click()

        expect(defaultScreen).not.toBeVisible();
        expect(acceptedScreen).not.toBeVisible();
        expect(rejectedScreen).toBeVisible();
    })

    it('should dismiss the cookie banner on accept screen', () => {
        const screen = renderCookieBanner(standardProps);
        const defaultScreen = screen.getByTestId('default-container');
        const acceptedScreen = screen.getByTestId('accepted-container');
        const rejectedScreen = screen.getByTestId('rejected-container');
        const acceptButton = screen.getByTestId('accept-btn');
        const dismissButton = screen.getByTestId('dismiss-btn-accepted');

        acceptButton.click()
        dismissButton.click()

        expect(defaultScreen).not.toBeVisible();
        expect(acceptedScreen).not.toBeVisible();
        expect(rejectedScreen).not.toBeVisible();
    })

    it('should dismiss the cookie banner on reject screen', () => {
        const screen = renderCookieBanner(standardProps);
        const defaultScreen = screen.getByTestId('default-container');
        const acceptedScreen = screen.getByTestId('accepted-container');
        const rejectedScreen = screen.getByTestId('rejected-container');
        const rejectButton = screen.getByTestId('reject-btn');
        const dismissButton = screen.getByTestId('dismiss-btn-rejected');

        rejectButton.click()
        dismissButton.click()

        expect(defaultScreen).not.toBeVisible();
        expect(acceptedScreen).not.toBeVisible();
        expect(rejectedScreen).not.toBeVisible();
    })

    it('should pass axe accessibility tests', async () => {
        const screen = renderCookieBanner(standardProps);
    
        await screen.axe();
      });
})