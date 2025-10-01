import { headerDividerVariants } from '../../../../variants.js';
import { useHeaderContext } from '../../../header-context.js';
import { useHeaderMenuSection } from '../header-menu-context.js';

export const HeaderMenuItemSeparator = () => {
  const context = useHeaderContext();
  const section = useHeaderMenuSection();
  if (!section || section === 'secondary') {
    throw new Error(
      'HeaderMenuItemSeparator must be used within a HeaderPrimaryMenu',
    );
  }
  const appearance = context.variant;

  return <div className={headerDividerVariants({ appearance })}></div>;
};

Object.defineProperty(HeaderMenuItemSeparator, 'componentType', {
  value: 'HeaderMenuItemSeparator',
  writable: false,
  enumerable: false,
});
