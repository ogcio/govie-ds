'use client';
import { IconButton } from '@ogcio/design-system-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import analytics from '@/lib/analytics';

type SvgIcon = {
  name: string;
  href: string;
  text?: never;
};

type TextIcon = {
  name: string;
  text: string;
  href?: never;
};

export function DownloadIconButton({ name, href, text }: SvgIcon | TextIcon) {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (downloaded) {
        setDownloaded(false);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [downloaded]);

  const safeName = name.toLowerCase().trim().replace(/\s+/g, '_');

  const handleClick = () => {
    analytics.trackEvent({
      category: 'download content',
      action: 'click',
      name,
    });
    setDownloaded(true);
  };

  const downloadHref = text
    ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`
    : href || '';

  return (
    <a href={downloadHref} download={`${safeName}.svg`} onClick={handleClick}>
      <IconButton
        icon={{ icon: downloaded ? 'check' : 'download' }}
        size="small"
        appearance="light"
        className={cn({
          'text-green-600': downloaded,
          'text-gray-600': !downloaded,
        })}
      />
    </a>
  );
}
