'use client';
import { IconButton } from '@ogcio/design-system-react';
import type { IconProps } from '@ogcio/design-system-react/icons';
import { useEffect, useState } from 'react';
import type { ComponentType, MouseEvent } from 'react';
import { cn } from '@/lib/cn';
import analytics from '@/lib/analytics';
import { CheckIcon, DownloadIcon } from '@ogcio/design-system-react/icons';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

type SvgIcon = {
  name: string;
  href: string;
  text?: never;
  IconComponent?: never;
};

type TextIcon = {
  name: string;
  text: string;
  href?: never;
  IconComponent?: never;
};

type SourceIcon = {
  IconComponent: ComponentType<IconProps>;
  name: string;
  href?: never;
  text?: never;
};

const encodedSvgURL = (text: string) => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(text)}`;
};

const getSvgUri = (Icon: ComponentType<IconProps>) => {
  const iconContainer = document.createElement('div');
  const root = createRoot(iconContainer);
  flushSync(() => {
    root.render(<Icon size={48} />);
  });
  const svgUrl = encodedSvgURL(iconContainer.innerHTML);
  root.unmount();
  return svgUrl;
};

export function DownloadIconButton({
  name,
  href,
  text,
  IconComponent,
}: SvgIcon | TextIcon | SourceIcon) {
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
    const link = document.createElement('a');
    link.download = `${name}.svg`;
    if (text) {
      link.href = encodedSvgURL(text);
    } else if (href) {
      link.href = href;
    } else if (IconComponent !== undefined) {
      link.href = getSvgUri(IconComponent);
    }
    link.click();

    analytics.trackEvent({
      category: 'download content',
      action: 'click',
      name,
    });
    setDownloaded(true);
  };
  return (
    <IconButton
      onClick={handleClick}
      size="small"
      appearance="light"
      className={cn({
        'text-green-600': downloaded,
        'text-gray-600': !downloaded,
      })}
    >
      {downloaded ? (
        <CheckIcon label="downloaded" />
      ) : (
        <DownloadIcon label="download" />
      )}
    </IconButton>
  );
}
