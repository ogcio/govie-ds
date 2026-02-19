'use client';
import { ComponentPropsWithoutRef, forwardRef, MouseEventHandler } from 'react';
import { cn } from '../cn.js';
import { GENERATED_ICONS, type GeneratedIconId } from './generated/registry.js';
import { iconIds } from './icons.js';

export type IconId = (typeof iconIds)[number];
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = {
  icon: IconId;
  size?: IconSize;
  /** @deprecated SVG icons are outlined only. This prop is kept for backward compatibility. */
  filled?: boolean;
  disabled?: boolean;
  ariaHidden?: boolean;
  ariaLabel?: string;
  inline?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
} & Omit<ComponentPropsWithoutRef<'span'>, 'children'>;

const SIZE_MAP: Record<IconSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      icon,
      size = 'md',
      filled: _filled, // Deprecated: SVG icons are outlined only
      disabled,
      ariaHidden,
      ariaLabel,
      inline,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const fontSize = SIZE_MAP[size] ?? SIZE_MAP.md;
    const Component = GENERATED_ICONS[icon as GeneratedIconId];

    if (Component) {
      const svgClass = cn(
        { 'gi-block': !inline, 'gi-inline-block': inline },
        className,
      );

      return (
        <span
          ref={ref}
          data-testid={'govie-icon'}
          aria-hidden={ariaHidden}
          aria-label={ariaLabel}
          role={ariaLabel ? 'img' : 'presentation'}
          onClick={onClick}
          className={cn(
            { 'gi-block': !inline, 'gi-inline-block': inline },
            { 'gi-text-gray-700': disabled },
          )}
          {...props}
        >
          <Component size={fontSize} className={svgClass} />
        </span>
      );
    }

    // Fallback for icons not in the generated registry (e.g., Material Symbols)
    return (
      <span
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        data-testid={'govie-icon'}
        {...props}
        ref={ref}
        onClick={onClick}
        role={ariaLabel ? 'img' : 'presentation'}
        className={cn(
          {
            'gi-block': !inline,
            'gi-inline-block': inline,
            'gi-text-gray-700': disabled,
          },
          'material-symbols-outlined',
          className,
        )}
        style={{
          fontSize,
          ...props?.style,
        }}
      >
        {icon as string}
      </span>
    );
  },
);

export default Icon;
