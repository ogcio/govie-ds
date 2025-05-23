'use client';

import { resolveCssVariables } from '@/lib/theme-utils';
import { Button, Icon } from '@govie-ds/react';

const handleDownload = (colorMap: Record<string, Record<string, string>>) => {
  const previewStyle = resolveCssVariables(colorMap);
  const cssBlock = `:root {\n${Object.entries(previewStyle)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')}\n}`;

  const blob = new Blob([cssBlock], { type: 'text/css' });
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

  return (
    <Button onClick={() => handleDownload(colors)} className="w-fit">
      Download <Icon icon="download" />
    </Button>
  );
};
