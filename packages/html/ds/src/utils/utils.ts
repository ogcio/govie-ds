export async function initUtils() {
  const { createToast } = await import('../toast/helpers.js');
  const GOVIE = ((window as any).GOVIE = (window as any).GOVIE || {});

  GOVIE.toaster = {
    create: createToast,
  };
}
