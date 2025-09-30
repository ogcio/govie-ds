import { describe, it, expect } from 'vitest';
import { __test } from './runtime.js';

type BrandEntry = { brand: string; version: string };

function setUserAgent(userAgentString: string) {
  Object.defineProperty(globalThis, 'navigator', {
    value: { userAgent: userAgentString },
    writable: false,
    configurable: true,
  });
}

function setUAWithBrands(
  userAgentString: string,
  brands: BrandEntry[],
  fullVersionList?: BrandEntry[],
) {
  const userAgentData = {
    brands,
    getHighEntropyValues: async (_: string[]) => {
      return {
        fullVersionList:
          fullVersionList ??
          brands.map((b) => ({ brand: b.brand, version: b.version })),
        platform: 'Unknown',
        platformVersion: '0.0.0',
        model: '',
        architecture: 'x86',
        bitness: '64',
        uaFullVersion:
          brands.find((b) => /Chrome|Chromium/i.test(b.brand))?.version ??
          '0.0.0.0',
      };
    },
  };
  Object.defineProperty(globalThis, 'navigator', {
    value: { userAgent: userAgentString, userAgentData },
    writable: false,
    configurable: true,
  });
}

async function detect() {
  const info = await __test.getBrowserInfo();
  return { info, supported: __test.isBrowserSupported(info) };
}

describe('Browser detection', () => {
  it('Chromium desktop >= 109 is supported', async () => {
    setUAWithBrands(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.6099.71 Safari/537.36',
      [
        { brand: 'Chromium', version: '120.0.6099.71' },
        { brand: 'Google Chrome', version: '120.0.6099.71' },
      ],
    );
    const { supported, info } = await detect();
    expect(info.engine).toBe('chromium');
    expect(info.version).toBeGreaterThanOrEqual(109);
    expect(supported).toBe(true);
  });

  it('Old Chromium desktop < 109 is unsupported', async () => {
    setUAWithBrands(
      'Mozilla/5.0 AppleWebKit/537.36 Chrome/90.0.4430.212 Safari/537.36',
      [
        { brand: 'Chromium', version: '90.0.4430.212' },
        { brand: 'Google Chrome', version: '90.0.4430.212' },
      ],
    );
    const { supported } = await detect();
    expect(supported).toBe(false);
  });

  it('Firefox desktop >= 128 is supported', async () => {
    setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; rv:128.0) Gecko/20100101 Firefox/128.0',
    );
    const { supported, info } = await detect();
    expect(info.engine).toBe('gecko');
    expect(info.version).toBeGreaterThanOrEqual(128);
    expect(supported).toBe(true);
  });

  it('Firefox desktop < 128 is unsupported', async () => {
    setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; rv:110.0) Gecko/20100101 Firefox/110.0',
    );
    const { supported } = await detect();
    expect(supported).toBe(false);
  });

  it('Safari on macOS with Version/16 is supported', async () => {
    setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15',
    );
    const { supported, info } = await detect();
    expect(info.engine).toBe('webkit');
    expect(info.version).toBeGreaterThanOrEqual(16);
    expect(supported).toBe(true);
  });

  it('Safari on macOS with Version/15 is unsupported', async () => {
    setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15',
    );
    const { supported } = await detect();
    expect(supported).toBe(false);
  });

  it('iOS Safari 16+ supported, 15 unsupported', async () => {
    setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1',
    );
    const detected = await detect();
    expect(detected.supported).toBe(true);

    setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.7 Mobile/15E148 Safari/604.1',
    );
    const detected2 = await detect();
    expect(detected2.supported).toBe(false);
  });

  it('Edge (Chromium) follows Chromium floor', async () => {
    setUAWithBrands(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Edg/120.0.0.0 Chrome/120.0.6099.71 Safari/537.36',
      [
        { brand: 'Chromium', version: '120.0.6099.71' },
        { brand: 'Microsoft Edge', version: '120.0.0.0' },
      ],
    );
    const { info, supported } = await detect();
    expect(info.brand).toBe('edge');
    expect(info.engine).toBe('chromium');
    expect(supported).toBe(true);
  });

  it('Samsung Internet on Android is treated as Chromium and gated by floor', async () => {
    setUserAgent(
      'Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-G990B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
    );
    const { info, supported } = await detect();
    expect(info.engine).toBe('chromium');
    expect(info.isSamsungInternet).toBe(true);
    expect(typeof info.version).toBe('number');
    expect(supported).toBe(true);
  });

  it('Opera/Brave/Arc normalize to Chromium', async () => {
    setUAWithBrands(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.6099.71 Safari/537.36',
      [
        { brand: 'Chromium', version: '120.0.6099.71' },
        { brand: 'Brave', version: '120.0.6099.71' },
      ],
    );
    const { info, supported } = await detect();
    expect(info.engine).toBe('chromium');
    expect(info.brand === 'brave' || info.brand === 'chrome').toBe(true);
    expect(supported).toBe(true);
  });
});

describe('Parsers (unit)', () => {
  it('extracts Firefox iOS and desktop versions', () => {
    expect(__test.extractFirefoxMajorVersion('FxiOS/124.1 Mobile/15E148')).toBe(
      124,
    );
    expect(__test.extractFirefoxMajorVersion('Firefox/128.0')).toBe(128);
  });

  it('extracts Safari macOS Version/XX and iOS heuristic', () => {
    expect(
      __test.extractSafariMajorVersion('Version/16.4 Safari/605.1.15', false),
    ).toBe(16);
    expect(
      __test.extractSafariMajorVersion(
        'iPhone OS 16_5 like Mac OS X Safari',
        true,
      ),
    ).toBe(16);
  });

  it('normalizes brands names', () => {
    expect(__test.normalizeBrand('Google Chrome')).toBe('chrome');
    expect(__test.normalizeBrand('Microsoft Edge')).toBe('edge');
    expect(__test.normalizeBrand('Samsung Internet')).toBe('samsung');
  });
});
