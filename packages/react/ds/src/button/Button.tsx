import { forwardRef } from 'react';
import GiButton, { type Props as GiButtonProps } from '../atoms/Button';
import type { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant,
      appearance,
      size,
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
      children,
    },
    ref,
  ) {
    return (
      <GiButton
        ref={ref}
        variant={variant}
        appearance={appearance}
        size={size}
        dataTestId={dataTestId ?? dataTestid}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        ariaDescribedBy={ariaDescribedBy}
        ariaChecked={ariaChecked as boolean | undefined}
        ariaPressed={ariaPressed as boolean | 'mixed' | undefined}
        ariaExpanded={ariaExpanded as boolean | undefined}
        ariaControls={ariaControls}
        ariaHasPopup={ariaHasPopup as GiButtonProps['ariaHasPopup']}
        ariaBusy={ariaBusy as boolean | undefined}
      >
        {children}
      </GiButton>
    );
  },
);

Button.displayName = 'Button';
Object.defineProperty(Button, 'componentType', {
  value: 'Button',
  writable: false,
  enumerable: false,
});
