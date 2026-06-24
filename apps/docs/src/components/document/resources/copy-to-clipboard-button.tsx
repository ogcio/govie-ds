'use client';
import { IconButton } from '@ogcio/design-system-react';
import copy from 'copy-text-to-clipboard';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import analytics from '@/lib/analytics';
import { CheckIcon, ContentCopyIcon } from '@ogcio/design-system-react/icons';

export function CopyToClipboardButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <IconButton
      onClick={() => {
        analytics.trackEvent({
          category: 'copy content',
          action: 'click',
          name: text,
        });

        copy(text);
        setCopied(true);
      }}
      size="small"
      appearance="light"
      className={cn({ 'text-green-600': copied, 'text-gray-600': !copied })}
    >
      {copied ? <CheckIcon size={16} /> : <ContentCopyIcon size={16} />}
    </IconButton>
  );
}
