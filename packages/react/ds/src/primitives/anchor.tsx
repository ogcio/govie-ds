import { Slot } from '@radix-ui/react-slot';
import React from 'react';

export type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  external?: boolean;
  asChild?: boolean;
};

export const Anchor = ({
  external = false,
  asChild,
  children,
  ...props
}: React.PropsWithChildren<AnchorProps>) => {
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
