import { z } from "zod";
import { createPixelSchema, createTokenSchema } from "./shared.js";

function createBreakpointSchema(name: string) {
  return createTokenSchema({
    type: "dimension",
    valueSchema: createPixelSchema("Breakpoint"),
    name,
  });
}

export const breakpointSchema = z
  .object({
    xs: createBreakpointSchema("xs"),
    sm: createBreakpointSchema("sm"),
    md: createBreakpointSchema("md"),
    lg: createBreakpointSchema("lg"),
    xl: createBreakpointSchema("xl"),
    "2xl": createBreakpointSchema("2xl"),
  })
  .strict();
