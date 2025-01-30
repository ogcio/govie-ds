import React from 'react';

export type BlockquoteProps = {
  children: React.ReactNode;
  cite?: string;
  ariaLabel?: string;
};

export function Blockquote({ children, cite, ariaLabel }: BlockquoteProps) {
  return (
    <blockquote className="gi-blockquote" cite={cite} aria-label={ariaLabel}>
      {children}
    </blockquote>
  );
}
