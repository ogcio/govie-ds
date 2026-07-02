import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'gi-header-logo' } });

export type Props = {
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function HeaderLogo(props: Props) {
  return (
    <div
      id={props.id}
      class={logoStyles({ className: props.className })}
      style={props.styles}
      data-testid={props.dataTestId}
    >
      {props.children}
    </div>
  );
}

const logoStyles = tv({
  base: 'gi-flex-none gi-rounded-sm',
});
