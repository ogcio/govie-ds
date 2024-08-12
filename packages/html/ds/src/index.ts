import { createEvents } from './events.js';
import { destroyAllInstances, initHeader } from './header/header.js';

function addJavaScriptClass() {
  const body = document?.body;

  if (!body) {
    throw new Error('No body element found in the document.');
  }

  if (!body.classList.contains('gieds-js')) {
    body.classList.add('gieds-js');
  }
}

export function initGovIe() {
  addJavaScriptClass();

  initHeader();
}

export function destroyGovIe() {
  destroyAllInstances();
}

const componentEvents = createEvents({
  type: 'load',
  functions: [initGovIe],
});

componentEvents.init();

export * from './header/header.js';
