import CoreContainer from '../atoms/Container.js';
import type { Props as CoreContainerProps } from '../atoms/Container.js';

/** @deprecated Use the Container component from the core package instead. */
export function Container({
  children,
  id,
  insetBottom,
  insetTop,
  className,
  fullWidth,
}: CoreContainerProps) {
  return (
    <CoreContainer
      id={id}
      insetTop={insetTop}
      insetBottom={insetBottom}
      className={className}
      fullWidth={fullWidth}
    >
      {children}
    </CoreContainer>
  );
}
