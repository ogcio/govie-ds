'use client';
import { useState } from 'react';
import { IconId } from '../icon/icon.js';
import { TextInput, TextInputProps } from '../text-input/text-input.js';

export type TextInputPasswordProps = Omit<
  TextInputProps,
  'type' | 'inputActionButton' | 'prefix' | 'suffix' | 'iconStart' | 'iconEnd'
>;

export const TextInputPassword = (props: TextInputPasswordProps) => {
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

  return (
    <TextInput
      {...props}
      type={inputProps.type}
      inputActionButton={{
        icon: inputProps.icon,
        onClick: handleOnClickVisibility,
      }}
    />
  );
};
