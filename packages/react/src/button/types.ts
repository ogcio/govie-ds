import * as React from 'react';
import type { Props as GiButtonProps } from '../atoms/Button.js';

export const ButtonVariants = ['primary', 'secondary', 'flat'] as const;
export type ButtonVariant = (typeof ButtonVariants)[number];

export type ButtonAppearance = 'default' | 'dark' | 'light';

export type ButtonSize = 'medium' | 'small' | 'large';

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
  | 'aria-checked'
  | 'aria-pressed'
  | 'aria-expanded'
  | 'aria-controls'
  | 'aria-haspopup'
  | 'aria-busy'
> &
  GiButtonProps & {
    /** @deprecated Use dataTestId instead */
    dataTestid?: string;
    /** @deprecated Use dataTestId instead */
    'data-testid'?: string;
    /** @deprecated Use ariaLabel instead */
    'aria-label'?: string;
    /** @deprecated Use ariaLabelledBy instead */
    'aria-labelledby'?: string;
    /** @deprecated Use ariaDescribedBy instead */
    'aria-describedby'?: string;
    /** @deprecated Use ariaChecked instead */
    'aria-checked'?: boolean | 'true' | 'false' | 'mixed';
    /** @deprecated Use ariaPressed instead */
    'aria-pressed'?: boolean | 'true' | 'false' | 'mixed';
    /** @deprecated Use ariaExpanded instead */
    'aria-expanded'?: boolean | 'true' | 'false';
    /** @deprecated Use ariaControls instead */
    'aria-controls'?: string;
    /** @deprecated Use ariaHasPopup instead */
    'aria-haspopup'?:
      | boolean
      | 'true'
      | 'false'
      | 'menu'
      | 'listbox'
      | 'tree'
      | 'grid'
      | 'dialog';
    /** @deprecated Use ariaBusy instead */
    'aria-busy'?: boolean | 'true' | 'false';
  };
