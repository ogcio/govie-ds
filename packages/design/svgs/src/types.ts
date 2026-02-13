import type { SVGProps } from 'react';

export type SvgComponentProps = SVGProps<SVGSVGElement> & {
  size?: string | number;
  title?: string;
};

export interface GetSvgOptions {
  size?: string | number;
  className?: string;
  fill?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
}
