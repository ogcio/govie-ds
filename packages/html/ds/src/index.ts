// Don't reorder the following import
import { destroyAllInstances } from './common/instances.js'; /* eslint-disable-line import-x/order */
import { initCookieBanner } from './cookie-banner/cookie-banner.js';
import { initDrawer } from './drawer/drawer.js';
import { createEvents } from './events.js';
import { initAccordion } from './accordion/accordion.js';
import { initAlert } from './alert/alert.js';
import { initCheckboxes } from './checkbox/checkbox.js';
import { initComboBox } from './combo-box/combo-box.js';
import { initHeader } from './header/header.js';
import { initModal } from './modal/modal.js';
import { initRadios } from './radio/radio.js';
import { initTabs } from './tabs/tabs.js';
import { initTextarea } from './textarea/textarea.js';
import { initToast } from './toast/toast.js';
import { initTooltip } from './tooltip/tooltip.js';
import { initUtilities } from './utils/utilities.js';

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
  initTooltip();
  initModal();
  initDrawer();
  initCookieBanner();
  initTabs();
  initComboBox();
  initAlert();
  initToast();
  initAccordion();
  initUtilities();
}

export function destroyGovIe() {
  destroyAllInstances();
}

const componentEvents = createEvents({
  type: 'load',
  functions: [initGovIe],
});

componentEvents.init();

export * from './checkbox/checkbox.js';
export * from './header/header.js';
export * from './radio/radio.js';
export * from './tabs/tabs.js';
