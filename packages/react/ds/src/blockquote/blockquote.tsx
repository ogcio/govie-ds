import React from 'react';

export type BlockquoteProps = React.QuoteHTMLAttributes<HTMLQuoteElement>;

export function Blockquote({ children, cite, ...props }: BlockquoteProps) {
  return (
    <blockquote className="gi-blockquote" cite={cite} {...props}>
      {children}
    </blockquote>
  );
}
