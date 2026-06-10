import { tv } from 'tailwind-variants';
import { useMetadata } from '@builder.io/mitosis';
import { buttonBaseStyles, ButtonSize, buttonSizeVariants, getSize, getVariant, getAppearance } from './Button.lite';
import type { Props as ButtonProps } from './Button.lite';
import type { Props as LinkProps } from './Link.lite';

useMetadata({ angular: { selector: 'gi-link-button' } });

export type Props = Omit<LinkProps, 'variant' | 'appearance' | 'underline' | 'visited'> &
  Pick<ButtonProps, 'variant' | 'appearance' | 'size'>;

export default function LinkButton(props: Props) {
  return (
    <a
      id={props.id}
      href={props.href}
      class={linkButtonStyles({
        variant: getVariant(props.variant),
        appearance: getAppearance(props.appearance),
        size: getSize(props.size),
        class: props.className,
      })}
      style={props.styles}
      target={props.target ?? (props.external ? '_blank' : undefined)}
      rel={props.rel ?? (props.external ? 'noreferrer noopener' : undefined)}
      download={props.download}
      aria-current={props.ariaCurrent}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      aria-describedby={props.ariaDescribedBy}
      aria-hidden={props.ariaHidden}
      tabIndex={props.ariaHidden ? -1 : props.tabIndex}
      lang={props.lang}
      onClick={(event) => props.onClick && props.onClick(event)}
      onFocus={(event) => props.onFocus && props.onFocus(event)}
      onBlur={(event) => props.onBlur && props.onBlur(event)}
      onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
      onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      data-testid={props.dataTestId}
    >
      {props.children}
    </a>
  );
}

export const linkButtonStyles = tv({
  extend: buttonBaseStyles,
  base: ['gi-gap-2', 'gi-no-underline', 'hover:gi-no-underline'],
  variants: {
    size: buttonSizeVariants,
  },
  defaultVariants: {
    size: ButtonSize.MD,
  },
});
