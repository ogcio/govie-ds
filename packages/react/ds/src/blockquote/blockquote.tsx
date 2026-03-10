import React from 'react';
import { InsetText, type InsetTextProps } from '../atoms/InsetText/index.js';

export type BlockquoteProps = React.QuoteHTMLAttributes<HTMLQuoteElement>;

const toInsetTextProps = ({
  id,
  cite,
  children,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
}: BlockquoteProps): InsetTextProps => ({
  id,
  cite,
  children,
  describedBy: ariaDescribedBy,
  labelledBy: ariaLabelledBy,
});

/**
 * @deprecated Use `InsetText` instead. `Blockquote` is kept as an alias for backward compatibility.
 */
export function Blockquote(props: BlockquoteProps) {
  return <InsetText {...toInsetTextProps(props)} />;
}
