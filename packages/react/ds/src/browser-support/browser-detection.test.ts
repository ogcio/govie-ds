import { describe, it, expect, afterEach, vi } from 'vitest';

import {
  getNumberFromMatch,
  normalizeBrand,
  extractFirefoxMajorVersion,
  extractSafariMajorVersion,
  getChromiumBrandFromMatches,
  getEngineInfoSync,
  getBrowserInfo,
  getBrowserDisplayName,
  isBrowserSupported,
} from './browser-detection.js';

import type { SupportPolicy, BrowserInfo } from './types.js';

const originalNavigator = globalThis.navigator;

const defineNavigatorUA = (ua: string, userAgentData?: unknown): void => {
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      userAgent: ua,
      userAgentData,
    },
  });
};

const resetNavigator = (): void => {
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: originalNavigator,
  });
};

const POLICY: SupportPolicy = {
  desktop: { chromium: 109, gecko: 128, webkit: 16 },
  mobile: { chromium: 114, gecko: 128, webkit: 16 },
};

describe('getNumberFromMatch', () => {
  it('returns 0 for null', () => {
    expect(getNumberFromMatch(null)).toBe(0);
  });

  it('parses integer from first capture group', () => {
    const m = /Chrome\/(\d+)/.exec('Chrome/120.0.0.0');
    expect(getNumberFromMatch(m)).toBe(120);
  });
});

describe('normalizeBrand', () => {
  it('handles empty -> chrome', () => {
    expect(normalizeBrand('')).toBe('chrome');
  });

  it('maps common brands', () => {
    expect(normalizeBrand('Google Chrome')).toBe('chrome');
    expect(normalizeBrand('Edge')).toBe('edge');
    expect(normalizeBrand('OPERA GX')).toBe('opera');
    expect(normalizeBrand('Vivaldi')).toBe('vivaldi');
    expect(normalizeBrand('Brave')).toBe('brave');
    expect(normalizeBrand('Arc')).toBe('arc');
    expect(normalizeBrand('Samsung Internet')).toBe('samsung');
    expect(normalizeBrand('YaBrowser')).toBe('yandex');
    expect(normalizeBrand('Whale')).toBe('whale');
    expect(normalizeBrand('Firefox')).toBe('firefox');
    expect(normalizeBrand('Safari')).toBe('safari');
  });

  it('falls back to lowercase string if no mapping', () => {
    expect(normalizeBrand('MyCustomBrowser')).toBe('mycustombrowser');
  });
});

describe('extractFirefoxMajorVersion', () => {
  it('extracts desktop Firefox version', () => {
    expect(extractFirefoxMajorVersion('Mozilla/5.0 Firefox/129.0')).toBe(129);
  });

  it('extracts iOS Firefox version from FxiOS', () => {
    expect(
      extractFirefoxMajorVersion('Version/16.5 Mobile/15E148 FxiOS/124'),
    ).toBe(124);
  });

  it('returns 0 when not present', () => {
    expect(extractFirefoxMajorVersion('Chrome/120 Safari/537.36')).toBe(0);
  });
});

describe('extractSafariMajorVersion', () => {
  it('extracts from Version/x token when present', () => {
    const ua = 'Version/17.3 Safari/605.1.15';
    expect(extractSafariMajorVersion(ua, false)).toBe(17);
  });

  it('falls back to iOS major version when Version/ is absent', () => {
    const ua =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 Safari/605.1.15';
    expect(extractSafariMajorVersion(ua, true)).toBe(16);
  });

  it('returns 0 when nothing matches', () => {
    expect(extractSafariMajorVersion('Chrome/120 Safari/537.36', false)).toBe(
      0,
    );
  });
});

