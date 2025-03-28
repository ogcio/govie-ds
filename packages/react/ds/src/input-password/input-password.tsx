'use client';
import { useState } from 'react';
import { IconId } from '../icon/icon.js';
import { InputText } from '../input-text/input-text.js';
import { InputPasswordProps } from './types.js';

export const InputPassword: React.FC<InputPasswordProps> = (props) => {
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
    <InputText
      {...props}
      type={inputProps.type}
      inputActionButton={{
        icon: inputProps.icon,
        onClick: handleOnClickVisibility,
      }}
    />
  );
};
