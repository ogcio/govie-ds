'use client';

import { Button, Icon } from '@govie-ds/react';
import tinycolor from 'tinycolor2';

const TAILWIND_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const LIGHTNESS_MAP: any = {
  50: 95,
  100: 90,
  200: 80,
  300: 70,
  400: 60,
  500: 50,
  600: 40,
  700: 30,
  800: 20,
  900: 10,
  950: 5,
};

const generateShades = (
  name: string,
  baseHex: string,
): Record<string, Record<number, string>> => {
  const baseColor = tinycolor(baseHex).toHsl();

  const shades = TAILWIND_SHADES.reduce(
    (acc, shade) => {
      if (shade === 800) {
        acc[shade] = baseHex;
      } else {
        const modified = { ...baseColor, l: LIGHTNESS_MAP[shade] / 100 };
        acc[shade] = tinycolor(modified).toHexString();
      }
      return acc;
    },
    {} as Record<number, string>,
  );

  return { [name]: shades };
};

const handleDownload = (colorMap: Record<string, Record<string, string>>) => {
  const cssLines = [':root {'];

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = sheet.cssRules || [];
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
          for (const styleName of rule.style) {
            const value = rule.style.getPropertyValue(styleName).trim();
            const match = styleName.match(
              /--gieds-color-([a-zA-Z0-9-]+)-(\d{2,3})/,
            );
            if (match) {
              const [, key, shade] = match;
              const replacement = colorMap[key]?.[shade];
              if (replacement) {
                cssLines.push(`${styleName}: ${replacement};`);
                continue;
              }
            }
            cssLines.push(`${styleName}: ${value};`);
          }
        }
      }
    } catch {
      continue;
    }
  }
  cssLines.push('}');
  const cssContent = cssLines.join('\n');
  const blob = new Blob([cssContent], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'theme.css';
  link.click();
  URL.revokeObjectURL(url);
};

export const DownloadTheme = ({ colors }: any) => {
  if (!colors) {
    return null;
  }

  const generated = Object.entries(colors).reduce(
    (acc, [key, baseHex]: any) => ({ ...acc, ...generateShades(key, baseHex) }),
    {},
  );

  return (
    <Button onClick={() => handleDownload(generated)} className="w-fit">
      Download <Icon icon="download" />
    </Button>
  );
};
