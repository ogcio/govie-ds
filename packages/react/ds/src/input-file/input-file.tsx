import React from 'react';
import { cn } from '../cn.js';
import { Input } from '../primitives/input.js';
import type { InputFileProps } from './types.js';

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({ className, ...props }, ref) => (
    <Input
      {...props}
      className={cn(className, 'gi-input-file')}
      type="file"
      multiple
      ref={ref}
    />
  ),
);

InputFile.displayName = 'InputFile';
