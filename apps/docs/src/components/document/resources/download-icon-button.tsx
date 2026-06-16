'use client';
import { IconButton } from '@ogcio/design-system-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import analytics from '@/lib/analytics';
import { CheckIcon, DownloadIcon } from '@ogcio/design-system-react/icons';

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
    <a href={downloadHref} download={`${name}.svg`} onClick={handleClick}>
      <IconButton
        size="small"
        appearance="light"
        className={cn({
          'text-green-600': downloaded,
          'text-gray-600': !downloaded,
        })}
      >
        {downloaded ? <CheckIcon size={16} /> : <DownloadIcon size={16} />}
      </IconButton>
    </a>
  );
}
