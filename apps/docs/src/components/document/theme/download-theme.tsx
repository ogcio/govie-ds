'use client';

import { Button } from '@govie-ds/react';

const handleDownload = () => {
  const cssLines = [':root {'];

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = sheet.cssRules || [];
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
          for (const styleName of rule.style) {
            if (
              styleName.includes('--gieds-color-') &&
              !rule.style.getPropertyValue(styleName).includes('var(')
            ) {
              const value = rule.style.getPropertyValue(styleName).trim();
              cssLines.push(`  ${styleName}: ${value};`);
            }
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
  link.download = 'theme.colors.css';
  link.click();
  URL.revokeObjectURL(url);
};

export const DownloadTheme = () => {
  return <Button onClick={handleDownload}>Download</Button>;
};
