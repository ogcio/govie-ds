import { forwardRef } from 'react';
import { cn } from '../cn.js';
import { Input } from '../primitives/input.js';
import type { InputFileProps } from './types.js';

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  ({ className, ...props }, ref) => (
    <Input
      data-testid={props.dataTestid}
      {...props}
      className={cn(
        className,
        'gi-rounded-sm xs:gi-text-md gi-text-sm gi-leading-10 xs:gi-leading-5 gi-p-[3px] gi-max-w-[100%] gi-border-transparent gi-flex-initial gi-ml-[-5px] gi-border-sm gi-border-solid gi-box-border gi-focus-state-outline gi-focus-state-border gi-z-1',
      )}
      type="file"
      multiple
      ref={ref}
    />
  ),
);

InputFile.displayName = 'InputFile';
