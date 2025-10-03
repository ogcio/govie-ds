import { cn } from '../../../cn.js';
import { headerTitleVariants } from '../../variants.js';
import { useHeaderContext } from '../header-context.js';

export const HeaderTitle = ({ children, className }: any) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderTitle must be used within a Header');
  }

  return (
    <div
      className={cn(
        className,
        headerTitleVariants({ appearance: context.variant }),
      )}
    >
      {children}
    </div>
  );
};

Object.defineProperty(HeaderTitle, 'componentType', {
  value: 'HeaderTitle',
  writable: false,
  enumerable: false,
});
