import { forwardRef } from 'react';
import GiButton, { type Props as GiButtonProps } from '../atoms/Button';
import { normalizeSize } from '../utils/normalize-size.js';
import type { ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      id,
      variant,
      appearance,
      size,
      children,
      disabled,
      className,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      role,
      type,
      form,
      value,
      tabIndex,
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
    },
    ref,
  ) => {
    return (
      <GiButton
        ref={ref}
        id={id}
        variant={variant}
        appearance={appearance}
        size={normalizeSize(size)}
        children={children}
        disabled={disabled}
        className={className}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        ariaDescribedBy={ariaDescribedBy}
        ariaChecked={ariaChecked as boolean | undefined}
        ariaPressed={ariaPressed as boolean | 'mixed' | undefined}
        ariaExpanded={ariaExpanded as boolean | undefined}
        ariaControls={ariaControls}
        ariaHasPopup={ariaHasPopup as GiButtonProps['ariaHasPopup']}
        ariaBusy={ariaBusy as boolean | undefined}
        role={role}
        type={type}
        form={form}
        value={value}
        tabIndex={tabIndex}
        dataTestId={dataTestId ?? dataTestid}
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
