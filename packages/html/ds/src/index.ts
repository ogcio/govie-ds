import { destroyAllInstances } from './common/instances.js';
import { initCookieBanner } from './cookie-banner/cookie-banner.js';
import { createEvents } from './events.js';
import { initHeader } from './header/header.js';
import { initCheckboxes } from './checkbox/checkbox.js'; /* eslint-disable-line import/order */
import { initComboBox } from './combo-box/combo-box.js'; /* eslint-disable-line import/order */
import { initAlert } from './alert/alert.js'; /* eslint-disable-line import/order */
import { initModal } from './modal/modal.js';
import { initRadios } from './radio/radio.js';
import { initTabs } from './tabs/tabs.js';
import { initTextarea } from './textarea/textarea.js';
import { initPagination } from './pagination/pagination.js';

export * as properties from './dist/properties.js';

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
  initCheckboxes();
  initRadios();
  initTextarea();
  initModal();
  initCookieBanner();
  initTabs();
  initComboBox();
  initAlert();
  // initPagination();
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
export * from './checkbox/checkbox.js';
export * from './radio/radio.js';
export * from './tabs/tabs.js';
