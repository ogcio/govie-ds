'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function IFrame({
  title,
  width,
  height,
  styleSelector,
  children,
}: {
  title: string;
  width?: string | number;
  height?: string | number;
  styleSelector?: string;
  children: React.ReactNode;
}) {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const mountNode = contentRef?.contentWindow?.document.body;

  useEffect(() => {
    if (!contentRef) {
      return;
    }

    const window = contentRef?.contentWindow;

    if (!window) {
      throw new Error('contentWindow is not available.');
    }

    if (!styleSelector) {
      return;
    }

    const linkElements = window.parent.document.querySelectorAll(styleSelector);

    linkElements.forEach((linkElement) => {
      window.document.head.appendChild(linkElement);
    });
  }, [contentRef, styleSelector]);

  return (
    <iframe
      title={title}
      width={typeof width === 'number' ? `${width}px` : width}
      height={typeof height === 'number' ? `${height}px` : height}
      ref={setContentRef}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}
