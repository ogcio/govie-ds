import { z } from 'zod';

export function createTokenSchema({
  type,
  valueSchema,
  name,
  optional = false,
}: {
  type: string;
  valueSchema: z.ZodSchema;
  name: string;
  optional?: boolean;
}) {
  const baseSchema = z
    .object(
      {
        $type: z.literal(type, {
          errorMap: () => ({
            message: `Invalid literal value, expected "${type}".`,
          }),
        }),
        $value: valueSchema,
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();

  return optional ? baseSchema.optional() : baseSchema;
}

export function createStringSchema(name: string) {
  return z.string({
    required_error: `${name} is required.`,
  });
}

export function createStringArraySchema(name: string) {
  return z
    .array(
      z.string({
        required_error: `${name} is required.`,
      }),
    )
    .nonempty();
}

export function createColorHexSchema() {
  return z
    .string({
      required_error: 'color is required.',
    })
    .regex(/^#[\da-f]{6,8}$/, 'Color must be a full lowercase hex value.');
}

export function createPixelSchema(name: string) {
  return z
    .string({
      required_error: `${name} is required.`,
    })
    .regex(/^(-?\d+px|0)$/, `${name} must be a dimension in pixels.`);
}

export function createRemSchema(name: string) {
  return z
    .string({
      required_error: `${name} is required.`,
    })
    .regex(/^(-?\d+(\.\d+)?rem)$/, `${name} must be a dimension in rems.`);
}

export function createIntegerSchema(name: string) {
  return z
    .number({
      required_error: `${name} is required.`,
    })
    .int();
}

export function createNumberSchema(name: string) {
  return z
    .number({
      required_error: `${name} is required.`,
    })
    .nonnegative();
}

export function createShadowValueSchema(name: string) {
  return z
    .object(
      {
        offsetX: createPixelSchema('Offset X'),
        offsetY: createPixelSchema('Offset Y'),
        blur: createPixelSchema('Blur'),
        spread: createPixelSchema('Spread'),
        color: createColorHexSchema(),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}

export function createAliasSchema(name: string) {
  return z
    .string({
      required_error: `${name} is required.`,
    })
    .regex(/{[\w-]+(?:\.[\w-]+)*}/, `${name} must be a valid alias.`);
}

export function createColorSchema(name: string, onlyAlias: boolean = false) {
  return createTokenSchema({
    type: 'color',
    valueSchema: onlyAlias ? createAliasSchema(name) : createColorHexSchema(),
    name,
  });
}

export function createColorSwatchSetSchema(name: string, onlyAlias?: boolean) {
  return z
    .object(
      {
        '50': createColorSchema('50', onlyAlias),
        '100': createColorSchema('100', onlyAlias),
        '200': createColorSchema('200', onlyAlias),
        '300': createColorSchema('300', onlyAlias),
        '400': createColorSchema('400', onlyAlias),
        '500': createColorSchema('500', onlyAlias),
        '600': createColorSchema('600', onlyAlias),
        '700': createColorSchema('700', onlyAlias),
        '800': createColorSchema('800', onlyAlias),
        '900': createColorSchema('900', onlyAlias),
        '950': createColorSchema('950', onlyAlias),
      },
      {
        required_error: `${name} is required.`,
      },
    )
    .strict();
}
