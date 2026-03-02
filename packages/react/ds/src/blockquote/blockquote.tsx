import React from 'react';

export type BlockquoteProps = React.QuoteHTMLAttributes<HTMLQuoteElement>;

/**
 * @deprecated Use `InsetText` instead. `Blockquote` is kept as an alias for backward compatibility.
 */
export function Blockquote({ children, cite, ...props }: BlockquoteProps) {
  return (
    <blockquote className="gi-blockquote" cite={cite} {...props}>
      {children}
    </blockquote>
  );
}
