import { createEvents } from './events.js';
import { initHeader } from './header/header.js';

function addJavaScriptClass() {
  const body = document?.body;

  if (!body) {
    throw new Error('No body element found in the document.');
  }

  if (!body.classList.contains('govie-js')) {
    body.classList.add('govie-js');
  }
}

function init() {
  const libraryEvents = createEvents({
    type: 'DOMContentLoaded',
    functions: [addJavaScriptClass],
  });

  libraryEvents.init();

  const componentEvents = createEvents({
    type: 'DOMContentLoaded',
    functions: [initHeader],
  });

  componentEvents.init();
}

init();

export * from './header/header.js';
