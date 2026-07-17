import { useMetadata } from '@builder.io/mitosis';
import { getVisibility, classes } from './HeaderNavItem.styles';
import type { VisibleValue } from './HeaderNavItem.styles';
import GiLink from '../Link.lite';
import type { Props as LinkProps } from '../Link.lite';

useMetadata({ angular: { selector: 'gi-header-nav-item-link' } });

// `onFocus`/`onBlur` omitted: Mitosis forwards a wrapper's handlers as native listeners on the child host (`<gi-link>`),
// where focus/blur don't bubble, so they never fire in Angular.
export type Props = Omit<LinkProps, 'onFocus' | 'onBlur'> & {
  /** Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`. */
  visible?: VisibleValue;
};

export default function HeaderNavItemLink(props: Props) {
  return (
    <li class={getVisibility(props.visible)}>
      <GiLink
        id={props.id}
        href={props.href}
        className={classes({ className: ['gi-header-nav-item-link', props.className] })}
        styles={props.styles}
        variant={props.variant}
        underline={props.underline}
        appearance={getAppearance(props.appearance)}
        visited={props.visited}
        external={props.external}
        target={props.target}
        rel={props.rel}
        download={props.download}
        ariaCurrent={props.ariaCurrent}
        ariaLabel={props.ariaLabel}
        ariaLabelledBy={props.ariaLabelledBy}
        ariaDescribedBy={props.ariaDescribedBy}
        ariaHidden={props.ariaHidden}
        tabIndex={props.tabIndex}
        lang={props.lang}
        dataTestId={props.dataTestId}
        onClick={(event) => props.onClick && props.onClick(event)}
        onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
        onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      >
        {props.children}
      </GiLink>
    </li>
  );
}

const getAppearance = (x: Props['appearance']) => x || 'inherit';
