'use client';

import { TextInputWithReset } from '@govie-ds/react';
import { useState } from 'react';

export const TextInputWithResetSample = () => {
  const [value, setValue] = useState('');
  return (
    <TextInputWithReset
      placeholder="Placeholder"
      value={value}
      setValue={setValue}
    />
  );
};
