'use client';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export function Responsive({ children }: { children: React.ReactNode }) {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}
