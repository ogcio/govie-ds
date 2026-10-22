import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import { getDownload } from '../utilities';
import { linkClasses } from './HeaderNavItem.styles';

useMetadata({ angular: { selector: 'core-header-nav-item-link' } });

useDefaultProps({
  download: undefined,
  ariaCurrent: undefined,
  ariaHidden: undefined,
});

export type Props = {
  children?: any;
  id?: string;
  href: string;
  className?: string;
  external?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  download?: string | boolean;
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaHidden?: boolean | 'true' | 'false';
  tabIndex?: number;
  lang?: string;
  styles?: Record<string, string>;
  onClick?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  dataTestId?: string;
};

export default function HeaderNavItemLink(props: Props) {
  return (
    <a
      id={props.id}
      href={props.href}
      class={linkClasses({ className: props.className })}
      style={props.styles}
      target={props.target ?? (props.external ? '_blank' : undefined)}
      rel={props.rel ?? (props.external ? 'noreferrer noopener' : undefined)}
      download={getDownload(props.download)}
      aria-current={props.ariaCurrent}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      aria-describedby={props.ariaDescribedBy}
      aria-hidden={props.ariaHidden}
      tabIndex={props.ariaHidden ? -1 : props.tabIndex}
      lang={props.lang}
      data-testid={props.dataTestId}
      onClick={(event) => props.onClick && props.onClick(event)}
      onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
      onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
    >
      {props.children}
    </a>
  );
}
