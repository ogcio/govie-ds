'use client';

type RenderingEngine = 'chromium' | 'gecko' | 'webkit' | 'unknown';

type BrowserInfo = {
  brand: string;
  version: number;
  engine: RenderingEngine;
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isAndroidWebView: boolean;
  isSamsungInternet: boolean;
};

type SupportPolicy = {
  desktop: { chromium: number; gecko: number; webkit: number };
  mobile: { chromium: number; gecko: number; webkit: number };
};

type BannerStrings = {
  title: string;
  message: (browserName: string, versionText: string) => string;
  linkText: string;
  linkHref: string;
};

const SUPPORT_POLICY: SupportPolicy = {
  desktop: { chromium: 109, gecko: 128, webkit: 16 },
  mobile: { chromium: 114, gecko: 128, webkit: 16 },
};

const DEFAULT_STRINGS: BannerStrings = {
  title: 'Limited browser support detected',
  message: (browserName, versionText) =>
    `${browserName}${versionText} is not officially supported. Please update or switch to a supported browser for the best experience.`,
  linkText: 'View supported browsers',
  linkHref:
    'https://ds.services.gov.ie/get-started/developers/supported-browsers/',
};

function capitalizeFirst(text: string): string {
  if (text.length === 0) {
    return '';
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getNumberFromMatch(match: RegExpMatchArray | null): number {
  if (match !== null) {
    return Number.parseInt(match[1], 10);
  }
  return 0;
}

function normalizeBrand(rawBrand: string): string {
  if (rawBrand.length === 0) {
    return 'chrome';
  }
  const lower = rawBrand.toLowerCase();

  if (lower.includes('google chrome')) {
    return 'chrome';
  }
  if (lower.includes('edge')) {
    return 'edge';
  }
  if (lower.includes('opera')) {
    return 'opera';
  }
  if (lower.includes('vivaldi')) {
    return 'vivaldi';
  }
  if (lower.includes('brave')) {
    return 'brave';
  }
  if (lower.includes('arc')) {
    return 'arc';
  }
  if (lower.includes('samsung')) {
    return 'samsung';
  }
  if (lower.includes('yabrowser')) {
    return 'yandex';
  }
  if (lower.includes('whale')) {
    return 'whale';
  }
  if (lower.includes('firefox')) {
    return 'firefox';
  }
  if (lower.includes('safari')) {
    return 'safari';
  }
  return lower;
}

function extractFirefoxMajorVersion(userAgentString: string): number {
  const iosFirefoxMatch = /FxiOS\/(\d+)/.exec(userAgentString);
  const desktopFirefoxMatch = /Firefox\/(\d+)/.exec(userAgentString);
  const iosVersion = getNumberFromMatch(iosFirefoxMatch);
  if (iosVersion) {
    return iosVersion;
  }
  return getNumberFromMatch(desktopFirefoxMatch);
}

function extractSafariMajorVersion(
  userAgentString: string,
  isIOS: boolean,
): number {
  const versionMatch = /Version\/(\d+)/.exec(userAgentString);
  if (versionMatch) {
    return getNumberFromMatch(versionMatch);
  }
  if (isIOS) {
    const iosMatch = /OS (\d+)_\d+(_\d+)? like Mac OS X/.exec(userAgentString);
    const iosMajor = getNumberFromMatch(iosMatch);
    if (iosMajor > 0) {
      return iosMajor;
    }
  }
  return 0;
}

function getChromiumBrandFromMatches(arguments_: any): string {
  if (arguments_.edgeMatch) {
    return 'edge';
  }
  if (arguments_.operaMatch) {
    return 'opera';
  }
  if (arguments_.hasVivaldi) {
    return 'vivaldi';
  }
  if (arguments_.yandexMatch) {
    return 'yandex';
  }
  if (arguments_.whaleMatch) {
    return 'whale';
  }
  if (arguments_.braveMatch) {
    return 'brave';
  }
  if (arguments_.arcMatch) {
    return 'arc';
  }
  if (arguments_.samsungMatch) {
    return 'samsung';
  }
  return 'chrome';
}

async function getHighEntropy(
  initialBrandEntries?: Array<{ brand: string; version: string }>,
) {
  try {
    const navigatorAny = navigator as any;
    if (
      typeof navigatorAny.userAgentData?.getHighEntropyValues === 'function'
    ) {
      const highEntropyValues =
        await navigatorAny.userAgentData.getHighEntropyValues([
          'platform',
          'platformVersion',
          'fullVersionList',
          'model',
          'architecture',
          'bitness',
          'uaFullVersion',
        ]);
      const fullVersionList: Array<{ brand: string; version: string }> =
        (highEntropyValues.fullVersionList as Array<{
          brand: string;
          version: string;
        }>) ??
        initialBrandEntries ??
        [];
      return { ok: true as const, ...highEntropyValues, fullVersionList };
    }
  } catch (error) {
    console.error('[browser-check] failed to get user-agent info', error);
  }
  return { ok: false as const };
}

function getEngineInfoSync(): {
  engine: RenderingEngine;
  version: number;
  brand: string;
  isSamsung: boolean;
} {
  const navigatorAny = globalThis.navigator as any;
  const userAgentString: string = navigatorAny?.userAgent ?? '';

  const edgeMatch = userAgentString.match(/Edg\/(\d+)/);
  const operaMatch = userAgentString.match(/OPR\/(\d+)/);
  const hasVivaldi = /Vivaldi/i.test(userAgentString);
  const yandexMatch = /YaBrowser\/(\d+)/i.exec(userAgentString);
  const whaleMatch = /Whale\/(\d+)/i.exec(userAgentString);
  const braveMatch = /Brave\/(\d+)/i.exec(userAgentString);
  const arcMatch = /Arc\/(\d+)/i.exec(userAgentString);
  const samsungMatch = /SamsungBrowser\/(\d+)/i.exec(userAgentString);
  const chromeMatch = userAgentString.match(/Chrome\/(\d+)/);

  if (
    edgeMatch ||
    operaMatch ||
    hasVivaldi ||
    yandexMatch ||
    whaleMatch ||
    braveMatch ||
    arcMatch ||
    samsungMatch ||
    chromeMatch
  ) {
    const chromiumMajorVersion =
      getNumberFromMatch(chromeMatch) ||
      getNumberFromMatch(edgeMatch) ||
      getNumberFromMatch(operaMatch) ||
      getNumberFromMatch(yandexMatch) ||
      getNumberFromMatch(whaleMatch) ||
      getNumberFromMatch(braveMatch) ||
      getNumberFromMatch(arcMatch) ||
      0;

    const normalizedBrand = getChromiumBrandFromMatches({
      edgeMatch,
      operaMatch,
      hasVivaldi,
      yandexMatch,
      whaleMatch,
      braveMatch,
      arcMatch,
      samsungMatch,
    });

    return {
      engine: 'chromium',
      version: chromiumMajorVersion,
      brand: normalizedBrand,
      isSamsung: Boolean(samsungMatch),
    };
  }

  const firefoxMajorVersion = extractFirefoxMajorVersion(userAgentString);
  if (firefoxMajorVersion > 0) {
    return {
      engine: 'gecko',
      version: firefoxMajorVersion,
      brand: 'firefox',
      isSamsung: false,
    };
  }

  const isSafariLike =
    /Safari\//.test(userAgentString) &&
    !/Chrome|Chromium|CriOS|Edg|OPR|SamsungBrowser/i.test(userAgentString);

  if (isSafariLike) {
    return { engine: 'webkit', version: 0, brand: 'safari', isSamsung: false };
  }

  return { engine: 'unknown', version: 0, brand: 'unknown', isSamsung: false };
}

async function getBrowserInfo(): Promise<BrowserInfo> {
  const userAgentString = globalThis.navigator?.userAgent ?? '';
  const isAndroid = /Android/i.test(userAgentString);
  const isIOS = /iP(hone|ad|od)/i.test(userAgentString);
  const isMobile = isAndroid || isIOS || /Mobile/i.test(userAgentString);

  const syncInfo = getEngineInfoSync();
  const engine: RenderingEngine = syncInfo.engine;
  let version = syncInfo.version;
  let brand = syncInfo.brand;

  if (engine === 'webkit') {
    version = extractSafariMajorVersion(userAgentString, isIOS);
  }

  if (engine === 'chromium') {
    const navigatorAny = navigator as any;
    const brandEntries: Array<{ brand: string; version: string }> | undefined =
      navigatorAny.userAgentData?.brands;
    const highEntropy = await getHighEntropy(brandEntries);

    if (highEntropy.ok) {
      const chromiumEntry = highEntropy.fullVersionList.find((entry: any) =>
        /Chromium|Chrome/i.test(entry.brand),
      );

      if (chromiumEntry?.version) {
        const major = Number.parseInt(
          String(chromiumEntry.version).split('.')[0] ?? `${version}`,
          10,
        );

        if (Number.isFinite(major)) {
          version = major;
        }
      }

      const nicerBrand = highEntropy.fullVersionList.find((entry: any) =>
        /(edge|opera|vivaldi|brave|arc|samsung|yabrowser|whale|google chrome)/i.test(
          entry.brand,
        ),
      )?.brand;
      if (nicerBrand) {
        brand = normalizeBrand(nicerBrand);
      }
    }
  }

  const isAndroidWebView =
    isAndroid &&
    (/; wv\)/i.test(userAgentString) ||
      /Version\/\d+\.\d+ Chrome\/\d+\.\d+\.\d+\.\d+ Mobile Safari\/\d+\.\d+/i.test(
        userAgentString,
      )) &&
    !/SamsungBrowser/i.test(userAgentString);

  const isSamsungInternet =
    /SamsungBrowser\/\d+/i.test(userAgentString) || syncInfo.isSamsung;

  const effectiveEngine: RenderingEngine = isIOS ? 'webkit' : engine;

  return {
    brand,
    version,
    engine: effectiveEngine,
    isMobile,
    isIOS,
    isAndroid,
    isAndroidWebView,
    isSamsungInternet,
  };
}

function getBrowserDisplayName(browserInfo: BrowserInfo): string {
  if (browserInfo.brand.length > 0 && browserInfo.brand !== 'unknown') {
    return capitalizeFirst(browserInfo.brand);
  }
  if (browserInfo.engine === 'unknown') {
    return 'Browser';
  }
  return capitalizeFirst(browserInfo.engine);
}

function isVersionSupported(
  browserInfo: BrowserInfo,
  policy: SupportPolicy,
): boolean {
  const versionTable = browserInfo.isMobile ? policy.mobile : policy.desktop;
  if (browserInfo.engine === 'chromium') {
    return browserInfo.version >= versionTable.chromium;
  }
  if (browserInfo.engine === 'gecko') {
    return browserInfo.version >= versionTable.gecko;
  }
  if (browserInfo.engine === 'webkit') {
    return browserInfo.version >= versionTable.webkit;
  }
  return false;
}

const CONTAINER_ELEMENT_ID = 'lib-browser-support-banner-root';

function isBrowserSupported(
  browserInfo: BrowserInfo,
  policy: SupportPolicy,
): boolean {
  return isVersionSupported(browserInfo, policy);
}

function createBrowserSupportAlert(
  browserDisplayName: string,
  versionText: string,
  strings: BannerStrings = DEFAULT_STRINGS,
): HTMLElement {
  const rootElement = document.createElement('div');
  rootElement.className =
    'gi-alert-base-dismissible gi-alert-warning !gi-max-w-full gi-not-prose';
  rootElement.setAttribute('role', 'alert');
  rootElement.setAttribute('aria-live', 'assertive');

  const iconElement = document.createElement('span');
  iconElement.dataset.testid = 'govie-icon';
  iconElement.dataset.variant = 'warning';
  iconElement.setAttribute('aria-hidden', 'true');
  iconElement.setAttribute('role', 'presentation');
  iconElement.className = 'gi-block material-symbols-outlined gi-alert-icon';
  (iconElement.style as CSSStyleDeclaration).fontSize = '24px';
  iconElement.textContent = 'warning';

  const containerElement = document.createElement('div');
  containerElement.className = 'gi-alert-container';

  const titleElement = document.createElement('p');
  titleElement.className = 'gi-alert-title';
  titleElement.textContent = strings.title;

  const contentWrapperElement = document.createElement('div');

  const messageId = 'browser-support-message';
  const messageElement = document.createElement('div');
  messageElement.id = messageId;
  messageElement.textContent = strings.message(browserDisplayName, versionText);

  const linkElement = document.createElement('a');
  linkElement.href = strings.linkHref;
  linkElement.target = '_blank';
  linkElement.rel = 'noreferrer';
  linkElement.className = 'gi-link';
  linkElement.textContent = strings.linkText;

  const dismissButtonElement = document.createElement('button');
  dismissButtonElement.type = 'button';
  dismissButtonElement.setAttribute('aria-label', 'Dismiss alert');
  dismissButtonElement.className =
    'gi-btn gi-btn-flat-dark gi-icon-btn-small gi-alert-dismiss';

  const dismissIconElement = document.createElement('span');
  dismissIconElement.setAttribute('role', 'presentation');
  dismissIconElement.className = 'gi-block material-symbols-outlined';
  (dismissIconElement.style as CSSStyleDeclaration).fontSize = '16px';
  dismissIconElement.textContent = 'close';

  dismissButtonElement.append(dismissIconElement);
  contentWrapperElement.append(messageElement);
  contentWrapperElement.append(linkElement);
  containerElement.append(titleElement);
  containerElement.append(contentWrapperElement);
  rootElement.append(iconElement);
  rootElement.append(containerElement);
  rootElement.append(dismissButtonElement);

  dismissButtonElement.addEventListener(
    'click',
    () => {
      const mainContainerElement = document.querySelector(
        `#${CONTAINER_ELEMENT_ID}`,
      );
      mainContainerElement?.remove();
      rootElement.remove();

      bannerIsMounted = false;
    },
    { once: true },
  );

  rootElement.setAttribute('aria-describedby', messageId);
  return rootElement;
}

let bannerIsMounted = false;

function ensureContainerElement(): HTMLElement | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const existingContainerElement = document.querySelector(
    `#${CONTAINER_ELEMENT_ID}`,
  ) as HTMLElement | null;
  if (existingContainerElement !== null) {
    return existingContainerElement;
  }

  if (!document.body) {
    return null;
  }

  const element = document.createElement('div');
  element.id = CONTAINER_ELEMENT_ID;
  element.className = 'gi-w-full gi-p-1 gi-block';

  if (document.body.firstChild) {
    document.body.insertBefore(element, document.body.firstChild);
  } else {
    document.body.append(element);
  }

  return element;
}

