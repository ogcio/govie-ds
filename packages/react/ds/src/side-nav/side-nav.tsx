import { cn } from '../cn.js';
import { SideNavProps } from './types.js';

export const SideNav = ({ children, className, dataTestid }: SideNavProps) => {
  return (
    <div
      className={cn('gi-side-nav-container', className)}
      data-testid={dataTestid}
    >
      {children}
    </div>
  );
};
