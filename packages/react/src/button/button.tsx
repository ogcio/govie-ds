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
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaChecked,
      ariaPressed,
      ariaExpanded,
      ariaControls,
      ariaHasPopup,
      ariaBusy,
      role,
      type,
      form,
      value,
      tabIndex,
      dataTestid,
      dataTestId,
      'aria-label': nativeAriaLabel,
      'aria-labelledby': nativeAriaLabelledBy,
      'aria-describedby': nativeAriaDescribedBy,
      'aria-checked': nativeAriaChecked,
      'aria-pressed': nativeAriaPressed,
      'aria-expanded': nativeAriaExpanded,
      'aria-controls': nativeAriaControls,
      'aria-haspopup': nativeAriaHasPopup,
      'aria-busy': nativeAriaBusy,
      'data-testid': nativeDataTestId,
    },
    ref,
  ) => {
    return (
      <GiButton
        ref={ref}
        id={id}
        variant={variant}
        appearance={appearance}
        size={normalizeSize(size) as GiButtonProps['size']}
        children={children}
        disabled={disabled}
        className={className}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        ariaLabel={ariaLabel ?? nativeAriaLabel}
        ariaLabelledBy={ariaLabelledBy ?? nativeAriaLabelledBy}
        ariaDescribedBy={ariaDescribedBy ?? nativeAriaDescribedBy}
        ariaChecked={(ariaChecked ?? nativeAriaChecked) as boolean | undefined}
        ariaPressed={
          (ariaPressed ?? nativeAriaPressed) as boolean | 'mixed' | undefined
        }
        ariaExpanded={
          (ariaExpanded ?? nativeAriaExpanded) as boolean | undefined
        }
        ariaControls={ariaControls ?? nativeAriaControls}
        ariaHasPopup={
          (ariaHasPopup ?? nativeAriaHasPopup) as GiButtonProps['ariaHasPopup']
        }
        ariaBusy={(ariaBusy ?? nativeAriaBusy) as boolean | undefined}
        role={role}
        type={type}
        form={form}
        value={value}
        tabIndex={tabIndex}
        dataTestId={dataTestId ?? dataTestid ?? nativeDataTestId}
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
