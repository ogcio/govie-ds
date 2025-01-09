export const testVariantsAxe = (
  variants: any,
  renderFunction: (variant: any) => any,
) => {
  for (const variant of variants) {
    test(`axe accessibility test for variant: ${variant}`, async () => {
      const { axe } = renderFunction(variant);
      await axe();
    });
  }
};
