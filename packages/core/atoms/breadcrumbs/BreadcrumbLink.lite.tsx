import { useMetadata } from '@builder.io/mitosis';
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
  dataTestId?: string;
  onClick?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
};

export default function BreadcrumbLink(props: Props) {
  return (
    <li class={listClasses()}>
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
        data-testid={props.dataTestId}
      >
        {props.children}
      </a>
    </li>
  );
}
