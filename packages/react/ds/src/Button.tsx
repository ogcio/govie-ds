/*
 * Wrapper around the core GiButton atom.
 * Accepts the legacy ButtonProps interface and maps attributes to the props expected by GiButton.
 */
'use client';
import { forwardRef } from 'react';
import GiButton, { type Props as GiButtonProps } from './atoms/Button';
import type { ButtonProps } from './button/types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
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
    ...rest
  },
  ref,
) {
  return (
    <GiButton
      ref={ref}
      variant={variant as GiButtonProps['variant']}
      appearance={appearance as GiButtonProps['appearance']}
      size={size}
      dataTestId={dataTestId ?? dataTestid}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      ariaDescribedBy={ariaDescribedBy}
      ariaControls={ariaControls}
      ariaChecked={ariaChecked as boolean | undefined}
      ariaExpanded={ariaExpanded as boolean | undefined}
      ariaBusy={ariaBusy as boolean | undefined}
      ariaPressed={ariaPressed as GiButtonProps['ariaPressed']}
      ariaHasPopup={ariaHasPopup as GiButtonProps['ariaHasPopup']}
      {...(rest as GiButtonProps)}
    />
  );
});

export default Button;
