import { cleanup, render } from '../test-utilities.js';
import { PhaseBannerProps, PhaseBanner } from './phase-banner.js';

describe('goviePhaseBanner', () => {
  afterEach(cleanup);
  const renderPhaseBanner = (props: PhaseBannerProps) =>
    render(<PhaseBanner {...props} />);

  it('should render a phase-banner with alpha level', () => {
    const screen = renderPhaseBanner({
      children: 'This is a phase-banner',
      level: 'alpha',
    });
    const pElement = screen.getByTestId('phase-banner');
    expect(pElement).toBeTruthy();
    expect(pElement.firstElementChild?.textContent?.trim()).toBe('alpha');
  });

  it('should render a span with the correct content when props.as is "span"', () => {
    const screen = renderPhaseBanner({
      children: 'This is a span',
      level: 'beta',
    });
    const pElement = screen.getByTestId('phase-banner');
    expect(pElement).toBeTruthy();
    expect(pElement.firstElementChild?.textContent?.trim()).toBe('beta');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderPhaseBanner({
      children: 'Accessible phase-banner',
      level: 'alpha',
    });

    await screen.axe();
  });
});
