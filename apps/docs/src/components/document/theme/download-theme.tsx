'use client';

import { ColorsMapProps, resolveCssVariables } from '@/lib/theme-utils';
import { Button, Icon } from '@ogcio/design-system-react';

const handleDownload = ({ colors }: ColorsMapProps) => {
  const previewStyle = resolveCssVariables(colors);
  const cssBlock = `:root {\n${Object.entries(previewStyle)
    .map(([k, v]) => `${k}: ${v};`)
    .join('\n')}\n}`;

  const blob = new Blob([cssBlock], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'theme.css';
  link.click();
  URL.revokeObjectURL(url);
};

export const DownloadTheme = ({ colors }: ColorsMapProps) => {
  if (!colors) {
    return null;
  }

  return (
    <Button onClick={() => handleDownload({ colors })} className="w-fit">
      Download <Icon icon="download" />
    </Button>
  );
};
