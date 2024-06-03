import { z } from "zod";

export function createTokenSchema({
  type,
  valueSchema,
  name,
}: {
  type: string;
  valueSchema: z.ZodSchema;
  name: string;
}) {
  return z
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
      }
    )
    .strict();
}

export function createStringSchema(name: string) {
  return z
    .string({
      required_error: `${name} is required.`,
    })
}

export function createStringArraySchema(name: string) {
  return z
    .array(
      z.string({
        required_error: `${name} is required.`,
      })
    )
    .nonempty();
}

export function createColorHexSchema() {
  return z
    .string({
      required_error: "Color is required.",
    })
    .regex(/^#[0-9a-f]{6,8}$/, "Color must be a full lowercase hex value.");
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
        offsetX: createPixelSchema("Offset X"),
        offsetY: createPixelSchema("Offset Y"),
        blur: createPixelSchema("Blur"),
        spread: createPixelSchema("Spread"),
        color: createColorHexSchema(),
      },
      {
        required_error: `${name} is required.`,
      }
    )
    .strict();
}
