import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import listClasses, { linkClasses } from './BreadcrumbLink.styles';

useMetadata({ angular: { selector: 'gi-breadcrumb-link' } });

export type Props = {
  id?: string;
  children?: any;
  href: string;
  current?: boolean;
  className?: string;
  styles?: Record<string, string>;
  ariaLabel?: string;
  ariaHidden?: boolean;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  dataTestId?: string;
  onClick?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
};

useDefaultProps({
  ariaHidden: undefined,
});

export default function BreadcrumbLink(props: Props) {
  return (
    <li class={listClasses()} aria-hidden={props.ariaHidden}>
      <a
        id={props.id}
        href={props.href}
        class={linkClasses({ className: props.className })}
        style={props.styles}
        onClick={(event) => props.onClick && props.onClick(event)}
        onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
        onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
        aria-current={props.current ? 'page' : undefined}
        aria-label={props.ariaLabel}
        aria-labelledby={props.ariaLabelledBy}
        aria-describedby={props.ariaDescribedBy}
        data-testid={props.dataTestId}
      >
        {props.children}
      </a>
    </li>
  );
}
