import React from 'react';

export type BlockquoteProps = {
  children: React.ReactNode;
  cite?: string;
  ariaLabel?: string;
  dataTestid?: string;
};

export function Blockquote({
  children,
  cite,
  ariaLabel,
  dataTestid,
}: BlockquoteProps) {
  return (
    <blockquote
      data-testid={dataTestid}
      className="gi-blockquote"
      cite={cite}
      aria-label={ariaLabel}
    >
      {children}
    </blockquote>
  );
}
