'use client';
import { IconButton } from '@ogcio/design-system-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import analytics from '@/lib/analytics';

export function DownloadIconButton({
  text,
  name,
  fetchPath,
}: {
  name: string;
  text?: string;
  fetchPath?: string;
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

  const handleDownload = async () => {
    const safeName = name.toLowerCase().trim().replace(/\s+/g, '_');

    analytics.trackEvent({
      category: 'download content',
      action: 'click',
      name,
    });

    let blob: Blob;

    // If text is provided directly use it for downloading (e.g. download svg for logos).
    if (text) {
      blob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' });
    }
    // Otherwise fetch from the provided path (e.g. download svg for icons).
    else if (fetchPath) {
      try {
        const response = await fetch(fetchPath);

        if (!response.ok) {
          throw new Error('Icon not found');
        }

        blob = await response.blob();
      } catch (error) {
        console.error('Failed to fetch icon:', error);
        return;
      }
    } else {
      console.error('Either text or fetchPath must be provided');
      return;
    }

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeName}.svg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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
