'use client';
import { Icon } from '@govie-ds/react';
import copy from 'copy-text-to-clipboard';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

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
    <button
      onClick={() => {
        copy(text);
        setCopied(true);
      }}
      className={cn(
        'inline',
        'bg-white hover:bg-gray-100 border border-gray-300 hover:border-gray-600 rounded items-center justify-center w-4 h-3',
        'appearance-none border-none outline-none cursor-pointer relative',
        'transition ease-in delay-50',
      )}
    >
      <Clippy
        className={cn(
          'text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
          copied ? 'hidden' : 'block',
        )}
      />
      <Check
        className={cn(
          'text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
          copied ? 'block' : 'hidden',
        )}
      />
    </button>
  );
}

function Clippy({ className }: { className?: string }) {
  return <Icon icon="content_copy" size="sm" className={className} />;
}

function Check({ className }: { className?: string }) {
  return <Icon icon="check" size="sm" className={className} />;
}
