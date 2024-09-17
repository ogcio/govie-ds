import { render } from '../common/render';
import html from './section-break.html?raw';
import { SectionBreakProps, SizeEnum } from './section-break.schema';

describe('govieSectionBreak', () => {
  const renderSectionBreak = render<SectionBreakProps>({
    componentName: 'section-break',
    macroName: 'govieSectionBreak',
    html,
  });

  it('should have correct text size classes for "xl"', () => {
    const screen = renderSectionBreak({
      size: SizeEnum.Large,
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-my-12')).toBe(true);
  });

  it('should have correct text size classes for "lg"', () => {
    const screen = renderSectionBreak({
      size: SizeEnum.Large,
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-my-8')).toBe(true);
  });

  it('should have correct text size classes for "md"', () => {
    const screen = renderSectionBreak({
      size: SizeEnum.Medium,
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-my-4')).toBe(true);
  });

  it('should have correct text size classes for "sm"', () => {
    const screen = renderSectionBreak({
      size: SizeEnum.Small,
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-m-0')).toBe(true);
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderSectionBreak({
      size: SizeEnum.Medium,
    });

    await screen.axe();
  });
});
