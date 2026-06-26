import { tv } from 'tailwind-variants';

const checkboxVisualStyles = tv({
  base: [
    'gi-flex-none',
    'gi-rounded-sm',
    'gi-border-sm',
    'gi-border-solid',
    'gi-border-color-border-system-neutral-default',
    'gi-shrink-0',
  ],
  variants: {
    checked: {
      true: [
        'before:gi-block',
        'before:gi--rotate-45',
        'before:gi-relative',
        'before:gi-border-l-lg',
        'before:gi-border-b-lg',
        'before:gi-border-color-border-system-neutral-default',
        "before:gi-content-['']",
      ],
    },
    size: {
      sm: ['gi-w-6', 'gi-h-6'],
      md: ['gi-w-8', 'gi-h-8'],
    },
  },
  compoundVariants: [
    {
      checked: true,
      size: 'sm',
      className: ['before:gi-w-4', 'before:gi-h-2', 'before:gi-left-0.5', 'before:gi-top-1'],
    },
    {
      checked: true,
      size: 'md',
      className: ['before:gi-w-5', 'before:gi-h-2.5', 'before:gi-left-1', 'before:gi-top-1.5'],
    },
  ],
  defaultVariants: {
    size: 'sm',
  },
});

export type CheckboxVisualProps = {
  checked?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

export const CheckboxVisual = ({ checked, size, className }: CheckboxVisualProps) => {
  return <span aria-hidden="true" className={checkboxVisualStyles({ checked: !!checked, size, className })} />;
};
