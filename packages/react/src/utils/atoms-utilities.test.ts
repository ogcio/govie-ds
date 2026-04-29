import { clamp, resolveResponsive } from '../atoms/utilities';

const Color = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
} as const;

describe('clamp', () => {
  it('returns the value when it matches an allowed option', () => {
    expect(clamp('red', Color, Color.GREEN)).toBe('red');
  });

  it('returns the default when the value is not allowed', () => {
    expect(clamp('yellow', Color, Color.GREEN)).toBe('green');
  });

  it('returns the default when value is undefined', () => {
    expect(clamp(undefined, Color, Color.BLUE)).toBe('blue');
  });

  it('returns the default for an empty string', () => {
    expect(clamp('', Color, Color.RED)).toBe('red');
  });
});

const toClass = (value: string, prefix: string): string => `${prefix}gi-flex-${value}`;

const toGap = (gap: number, prefix: string): string => `${prefix}gi-gap-${gap}`;
describe('resolveResponsive', () => {
  it('returns a single class for a plain value', () => {
    expect(resolveResponsive('row', toClass)).toBe('gi-flex-row');
  });

  it('generates breakpoint-prefixed classes from a responsive object', () => {
    expect(resolveResponsive({ base: 'col', md: 'row' }, toClass)).toBe('gi-flex-col md:gi-flex-row');
  });

  it('treats base as the unprefixed breakpoint', () => {
    expect(resolveResponsive({ base: 'col' }, toClass)).toBe('gi-flex-col');
  });

  it('maps xs to the xs: Tailwind prefix', () => {
    expect(resolveResponsive({ xs: 'col' }, toClass)).toBe('xs:gi-flex-col');
  });

  it('preserves breakpoint order regardless of object key order', () => {
    expect(resolveResponsive({ lg: 'row', base: 'col', sm: 'row' }, toClass)).toBe(
      'gi-flex-col sm:gi-flex-row lg:gi-flex-row',
    );
  });

  it('skips breakpoints not present in the responsive object', () => {
    expect(resolveResponsive({ base: 'col', xl: 'row' }, toClass)).toBe('gi-flex-col xl:gi-flex-row');
  });

  it('works with numeric values', () => {
    expect(resolveResponsive(4, toGap)).toBe('gi-gap-4');
    expect(resolveResponsive({ base: 2, md: 4, xl: 8 }, toGap)).toBe('gi-gap-2 md:gi-gap-4 xl:gi-gap-8');
  });
});
