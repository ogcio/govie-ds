import { render } from '../common/render';
import html from './phase-banner.html?raw';
import { PhaseBannerProps, LevelEnum } from './phase-banner.schema';

describe('goviePhaseBanner', () => {
  const renderPhaseBanner = render<PhaseBannerProps>({
    componentName: 'phase-banner',
    macroName: 'goviePhaseBanner',
    html,
  });

  it('should render a phase-banner with alpha level', () => {
    const screen = renderPhaseBanner({
      content: 'This is a phase-banner',
      level: LevelEnum.Alpha,
    });
    const pElement = screen.getByTestId('phase-banner');
    expect(pElement).toBeTruthy();
    expect(pElement.firstElementChild?.textContent?.trim()).toBe('alpha');
  });

  it('should render a span with the correct content when props.as is "span"', () => {
    const screen = renderPhaseBanner({
      content: 'This is a span',
      level: LevelEnum.Beta,
    });
    const pElement = screen.getByTestId('phase-banner');
    expect(pElement).toBeTruthy();
    expect(pElement.firstElementChild?.textContent?.trim()).toBe('beta');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderPhaseBanner({
      content: 'Accessible phase-banner',
      level: LevelEnum.Alpha,
    });

    await screen.axe();
  });
});
