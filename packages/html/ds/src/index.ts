// Don't reorder the following import
import { destroyAllInstances } from './common/instances.js';
import { initCookieBanner } from './cookie-banner/cookie-banner.js';
import { initDrawer } from './drawer/drawer.js';
import { createEvents } from './events.js';
import { initAccordion } from './accordion/accordion.js'; /* eslint-disable-line import-x/order */
import { initAlert } from './alert/alert.js'; /* eslint-disable-line import-x/order */
import { initHeader } from './header/header.js';
import { initCheckboxes } from './input-checkbox/input-checkbox.js'; /* eslint-disable-line import-x/order */
import { initComboBox } from './combo-box/combo-box.js'; /* eslint-disable-line import-x/order */
import { initModal } from './modal/modal.js';
import { initPassword } from './input-password/input-password.js'; /* eslint-disable-line import-x/order */
import { initPopover } from './popover/popover.js';
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
  initPassword();
  initUtilities();
  initPopover();
}

export function destroyGovIe() {
  destroyAllInstances();
}

const componentEvents = createEvents({
  type: 'load',
  functions: [initGovIe],
});

componentEvents.init();

export * from './input-checkbox/input-checkbox.js';
export * from './header/header.js';
export * from './radio/radio.js';
export * from './tabs/tabs.js';
