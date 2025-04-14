import { Slot } from '@radix-ui/react-slot';
import React from 'react';

export type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  external?: boolean;
  asChild?: boolean;
};

const Anchor = ({
  external = false,
  asChild,
  children,
  ...props
}: AnchorProps) => {
  const externalProps = external && {
    target: '_blank',
    rel: 'noreferrer noopener',
  };

  const Component = asChild ? Slot : 'a';

  return (
    <Component {...props} {...externalProps}>
      {children}
    </Component>
  );
};

export default Anchor;
