import { TokensValidationError, validateDesignTokens } from "./schema/index.js";

describe("validateDesignTokensSchema", () => {
  it("should fail with no primitives", () => {
    try {
      validateDesignTokens({ tokens: {} });
    } catch (error) {
      const validationError = error as TokensValidationError;
      expect(validationError.errors).toContainEqual({
        message: "Primitive is required.",
        path: "primitive",
      });
    }
  });

  it("should fail with no color", () => {
    try {
      validateDesignTokens({
        tokens: {
          primitive: {},
        },
      });
    } catch (error) {
      const validationError = error as TokensValidationError;
      expect(validationError.errors).toContainEqual({
        message: "Color is required.",
        path: "primitive.color",
      });
    }
  });

  it("should fail with no color swatch set", () => {
    try {
      validateDesignTokens({
        tokens: {
          primitive: {
            color: {},
          },
        },
      });
    } catch (error) {
      const validationError = error as TokensValidationError;
      expect(validationError.errors).toContainEqual({
        message: "gray is required.",
        path: "primitive.color.gray",
      });
    }
  });

  it("should fail with no color swatch", () => {
    try {
      validateDesignTokens({
        tokens: {
          primitive: {
            color: {
              gray: {},
            },
          },
        },
      });
    } catch (error) {
      const validationError = error as TokensValidationError;
      expect(validationError.errors).toContainEqual({
        message: "50 is required.",
        path: "primitive.color.gray.50",
      });
    }
  });

  it("should fail with invalid type", () => {
    try {
      validateDesignTokens({
        tokens: {
          primitive: {
            color: {
              gray: {
                "50": {
                  $type: "colour",
                  $value: "#000000",
                },
              },
            },
          },
        },
      });
    } catch (error) {
      const validationError = error as TokensValidationError;
      expect(validationError.errors).toContainEqual({
        message: `Invalid literal value, expected "color".`,
        path: "primitive.color.gray.50.$type",
      });
    }
  });

  it("should fail with invalid color hex", () => {
    try {
      validateDesignTokens({
        tokens: {
          primitive: {
            color: {
              gray: {
                "50": {
                  $type: "color",
                  $value: "#00000",
                },
              },
            },
          },
        },
      });
    } catch (error) {
      const validationError = error as TokensValidationError;
      expect(validationError.errors).toContainEqual({
        message: "Color must be a full lowercase hex value.",
        path: "primitive.color.gray.50.$value",
      });
    }
  });
});
