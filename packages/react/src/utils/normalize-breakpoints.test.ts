import { normalizeLegacyBreakpoints } from './normalize-breakpoints.js';

describe('normalizeLegacyBreakpoints', () => {
  it('passes through a string value unchanged', () => {
    expect(normalizeLegacyBreakpoints('row')).toBe('row');
  });

  it('renames base to xs', () => {
    expect(normalizeLegacyBreakpoints({ base: 'column', md: 'row' })).toEqual({
      xs: 'column',
      md: 'row',
    });
  });

  it('keeps xs and strips base when both are present', () => {
    expect(
      normalizeLegacyBreakpoints({ base: 'column', xs: 'row', md: 'row' }),
    ).toEqual({
      xs: 'row',
      md: 'row',
    });
  });

  it('passes through an object without base unchanged', () => {
    expect(normalizeLegacyBreakpoints({ xs: 2, md: 4 })).toEqual({
      xs: 2,
      md: 4,
    });
  });

  it('preserves all other breakpoint keys when renaming base', () => {
    expect(
      normalizeLegacyBreakpoints({
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        '2xl': 6,
      }),
    ).toEqual({
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      '2xl': 6,
    });
  });
});
