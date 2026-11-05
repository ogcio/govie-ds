import { createRoot } from 'react-dom/client';
import { Inspector } from './Inspector';
import styles from './styles.css?inline';

/**
 * The inspector renders into a shadow root, so page styles reach it only through inherited custom properties
 * and its own styles never reach the page.
 */
function mount() {
  // Another copy of the script may have mounted the inspector already.
  if (document.querySelector('design-system-inspector')) {
    return;
  }
  const host = document.createElement('design-system-inspector');
  const shadowRoot = host.attachShadow({ mode: 'open' });
  document.body.append(host);

  createRoot(shadowRoot).render(
    <>
      <style>{styles}</style>
      <Inspector host={host} />
    </>,
  );
}

if (document.body) {
  mount();
} else {
  document.addEventListener('DOMContentLoaded', mount, { once: true });
}
