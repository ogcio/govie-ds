'use client';

import { Link } from '../../../link/link.js';
import type {
  HeaderAppearance as Appearance,
  HeaderTitleProps,
} from '../../types.js';
import { headerTitleVariants } from '../../variants.js';
import { useHeaderContext } from '../header-context.js';

const altTheme: Record<Appearance, Appearance> = {
  default: 'light',
  light: 'default',
};

export const HeaderTitle = ({
  children,
  href,
  className,
}: HeaderTitleProps) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderTitle must be used within a Header');
  }
  return (
    <div
      className={headerTitleVariants({
        appearance: context.variant,
        isLink: !!href,
        className,
      })}
    >
      {href ? (
        <Link
          appearance={altTheme[context.variant]}
          href={href}
          // the !important is necessary until link has inline-tailwind support, as gi-link overrides any styles passed here
          className="gi-truncate gi-py-1 gi-max-w-fit !gi-block !gi-w-full"
        >
          {children}
        </Link>
      ) : (
        children
      )}
    </div>
  );
};

Object.defineProperty(HeaderTitle, 'componentType', {
  value: 'HeaderTitle',
  writable: false,
  enumerable: false,
});
