import { expect } from '@storybook/test';

expect.extend({
  toBeExternalLink(received: HTMLElement) {
    if (
      !(received instanceof HTMLElement) ||
      received.tagName.toLowerCase() !== 'a'
    ) {
      return {
        pass: false,
        message: () =>
          `Expected an <a> element, but received: ${typeof received}`,
      };
    }

    const target = received.getAttribute('target');
    const relationship = received.getAttribute('rel');

    if (target !== '_blank') {
      return {
        pass: false,
        message: () =>
          `Expected target="_blank", but received: ${target || 'no target'}`,
      };
    }

    const hasNoopener = relationship?.includes('noopener');
    const hasNoreferrer = relationship?.includes('noreferrer');
    if (!hasNoopener || !hasNoreferrer) {
      return {
        pass: false,
        message: () =>
          `Expected rel to include "noopener noreferrer", but received: ${relationship || 'no rel'}`,
      };
    }

    return {
      pass: true,
      message: () =>
        `The <a> element has target="_blank" and includes "rel=noopener noreferrer".`,
    };
  },
});
