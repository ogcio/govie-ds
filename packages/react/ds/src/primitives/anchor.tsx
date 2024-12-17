import React from 'react';

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  external?: boolean; // Se `true`, indica un link esterno
};

const Anchor = ({
  external = false,
  children,
  ...props
}: React.PropsWithChildren<AnchorProps>) => {
  const externalProps = external && {
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  return (
    <a {...props} {...externalProps}>
      {children}
    </a>
  );
};

export default Anchor;
