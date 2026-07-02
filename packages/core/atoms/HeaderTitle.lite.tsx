import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'gi-header-title' } });

export type Props = {
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function HeaderTitle(props: Props) {
  return (
    <div
      id={props.id}
      class={titleStyles({ className: props.className })}
      style={props.styles}
      data-testid={props.dataTestId}
    >
      {props.children}
    </div>
  );
}

const titleStyles = tv({
  base: 'gi-min-w-0 gi-heading-sm gi-truncate gi-overflow-hidden gi-text-ellipsis gi-ml-4 md:gi-ml-6 lg:gi-ml-12 gi-grow',
});
