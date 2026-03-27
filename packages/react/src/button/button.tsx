import { forwardRef } from 'react';
import GiButton, { type Props as GiButtonProps } from '../atoms/Button';
import type { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      appearance,
      size,
      disabled,
      className,
      dataTestid,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-checked': ariaChecked,
      'aria-pressed': ariaPressed,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,
      'aria-haspopup': ariaHasPopup,
      'aria-busy': ariaBusy,
      'data-testid': dataTestId,
      ...props
    },
    ref,
  ) => {
    return (
      <GiButton
        ref={ref}
        disabled={disabled}
        className={className}
        variant={variant}
        appearance={appearance}
        size={size}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        ariaDescribedBy={ariaDescribedBy}
        ariaChecked={ariaChecked as boolean | undefined}
        ariaPressed={ariaPressed as boolean | 'mixed' | undefined}
        ariaExpanded={ariaExpanded as boolean | undefined}
        ariaControls={ariaControls}
        ariaHasPopup={ariaHasPopup as GiButtonProps['ariaHasPopup']}
        ariaBusy={ariaBusy as boolean | undefined}
        dataTestId={dataTestId ?? dataTestid}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
Object.defineProperty(Button, 'componentType', {
  value: 'Button',
  writable: false,
  enumerable: false,
});
