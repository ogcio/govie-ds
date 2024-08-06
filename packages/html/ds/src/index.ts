import { createEvents } from './events.js';
import { initHeader } from './header/header.js';

const events = createEvents({
  type: 'load',
  functions: [initHeader],
});

events.init();

export * from './header/header.js';
