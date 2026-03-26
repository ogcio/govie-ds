'use client';
import React, { useState, forwardRef } from 'react';
import { IconId } from '../icon/icon.js';
import { InputText } from '../input-text/input-text.js';
import { InputPasswordProps } from './types.js';

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref) => {
    const [inputProps, setInputProps] = useState<{
      type: 'password' | 'text';
      icon: IconId;
    }>({
      icon: 'visibility',
      type: 'password',
    });

    const handleOnClickVisibility = () => {
      const isVisible = inputProps.type === 'text';
      setInputProps({
        type: isVisible ? 'password' : 'text',
        icon: isVisible ? 'visibility' : 'visibility_off',
      });
    };

    // TODO: i18n for the button aria-label
    return (
      <InputText
        {...props}
        type={inputProps.type}
        inputActionButton={{
          icon: inputProps.icon,
          onClick: handleOnClickVisibility,
          ariaLabel: inputProps.type === 'text' ? 'show' : 'hide',
        }}
        ref={ref}
      />
    );
  },
);

InputPassword.displayName = 'InputPassword';
