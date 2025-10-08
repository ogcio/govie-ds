'use client';
import { HeaderLogoProps } from '../../types.js';
import { headerLogoVariants } from '../../variants.js';
import { useHeaderContext } from '../header-context.js';

export const HeaderLogo = ({ children }: HeaderLogoProps) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderLogo must be used within a Header');
  }

  return (
    <div className={headerLogoVariants({ appearance: context?.variant })}>
      {children}
    </div>
  );
};

Object.defineProperty(HeaderLogo, 'componentType', {
  value: 'HeaderLogo',
  writable: false,
  enumerable: false,
});
