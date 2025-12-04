'use client';
import type { BrowserInfo, RenderingEngine, SupportPolicy } from './types.js';

export const getNumberFromMatch = (match: RegExpMatchArray | null) => {
  if (match !== null) {
    return Number.parseInt(match[1], 10);
  }
  return 0;
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
} => {
  if (typeof navigator === 'undefined') {
    return {
      engine: 'unknown',
      version: 0,
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

    return {
      engine: 'chromium',
      version,
    };
  }

  const firefoxMajorVersion = extractFirefoxMajorVersion(ua);
  if (firefoxMajorVersion > 0) {
    return {
      engine: 'gecko',
      version: firefoxMajorVersion,
    };
  }

  const hasSafariToken = !!RE.safariToken.test(ua);
  const hasChromiumTokens = !!RE.chromiumTokens.test(ua);
  const isSafariLike = hasSafariToken && !hasChromiumTokens;

  if (isSafariLike) {
    return { engine: 'webkit', version: 0 };
  }

  return { engine: 'unknown', version: 0 };
};

export const getBrowserInfo = async () => {
  if (globalThis.navigator === undefined) {
    return {
      version: 0,
      engine: 'unknown',
    };
  }

  const userAgentString = globalThis.navigator?.userAgent ?? '';
  const isIOS = /iP(hone|ad|od)/i.test(userAgentString);

  const syncInfo = getEngineInfoSync();
  const engine: RenderingEngine = syncInfo.engine;
  let version = syncInfo.version;

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
    }
  }

  const effectiveEngine: RenderingEngine = isIOS ? 'webkit' : engine;

  return {
    version,
    engine: effectiveEngine,
  };
};

export const isBrowserSupported = (
  browserInfo: BrowserInfo,
  policy: SupportPolicy,
): boolean => {
  if (browserInfo.engine === 'chromium') {
    return browserInfo.version >= policy.chromium;
  }
  if (browserInfo.engine === 'gecko') {
    return browserInfo.version >= policy.gecko;
  }
  if (browserInfo.engine === 'webkit') {
    return browserInfo.version >= policy.webkit;
  }

  return false;
};

export const __test = {
  extractFirefoxMajorVersion,
  extractSafariMajorVersion,
  getEngineInfoSync,
  getNumberFromMatch,
};
