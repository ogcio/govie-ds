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
      size: SizeEnum.EXTRA_LARGE,
      dataTestid: 'govie-section-break',
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-section-break-xl')).toBe(true);
  });

  it('should have correct text size classes for "lg"', () => {
    const screen = renderSectionBreak({
      size: SizeEnum.LARGE,
      dataTestid: 'govie-section-break',
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-section-break-lg')).toBe(true);
  });

  it('should have correct text size classes for "md"', () => {
    const screen = renderSectionBreak({
      size: SizeEnum.MEDIUM,
      dataTestid: 'govie-section-break',
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-section-break-md')).toBe(true);
  });

  it('should have correct text size classes for "sm"', () => {
    const screen = renderSectionBreak({
      size: SizeEnum.SMALL,
      dataTestid: 'govie-section-break',
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-section-break-sm')).toBe(true);
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderSectionBreak({
      size: SizeEnum.MEDIUM,
    });

    await screen.axe();
  });
});
