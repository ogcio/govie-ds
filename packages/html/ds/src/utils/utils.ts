import { createToast } from '../toast/helpers.js';

export function initUtils() {
  document.addEventListener('DOMContentLoaded', () => {
    const GOVIE = ((window as any).GOVIE = (window as any).GOVIE || {});

    GOVIE.toaster = {
      create: createToast,
    };
  });
}
