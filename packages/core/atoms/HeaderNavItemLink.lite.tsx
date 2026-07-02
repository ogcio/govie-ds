import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { clamp } from './utilities';
import { ShowItemMode } from './HeaderNavItem.lite';
import GiLink from './Link.lite';
import type { Props as LinkProps } from './Link.lite';

useMetadata({ angular: { selector: 'gi-header-nav-item-link' } });

export type Props = Pick<
  LinkProps,
  | 'href'
  | 'children'
  | 'ariaLabel'
  | 'target'
  | 'rel'
  | 'className'
  | 'styles'
  | 'id'
  | 'dataTestId'
  | 'variant'
  | 'appearance'
  | 'visited'
  | 'underline'
> & {
  showItemMode?: (typeof ShowItemMode)[keyof typeof ShowItemMode];
};

export default function HeaderNavItemLink(props: Props) {
  return (
    <li class={itemStyles({ showItemMode: getShowItemMode(props.showItemMode) })}>
      <GiLink
        href={props.href}
        id={props.id}
        className={props.className}
        styles={props.styles}
        ariaLabel={props.ariaLabel}
        target={props.target}
        rel={props.rel}
        variant={props.variant}
        appearance={props.appearance}
        visited={props.visited}
        underline={props.underline}
        dataTestId={props.dataTestId}
      >
        {props.children}
      </GiLink>
    </li>
  );
}

const getShowItemMode = (x: Props['showItemMode']) => clamp(x, ShowItemMode, ShowItemMode.ALWAYS);

const itemStyles = tv({
  base: '',
  variants: {
    showItemMode: {
      always: '',
      'desktop-only': 'gi-hidden lg:gi-flex',
      'mobile-only': 'gi-flex lg:gi-hidden',
    },
  },
  defaultVariants: {
    showItemMode: 'always',
  },
});
