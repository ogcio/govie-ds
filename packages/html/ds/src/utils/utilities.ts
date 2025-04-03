export async function initUtilities() {
  const { createToast } = await import('../toast/helpers.js');
  const GOVIE = ((globalThis.window as any).GOVIE =
    (globalThis.window as any).GOVIE || {});

  GOVIE.toaster = {
    create: createToast,
  };
}
