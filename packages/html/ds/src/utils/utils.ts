import { createToast } from '../toast/helpers.js';

export function initUtils() {
  const GOVIE = ((window as any).GOVIE = (window as any).GOVIE || {});

  GOVIE.toaster = {
    create: createToast,
  };
}
