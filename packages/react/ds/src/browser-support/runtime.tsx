'use client';
export function createBrowserSupportAlert(
  name: string,
  version: string,
): HTMLElement {
  const root = document.createElement('div');
  root.className =
    'gi-alert-base-dismissible gi-alert-warning !gi-max-w-full gi-not-prose';
  root.setAttribute('role', 'alert');
  root.setAttribute('aria-live', 'assertive');

  const icon = document.createElement('span');
  icon.dataset.testid = 'govie-icon';
  icon.dataset.variant = 'warning';
  icon.setAttribute('aria-hidden', 'true');
  icon.setAttribute('role', 'presentation');
  icon.className = 'gi-block material-symbols-outlined gi-alert-icon';
  (icon.style as CSSStyleDeclaration).fontSize = '24px';
  icon.textContent = 'warning';

  const container = document.createElement('div');
  container.className = 'gi-alert-container';

  const title = document.createElement('p');
  title.className = 'gi-alert-title';
  title.textContent = 'Limited browser support detected';

  const contentWrap = document.createElement('div');

  const message = document.createElement('div');
  message.textContent = `${name}${version} is not officially supported. Please update or switch to a supported browser for the best experience.`;

  const link = document.createElement('a');
  link.href =
    'https://ds.services.gov.ie/get-started/developers/supported-browsers/';
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.className = 'gi-link';
  link.textContent = 'View supported browsers';

  const dismissButton = document.createElement('button');
  dismissButton.type = 'button';
  dismissButton.setAttribute('role', 'button');
  dismissButton.setAttribute('aria-label', 'Dismiss Alert');
  dismissButton.className =
    'gi-btn gi-btn-flat-dark gi-icon-btn-small gi-alert-dismiss';

  const dismissIcon = document.createElement('span');
  dismissIcon.setAttribute('role', 'presentation');
  dismissIcon.className = 'gi-block material-symbols-outlined';
  (dismissIcon.style as CSSStyleDeclaration).fontSize = '16px';
  dismissIcon.textContent = 'close';

  dismissButton.append(dismissIcon);

  contentWrap.append(message);
  contentWrap.append(link);

  container.append(title);
  container.append(contentWrap);

  root.append(icon);
  root.append(container);
  root.append(dismissButton);

  dismissButton.addEventListener(
    'click',
    () => {
      const p = root.parentElement;
      if (p) {
        p.remove();
      }
    },
    { once: true },
  );

  return root;
}
type BrowserInfo = {
  name: string;
  version: number;
  os: string;
  isMobile: boolean;
};

const minimumVersions = {
  desktop: { chrome: 109, firefox: 128, safari: 18, edge: 136 },
  mobile: { chrome: 138, safari: 18, firefox: 140, samsung: 27 },
};

let bannerIsMounted = false;

function onBodyReady(callback: () => void): void {
  if (document.body) {
    callback();
    return;
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      (): void => {
        callback();
      },
      { once: true },
    );
    return;
  }

  const mutationObserver = new MutationObserver((): void => {
    if (document.body) {
      mutationObserver.disconnect();
      callback();
    }
  });

  mutationObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

function ensureContainerElement(): HTMLElement | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const containerId = '#lib-browser-support-banner-root';
  const existingContainerElement = document.querySelector(
    containerId,
  ) as HTMLElement | null;

  if (existingContainerElement) {
    return existingContainerElement;
  }

  if (!document.body) {
    return null;
  }

  const containerElement = document.createElement('div');
  containerElement.id = containerId;
  containerElement.className = 'gi-w-full gi-p-1 gi-block';

  if (document.body.firstChild) {
    document.body.insertBefore(containerElement, document.body.firstChild);
  } else {
    document.body.append(containerElement);
  }

  return containerElement;
}

function renderAlert(browserInfo: BrowserInfo): void {
  const containerElement = ensureContainerElement();

  if (!containerElement) {
    onBodyReady((): void => {
      const readyContainerElement = ensureContainerElement();
      if (!readyContainerElement) {
        return;
      }
      renderAlert(browserInfo);
    });
    return;
  }

  const browserName = browserInfo.name
    ? browserInfo.name.charAt(0).toUpperCase() + browserInfo.name.slice(1)
    : 'Browser';

  const versionText = browserInfo.version > 0 ? ` ${browserInfo.version}` : '';

  const existingAlertElement = containerElement.querySelector('[role="alert"]');
  if (
    existingAlertElement &&
    existingAlertElement.parentElement === containerElement
  ) {
    containerElement.remove();
  }

  const alertElement = createBrowserSupportAlert(browserName, versionText);
  containerElement.append(alertElement);
}

function showUnsupportedBrowserBanner(browserInfo?: BrowserInfo): void {
  if (bannerIsMounted) {
    return;
  }

  const resolvedBrowserInfo = browserInfo ?? getBrowserInfo();

  renderAlert(resolvedBrowserInfo);
  bannerIsMounted = true;
}

