import { renderComponent, cleanup } from '../test-utilities.test.js';
import { SectionBreakProps, SectionBreak } from './section-break.js';

describe('govieSectionBreak', () => {
  afterEach(cleanup);
  const renderSectionBreak = (props: SectionBreakProps) =>
    renderComponent(<SectionBreak {...props} />);

  it('should have correct text size classes for "xl"', () => {
    const screen = renderSectionBreak({
      size: 'xl',
      dataTestid: 'govie-section-break',
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-section-break-xl')).toBe(true);
  });

  it('should have correct text size classes for "lg"', () => {
    const screen = renderSectionBreak({
      size: 'lg',
      dataTestid: 'govie-section-break',
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-section-break-lg')).toBe(true);
  });

  it('should have correct text size classes for "md"', () => {
    const screen = renderSectionBreak({
      size: 'md',
      dataTestid: 'govie-section-break',
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-section-break-md')).toBe(true);
  });

  it('should have correct text size classes for "sm"', () => {
    const screen = renderSectionBreak({
      size: 'sm',
      dataTestid: 'govie-section-break',
    });
    const pElement = screen.getByTestId('govie-section-break');
    expect(pElement.classList.contains('gi-section-break-sm')).toBe(true);
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderSectionBreak({
      size: 'md',
    });

    await screen.axe();
  });
});
