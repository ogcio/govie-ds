import { z } from "zod";
import { createPixelSchema, createTokenSchema } from "./shared.js";

function createBorderWidthSchema(name: string) {
  return createTokenSchema({
    type: "dimension",
    valueSchema: createPixelSchema("Border width"),
    name,
  });
}

const borderWidthSchema = z
  .object({
    "100": createBorderWidthSchema("100"),
    "200": createBorderWidthSchema("200"),
    "300": createBorderWidthSchema("300"),
    "400": createBorderWidthSchema("400"),
    "500": createBorderWidthSchema("500"),
    "600": createBorderWidthSchema("600"),
    "700": createBorderWidthSchema("700"),
    "800": createBorderWidthSchema("800"),
  })
  .strict();

function createBorderRadiusSchema(name: string) {
  return createTokenSchema({
    type: "dimension",
    valueSchema: createPixelSchema("Border radius"),
    name,
  });
}

const borderRadiusSchema = z
  .object({
    "100": createBorderRadiusSchema("100"),
    "200": createBorderRadiusSchema("200"),
    "300": createBorderRadiusSchema("300"),
    "400": createBorderRadiusSchema("400"),
    "500": createBorderRadiusSchema("500"),
    "600": createBorderRadiusSchema("600"),
    full: createBorderRadiusSchema("full"),
  })
  .strict();

export const borderSchema = z
  .object(
    {
      width: borderWidthSchema,
      radius: borderRadiusSchema,
    },
    {
      required_error: "Border is required.",
    }
  )
  .strict();