describe('getChromiumBrandFromMatches', () => {
  it('returns the first matching brand by priority', () => {
    expect(
      getChromiumBrandFromMatches({
        edgeMatch: ['Edg/120'] as unknown as RegExpMatchArray,
      }),
    ).toBe('edge');

    expect(
      getChromiumBrandFromMatches({
        operaMatch: ['OPR/100'] as unknown as RegExpMatchArray,
      }),
    ).toBe('opera');

    expect(
      getChromiumBrandFromMatches({
        hasVivaldi: ['Vivaldi'] as unknown as RegExpMatchArray,
      }),
    ).toBe('vivaldi');

    expect(
      getChromiumBrandFromMatches({
        yandexMatch: ['YaBrowser/23'] as unknown as RegExpMatchArray,
      }),
    ).toBe('yandex');

    expect(
      getChromiumBrandFromMatches({
        whaleMatch: ['Whale/3'] as unknown as RegExpMatchArray,
      }),
    ).toBe('whale');

    expect(
      getChromiumBrandFromMatches({
        braveMatch: ['Brave/1'] as unknown as RegExpMatchArray,
      }),
    ).toBe('brave');

    expect(
      getChromiumBrandFromMatches({
        arcMatch: ['Arc/1'] as unknown as RegExpMatchArray,
      }),
    ).toBe('arc');

    expect(
      getChromiumBrandFromMatches({
        samsungMatch: ['SamsungBrowser/21'] as unknown as RegExpMatchArray,
      }),
    ).toBe('samsung');
  });

  it('defaults to chrome when no flags match', () => {
    expect(getChromiumBrandFromMatches({} as any)).toBe('chrome');
  });
});

describe('getEngineInfoSync', () => {
  afterEach(() => {
    resetNavigator();
  });

  it('returns unknown on non-browser environments', () => {
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: undefined,
    });
    const info = getEngineInfoSync();
    expect(info.engine).toBe('unknown');
    expect(info.brand).toBe('unknown');
    expect(info.version).toBe(0);
  });

  it('detects Chromium Chrome with version and brand', () => {
    defineNavigatorUA('Mozilla/5.0 Chrome/120.0.6099.71 Safari/537.36');
    const info = getEngineInfoSync();
    expect(info.engine).toBe('chromium');
    expect(info.brand).toBe('chrome');
    expect(info.version).toBe(120);
    expect(info.isSamsung).toBe(false);
  });

  it('detects Chromium Edge with version and brand', () => {
    defineNavigatorUA(
      'Mozilla/5.0 AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    );
    const info = getEngineInfoSync();
    expect(info.engine).toBe('chromium');
    expect(info.brand).toBe('edge');
    expect(info.version).toBeGreaterThan(0);
  });

  it('detects Gecko Firefox', () => {
    defineNavigatorUA('Mozilla/5.0 Firefox/129.0');
    const info = getEngineInfoSync();
    expect(info.engine).toBe('gecko');
    expect(info.brand).toBe('firefox');
    expect(info.version).toBe(129);
  });

  it('detects WebKit Safari-like', () => {
    defineNavigatorUA(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
    );
    const info = getEngineInfoSync();
    expect(info.engine).toBe('webkit');
    expect(info.brand).toBe('safari');
  });

  it('returns unknown when no tokens found', () => {
    defineNavigatorUA('Some UA With No Known Tokens');
    const info = getEngineInfoSync();
    expect(info.engine).toBe('unknown');
    expect(info.brand).toBe('unknown');
    expect(info.version).toBe(0);
  });
});