function autoRun(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const browserInfo = getBrowserInfo();
  const isSupported = isBrowserSupported(browserInfo);

  if (!isSupported) {
    const scheduleRender = (): void => {
      requestAnimationFrame((): void => {
        showUnsupportedBrowserBanner(browserInfo);
      });
    };

    if (document.readyState === 'complete') {
      scheduleRender();
    } else if (document.readyState === 'interactive') {
      window.addEventListener(
        'load',
        (): void => {
          scheduleRender();
        },
        { once: true },
      );
    } else {
      document.addEventListener(
        'DOMContentLoaded',
        (): void => {
          window.addEventListener(
            'load',
            (): void => {
              scheduleRender();
            },
            { once: true },
          );
        },
        { once: true },
      );
    }
  }
}

if (typeof document !== 'undefined') {
  queueMicrotask((): void => {
    try {
      autoRun();
    } catch (error) {
      console.error('[browser-check] failed to run', error);
    }
  });
}

function detectOperatingSystem(): string {
  const userAgent = globalThis.navigator?.userAgent ?? '';
  if (/Windows/i.test(userAgent)) {
    return 'Windows';
  }
  if (/Mac OS X/i.test(userAgent) && !/iP(hone|ad|od)/i.test(userAgent)) {
    return 'macOS';
  }
  if (/Android/i.test(userAgent)) {
    return 'Android';
  }
  if (/iP(hone|ad|od)/i.test(userAgent)) {
    return 'iOS';
  }
  if (/Linux/i.test(userAgent)) {
    return 'Linux';
  }
  return 'Unknown';
}

function getBrowserInfo(): BrowserInfo {
  const userAgent = globalThis.navigator?.userAgent ?? '';
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iP(hone|ad|od)/i.test(userAgent);
  const isMobile = isAndroid || isIOS || /Mobile/i.test(userAgent);
  const edgeMatch = userAgent.match(/Edg\/(\d+)/);
  if (edgeMatch) {
    return {
      name: 'edge',
      version: Number.parseInt(edgeMatch[1], 10),
      os: detectOperatingSystem(),
      isMobile,
    };
  }
  const samsungMatch = userAgent.match(/SamsungBrowser\/(\d+)/);
  if (samsungMatch) {
    return {
      name: 'samsung',
      version: Number.parseInt(samsungMatch[1], 10),
      os: detectOperatingSystem(),
      isMobile: true,
    };
  }
  const chromeIOSMatch = userAgent.match(/CriOS\/(\d+)/);
  if (chromeIOSMatch) {
    return {
      name: 'chrome',
      version: Number.parseInt(chromeIOSMatch[1], 10),
      os: 'iOS',
      isMobile: true,
    };
  }
  const firefoxIOSMatch = userAgent.match(/FxiOS\/(\d+)/);
  if (firefoxIOSMatch) {
    return {
      name: 'firefox',
      version: Number.parseInt(firefoxIOSMatch[1], 10),
      os: 'iOS',
      isMobile: true,
    };
  }
  const isSafari =
    /Safari\//.test(userAgent) &&
    !/Chrome|Chromium|CriOS|Edg|OPR|SamsungBrowser/i.test(userAgent);
  if (isSafari) {
    const versionMatch = userAgent.match(/Version\/(\d+)/);
    const version = versionMatch ? Number.parseInt(versionMatch[1], 10) : 0;
    return {
      name: 'safari',
      version,
      os: isIOS ? 'iOS' : detectOperatingSystem(),
      isMobile,
    };
  }
  const firefoxMatch = userAgent.match(/Firefox\/(\d+)/);
  if (firefoxMatch) {
    return {
      name: 'firefox',
      version: Number.parseInt(firefoxMatch[1], 10),
      os: detectOperatingSystem(),
      isMobile,
    };
  }
  const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
  if (chromeMatch) {
    return {
      name: 'chrome',
      version: Number.parseInt(chromeMatch[1], 10),
      os: detectOperatingSystem(),
      isMobile,
    };
  }
  return { name: 'unknown', version: 0, os: detectOperatingSystem(), isMobile };
}

function isBrowserSupported(info?: BrowserInfo): boolean {
  const browserInfo = info ?? getBrowserInfo();
  const isMobile = browserInfo.isMobile === true;
  if (browserInfo.name === 'chrome') {
    if (isMobile) {
      return browserInfo.version >= minimumVersions.mobile.chrome;
    }
    return browserInfo.version >= minimumVersions.desktop.chrome;
  }
  if (browserInfo.name === 'firefox') {
    if (isMobile) {
      if (browserInfo.os === 'Android') {
        return browserInfo.version >= minimumVersions.mobile.firefox;
      }
      return browserInfo.version >= minimumVersions.mobile.chrome;
    }
    return browserInfo.version >= minimumVersions.desktop.firefox;
  }
  if (browserInfo.name === 'safari') {
    if (isMobile) {
      return browserInfo.version >= minimumVersions.mobile.safari;
    }
    return browserInfo.version >= minimumVersions.desktop.safari;
  }
  if (browserInfo.name === 'edge') {
    if (isMobile) {
      return false;
    }
    return browserInfo.version >= minimumVersions.desktop.edge;
  }
  if (browserInfo.name === 'samsung') {
    return browserInfo.version >= minimumVersions.mobile.samsung;
  }
  return false;
}
