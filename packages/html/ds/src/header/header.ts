export function initHeader() {
  for (const headerElement of document.querySelectorAll(
    '[data-module="gieds-header"]',
  )) {
    console.log({ headerElement });
  }
}
