import { z } from 'zod';
import {
  createStringArraySchema,
  createTokenSchema,
  createIntegerSchema,
  createNumberSchema,
  createRemSchema,
} from '../shared.js';

function createFontFamilySchema(name: string) {
  return createTokenSchema({
    type: 'fontFamily',
    valueSchema: createStringArraySchema('fontFamily'),
    name,
  });
}

const fontFamilySchema = z
  .object({
    primary: createFontFamilySchema('primary'),
    secondary: createFontFamilySchema('secondary'),
    tertiary: createFontFamilySchema('tertiary'),
  })
  .strict();

function createFontSizeSchema(name: string) {
  return createTokenSchema({
    type: 'dimension',
    valueSchema: createRemSchema('fontSize'),
    name,
  });
}

const fontSizeSchema = z
  .object({
    '50': createFontSizeSchema('50'),
    '100': createFontSizeSchema('100'),
    '200': createFontSizeSchema('200'),
    '300': createFontSizeSchema('300'),
    '400': createFontSizeSchema('400'),
    '500': createFontSizeSchema('500'),
    '600': createFontSizeSchema('600'),
    '700': createFontSizeSchema('700'),
    '800': createFontSizeSchema('800'),
    '900': createFontSizeSchema('900'),
    '1000': createFontSizeSchema('1000'),
    '1100': createFontSizeSchema('1100'),
    '1200': createFontSizeSchema('1200'),
    '1300': createFontSizeSchema('1300'),
  })
  .strict();

function createFontWeightSchema(name: string) {
  return createTokenSchema({
    type: 'fontWeight',
    valueSchema: createIntegerSchema('fontWeight'),
    name,
  });
}

const fontWeightSchema = z
  .object({
    '100': createFontWeightSchema('100'),
    '200': createFontWeightSchema('200'),
    '300': createFontWeightSchema('300'),
    '400': createFontWeightSchema('400'),
    '500': createFontWeightSchema('500'),
    '600': createFontWeightSchema('600'),
    '700': createFontWeightSchema('700'),
    '800': createFontWeightSchema('800'),
    '900': createFontWeightSchema('900'),
  })
  .strict();

function createFontLineHeightSchema(name: string) {
  return createTokenSchema({
    type: 'number',
    valueSchema: createNumberSchema('lineHeight'),
    name,
  });
}

const fontLineHeightSchema = z
  .object({
    '50': createFontLineHeightSchema('50'),
    '100': createFontLineHeightSchema('100'),
    '200': createFontLineHeightSchema('200'),
    '300': createFontLineHeightSchema('300'),
    '400': createFontLineHeightSchema('400'),
    '500': createFontLineHeightSchema('500'),
    '600': createFontLineHeightSchema('600'),
    '700': createFontLineHeightSchema('700'),
    '800': createFontLineHeightSchema('800'),
    '900': createFontLineHeightSchema('900'),
    '1000': createFontLineHeightSchema('1000'),
    '1100': createFontLineHeightSchema('1100'),
    '1200': createFontLineHeightSchema('1200'),
    '1300': createFontLineHeightSchema('1300'),
  })
  .strict();

function createLetterSpacingSchema(name: string) {
  return createTokenSchema({
    type: 'dimension',
    valueSchema: createRemSchema('letterSpacing'),
    name,
  });
}

const letterSpacingSchema = z.object({
  '100': createLetterSpacingSchema('100'),
  '200': createLetterSpacingSchema('200'),
  '300': createLetterSpacingSchema('300'),
  '400': createLetterSpacingSchema('400'),
  '500': createLetterSpacingSchema('500'),
  '600': createLetterSpacingSchema('600'),
  '700': createLetterSpacingSchema('700'),
  '800': createLetterSpacingSchema('800'),
  '900': createLetterSpacingSchema('900'),
});

export const fontSchema = z
  .object(
    {
      family: fontFamilySchema,
      size: fontSizeSchema,
      weight: fontWeightSchema,
      lineHeight: fontLineHeightSchema,
      letterSpacing: letterSpacingSchema,
    },
    {
      required_error: 'font is required.',
    },
  )
  .strict();