describe('getBrowserInfo', () => {
  afterEach(() => {
    resetNavigator();
    vi.restoreAllMocks();
  });

  it('returns unknowns when navigator is undefined', async () => {
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: undefined,
    });
    const info = await getBrowserInfo();
    expect(info.engine).toBe('unknown');
    expect(info.brand).toBe('unknown');
    expect(info.version).toBe(0);
    expect(info.isMobile).toBe(false);
  });

  it('uses high-entropy values to refine version and brand (Chromium)', async () => {
    const mockGetHEV = vi.fn().mockResolvedValue({
      fullVersionList: [
        { brand: 'Chromium', version: '120.0.6099.71' },
        { brand: 'Google Chrome', version: '120.0.6099.71' },
        { brand: 'Not;A Brand', version: '99.0.0.0' },
      ],
      uaFullVersion: '120.0.6099.71',
    });

    defineNavigatorUA('Mozilla/5.0 Chrome/117.0 Safari/537.36', {
      brands: [
        { brand: 'Chromium', version: '120' },
        { brand: 'Google Chrome', version: '120' },
      ],
      getHighEntropyValues: mockGetHEV,
    });

    const info = await getBrowserInfo();
    expect(mockGetHEV).toHaveBeenCalled();
    expect(info.engine).toBe('chromium');
    expect(info.brand).toBe('chrome'); // normalized from Google Chrome
    expect(info.version).toBe(120); // upgraded from 117 -> 120 using HEV
  });

  it('treats iOS devices as WebKit engine', async () => {
    const ua =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1';
    defineNavigatorUA(ua);
    const info = await getBrowserInfo();
    expect(info.isIOS).toBe(true);
    expect(info.engine).toBe('webkit'); // forced to webkit for iOS
  });

  it('detects Android WebView correctly', async () => {
    const ua =
      'Mozilla/5.0 (Linux; Android 13; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.0.0 Mobile Safari/537.36';
    defineNavigatorUA(ua);
    const info = await getBrowserInfo();
    expect(info.isAndroid).toBe(true);
    expect(info.isAndroidWebView).toBe(true);
  });

  it('detects Samsung Internet flag', async () => {
    const ua =
      'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/120.0.0.0 Mobile Safari/537.36';
    defineNavigatorUA(ua);
    const info = await getBrowserInfo();
    expect(info.isSamsungInternet).toBe(true);
  });
});

describe('getBrowserDisplayName', () => {
  it('upperFirst on brand when present', () => {
    const info: BrowserInfo = {
      brand: 'firefox',
      version: 129,
      engine: 'gecko',
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      isAndroidWebView: false,
      isSamsungInternet: false,
    };
    expect(getBrowserDisplayName(info)).toBe('Firefox');
  });

  it('falls back to engine when brand unknown', () => {
    const info: BrowserInfo = {
      brand: 'unknown',
      version: 0,
      engine: 'chromium',
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      isAndroidWebView: false,
      isSamsungInternet: false,
    };
    expect(getBrowserDisplayName(info)).toBe('Chromium');
  });

  it('returns "Browser" when engine unknown and brand unknown', () => {
    const info: BrowserInfo = {
      brand: 'unknown',
      version: 0,
      engine: 'unknown',
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      isAndroidWebView: false,
      isSamsungInternet: false,
    };
    expect(getBrowserDisplayName(info)).toBe('Browser');
  });
});

describe('isBrowserSupported', () => {
  it('checks chromium desktop threshold', () => {
    const info: BrowserInfo = {
      brand: 'chrome',
      version: 108,
      engine: 'chromium',
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      isAndroidWebView: false,
      isSamsungInternet: false,
    };
    expect(isBrowserSupported(info, POLICY)).toBe(false); // 109 required
    expect(isBrowserSupported({ ...info, version: 109 }, POLICY)).toBe(true);
  });

  it('checks gecko mobile threshold', () => {
    const info: BrowserInfo = {
      brand: 'firefox',
      version: 127,
      engine: 'gecko',
      isMobile: true,
      isIOS: false,
      isAndroid: true,
      isAndroidWebView: false,
      isSamsungInternet: false,
    };
    expect(isBrowserSupported(info, POLICY)).toBe(false);
    expect(isBrowserSupported({ ...info, version: 128 }, POLICY)).toBe(true);
  });

  it('checks webkit threshold', () => {
    const info: BrowserInfo = {
      brand: 'safari',
      version: 15,
      engine: 'webkit',
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      isAndroidWebView: false,
      isSamsungInternet: false,
    };
    expect(isBrowserSupported(info, POLICY)).toBe(false);
    expect(isBrowserSupported({ ...info, version: 16 }, POLICY)).toBe(true);
  });
});
