'use client';
import { useState, useEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';

function ResponsiveInternal({
  title,
  styleSelector,
  children,
}: {
  title: string;
  styleSelector: string;
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

    const linkEls = window.parent.document.querySelectorAll(styleSelector);

    if (linkEls.length) {
      linkEls.forEach((el) => {
        window.document.head.appendChild(el);
      });
    }
  }, [contentRef, styleSelector]);

  return (
    <iframe title={title} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}

export function Responsive({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <link data-frame type="text/css" rel="stylesheet" href="/styles.css" />
      <ResponsiveInternal title={title} styleSelector="link[data-frame]">
        {children}
      </ResponsiveInternal>
    </Fragment>
  );
}
