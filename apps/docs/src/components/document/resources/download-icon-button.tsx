'use client';
import { IconButton } from '@ogcio/design-system-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import analytics from '@/lib/analytics';

export function DownloadIconButton({
  text,
  name,
}: {
  name: string;
  text: string;
}) {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (downloaded) {
        setDownloaded(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [downloaded]);

  const handleDownload = () => {
    const safeName = name.toLowerCase().trim().replace(/\s+/g, '_');

    analytics.trackEvent({
      category: 'download content',
      action: 'click',
      name,
    });

    const blob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeName}.svg`;
    link.click();

    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <IconButton
      onClick={handleDownload}
      icon={{ icon: downloaded ? 'check' : 'download' }}
      size="small"
      appearance="light"
      className={cn({
        'text-green-600': downloaded,
        'text-gray-600': !downloaded,
      })}
    />
  );
}
