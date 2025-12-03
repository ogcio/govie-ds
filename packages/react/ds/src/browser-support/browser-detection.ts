'use client';
import upperFirst from 'lodash/upperFirst.js';
import type { BrowserInfo, RenderingEngine, SupportPolicy } from './types.js';

export const getNumberFromMatch = (match: RegExpMatchArray | null) => {
  if (match !== null) {
    return Number.parseInt(match[1], 10);
  }
  return 0;
};

export const normalizeBrand = (rawBrand: string) => {
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
};

export const extractFirefoxMajorVersion = (userAgentString: string) => {
  const iosFirefoxMatch = /FxiOS\/(\d+)/.exec(userAgentString);
  const desktopFirefoxMatch = /Firefox\/(\d+)/.exec(userAgentString);
  const iosVersion = getNumberFromMatch(iosFirefoxMatch);
  if (iosVersion) {
    return iosVersion;
  }
  return getNumberFromMatch(desktopFirefoxMatch);
};

export const extractSafariMajorVersion = (
  userAgentString: string,
  isIOS: boolean,
) => {
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
};

export const getChromiumBrandFromMatches = (flags: {
  [key: string]: RegExpMatchArray | null;
}) => {
  if (flags.edgeMatch) {
    return 'edge';
  }
  if (flags.operaMatch) {
    return 'opera';
  }
  if (flags.hasVivaldi) {
    return 'vivaldi';
  }
  if (flags.yandexMatch) {
    return 'yandex';
  }
  if (flags.whaleMatch) {
    return 'whale';
  }
  if (flags.braveMatch) {
    return 'brave';
  }
  if (flags.arcMatch) {
    return 'arc';
  }
  if (flags.samsungMatch) {
    return 'samsung';
  }
  return 'chrome';
};

export const getHighEntropy = async (
  initialBrandEntries?: Array<{ brand: string; version: string }>,
) => {
  try {
    const navigatorAny = navigator as any;
    const highEntropyValues =
      await navigatorAny?.userAgentData?.getHighEntropyValues([
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
    return { ok: true, ...highEntropyValues, fullVersionList };
  } catch (error) {
    console.error('[browser-support] failed to get user-agent info', error);
  }
  return { ok: false };
};

export const getEngineInfoSync = (): {
  engine: RenderingEngine;
  version: number;
  brand: string;
  isSamsung: boolean;
} => {
  if (typeof navigator === 'undefined') {
    return {
      engine: 'unknown',
      version: 0,
      brand: 'unknown',
      isSamsung: false,
    };
  }

  const ua: string = (globalThis.navigator as any)?.userAgent ?? '';

  const RE = {
    edge: /Edg\/(\d+)/,
    opera: /OPR\/(\d+)/,
    vivaldi: /Vivaldi/i,
    yandex: /YaBrowser\/(\d+)/i,
    whale: /Whale\/(\d+)/i,
    brave: /Brave\/(\d+)/i,
    arc: /Arc\/(\d+)/i,
    samsung: /SamsungBrowser\/(\d+)/i,
    chrome: /Chrome\/(\d+)/,
    safariToken: /Safari\//,
    chromiumTokens: /Chrome|Chromium|CriOS|Edg|OPR|SamsungBrowser/i,
  } as const;

  const mEdge = RE.edge.exec(ua);
  const mOpera = RE.opera.exec(ua);
  const mVivaldi = RE.vivaldi.exec(ua);
  const mYandex = RE.yandex.exec(ua);
  const mWhale = RE.whale.exec(ua);
  const mBrave = RE.brave.exec(ua);
  const mArc = RE.arc.exec(ua);
  const mSamsung = RE.samsung.exec(ua);
  const mChrome = RE.chrome.exec(ua);

  const isChromiumFamily =
    !!mEdge ||
    !!mOpera ||
    !!mVivaldi ||
    !!mYandex ||
    !!mWhale ||
    !!mBrave ||
    !!mArc ||
    !!mSamsung ||
    !!mChrome;

  if (isChromiumFamily) {
    const version =
      getNumberFromMatch(mChrome) ||
      getNumberFromMatch(mEdge) ||
      getNumberFromMatch(mOpera) ||
      getNumberFromMatch(mYandex) ||
      getNumberFromMatch(mWhale) ||
      getNumberFromMatch(mBrave) ||
      getNumberFromMatch(mArc) ||
      0;

    const brand = getChromiumBrandFromMatches({
      edgeMatch: mEdge,
      operaMatch: mOpera,
      hasVivaldi: mVivaldi,
      yandexMatch: mYandex,
      whaleMatch: mWhale,
      braveMatch: mBrave,
      arcMatch: mArc,
      samsungMatch: mSamsung,
    });

    return {
      engine: 'chromium',
      version,
      brand,
      isSamsung: !!mSamsung,
    };
  }

  const firefoxMajorVersion = extractFirefoxMajorVersion(ua);
  if (firefoxMajorVersion > 0) {
    return {
      engine: 'gecko',
      version: firefoxMajorVersion,
      brand: 'firefox',
      isSamsung: false,
    };
  }

  const hasSafariToken = !!RE.safariToken.test(ua);
  const hasChromiumTokens = !!RE.chromiumTokens.test(ua);
  const isSafariLike = hasSafariToken && !hasChromiumTokens;

  if (isSafariLike) {
    return { engine: 'webkit', version: 0, brand: 'safari', isSamsung: false };
  }

  return { engine: 'unknown', version: 0, brand: 'unknown', isSamsung: false };
};

export const getBrowserInfo = async () => {
  if (globalThis.navigator === undefined) {
    return {
      brand: 'unknown',
      version: 0,
      engine: 'unknown',
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      isAndroidWebView: false,
      isSamsungInternet: false,
    };
  }

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
      const chromiumEntry = highEntropy.fullVersionList.find((entry: any) => {
        return /Chromium|Chrome/i.test(entry.brand);
      });

      if (chromiumEntry?.version) {
        const major = Number.parseInt(
          String(chromiumEntry.version).split('.')[0] ?? `${version}`,
          10,
        );
        if (Number.isFinite(major)) {
          version = major;
        }
      }

      const nicerBrand = highEntropy.fullVersionList.find((entry: any) => {
        return /(edge|opera|vivaldi|brave|arc|samsung|yabrowser|whale|google chrome)/i.test(
          entry.brand,
        );
      })?.brand;

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
    /SamsungBrowser\/\d+/i.test(userAgentString) || Boolean(syncInfo.isSamsung);

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
};

export const getBrowserDisplayName = (browserInfo: BrowserInfo) => {
  if (browserInfo.brand.length > 0 && browserInfo.brand !== 'unknown') {
    return upperFirst(browserInfo.brand);
  }
  if (browserInfo.engine === 'unknown') {
    return 'Browser';
  }
  return upperFirst(browserInfo.engine);
};

export const isBrowserSupported = (
  browserInfo: BrowserInfo,
  policy: SupportPolicy,
): boolean => {
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
};

export const __test = {
  extractFirefoxMajorVersion,
  extractSafariMajorVersion,
  normalizeBrand,
  getEngineInfoSync,
  getNumberFromMatch,
  getChromiumBrandFromMatches,
};
