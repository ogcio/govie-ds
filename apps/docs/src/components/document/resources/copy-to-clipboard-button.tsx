'use client';
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
        'bg-white hover:bg-gray-100 border border-gray-300 hover:border-gray-600 rounded inline-flex items-center justify-center w-[40px] h-[40px]',
        'appearance-none border-none outline-none cursor-pointer relative',
        'transition ease-in delay-50',
      )}
    >
      <Clippy
        width={20}
        height={24}
        className="text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          strokeDasharray: 50, // TODO: tailwind does not support these stroke properties, see https://github.com/tailwindlabs/tailwindcss/discussions/6089
          strokeDashoffset: copied ? -50 : 0,
          transition: 'all 300ms ease-in-out',
        }}
      />
      <Check
        width={20}
        height={24}
        className="text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          strokeDasharray: 50,
          strokeDashoffset: copied ? 0 : -50,
          transition: 'all 300ms ease-in-out',
        }}
      />
    </button>
  );
}

function Clippy({
  width,
  height,
  className,
  style,
}: {
  width: number | string;
  height: number | string;
  className?: string;
  style?: Record<string, unknown>;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M5.75 4.75H10.25V1.75H5.75V4.75Z" />
      <path d="M3.25 2.88379C2.9511 3.05669 2.75 3.37987 2.75 3.75001V13.25C2.75 13.8023 3.19772 14.25 3.75 14.25H12.25C12.8023 14.25 13.25 13.8023 13.25 13.25V3.75001C13.25 3.37987 13.0489 3.05669 12.75 2.88379" />
    </svg>
  );
}

function Check({
  width,
  height,
  className,
  style,
}: {
  width: number | string;
  height: number | string;
  className?: string;
  style?: Record<string, unknown>;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M13.25 4.75L6 12L2.75 8.75" />
    </svg>
  );
}
