import type { SVGProps } from 'react';

export type SvgComponentProps = SVGProps<SVGSVGElement> & {
  size?: string | number;
  title?: string;
};

export interface SpriteUseOptions {
  size?: string | number;
  className?: string;
  ariaLabel?: string;
}
