'use client';
import { IconButton } from '@ogcio/design-system-react';
import copy from 'copy-text-to-clipboard';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import analytics from '@/lib/analytics';

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
      icon={{ icon: copied ? 'check' : 'content_copy' }}
      size="small"
      appearance="light"
      className={cn({ 'text-green-600': copied, 'text-gray-600': !copied })}
    />
  );
}