function onBodyReady(callback: () => void): void {
  if (document.body) {
    callback();
    return;
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
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

function renderAlert(browserInfo: BrowserInfo): void {
  const containerElement = ensureContainerElement();

  const tryRender = (): void => {
    const readyContainerElement = ensureContainerElement();
    if (!readyContainerElement) {
      return;
    }

    const existingAlertElement =
      readyContainerElement.querySelector('[role="alert"]');
    if (existingAlertElement) {
      existingAlertElement.remove();
    }

    const browserDisplayName = getBrowserDisplayName(browserInfo);
    const versionText =
      browserInfo.version > 0 ? ` ${browserInfo.version}` : '';

    const alertElement = createBrowserSupportAlert(
      browserDisplayName,
      versionText,
      DEFAULT_STRINGS,
    );
    readyContainerElement.prepend(alertElement);
    bannerIsMounted = true;
  };

  if (!containerElement) {
    onBodyReady((): void => {
      tryRender();
    });
    return;
  }

  tryRender();
}

async function showUnsupportedBrowserBanner(
  optionalBrowserInfo?: BrowserInfo,
): Promise<void> {
  if (bannerIsMounted) {
    return;
  }

  const resolvedBrowserInfo = optionalBrowserInfo ?? (await getBrowserInfo());
  renderAlert(resolvedBrowserInfo);
}

function scheduleRender(scheduledFunction: () => void): void {
  requestAnimationFrame((): void => {
    scheduledFunction();
  });
}

async function autoRun(): Promise<void> {
  if (typeof document === 'undefined') {
    return;
  }

  const browserInfo = await getBrowserInfo();
  const isSupported = isBrowserSupported(browserInfo, SUPPORT_POLICY);

  if (!isSupported) {
    const task = (): void => {
      void showUnsupportedBrowserBanner(browserInfo);
    };

    if (document.readyState === 'complete') {
      scheduleRender(task);
    } else if (document.readyState === 'interactive') {
      window.addEventListener(
        'load',
        () => {
          scheduleRender(task);
        },
        { once: true },
      );
    } else {
      document.addEventListener(
        'DOMContentLoaded',
        () => {
          window.addEventListener(
            'load',
            () => {
              scheduleRender(task);
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
    autoRun().catch((error: unknown): void => {
      console.error('[browser-check] failed to run', error);
    });
  });
}

export const __test = {
  extractFirefoxMajorVersion,
  extractSafariMajorVersion,
  normalizeBrand,
  getEngineInfoSync,
  getBrowserInfo,
  isBrowserSupported: (browserInfo: BrowserInfo) => {
    return isBrowserSupported(browserInfo, SUPPORT_POLICY);
  },
  SUPPORT_POLICY,
};
