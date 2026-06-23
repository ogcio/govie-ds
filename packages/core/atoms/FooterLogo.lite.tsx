import { Show, useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import Box from './Box.lite';

useMetadata({ angular: { selector: 'gi-footer-logo' } });

type Props = {
  children: any;
  href?: string;
  id?: string;

  className?: string;
  dataTestId?: string;
  ariaLabel?: string;
};

export default function FooterLogo(props: Readonly<Props>) {
  if (props.href) {
    return (
      <a
        href={props.href}
        id={props.id}
        className={footerLogoStyles({ asLink: true, class: props.className })}
        aria-label={props.ariaLabel}
        data-testid={props.dataTestId}
      >
        {props.children}
      </a>
    );
  }
  return (
    <Show
      when={props.href}
      else={
        <Box
          id={props.id}
          className={footerLogoStyles({ asLink: false, class: props.className })}
          data-testid={props.dataTestId}
        >
          {props.children}
        </Box>
      }
    >
      <a
        href={props.href}
        id={props.id}
        className={footerLogoStyles({ asLink: true, class: props.className })}
        aria-label={props.ariaLabel}
        data-testid={props.dataTestId}
      >
        {props.children}
      </a>
    </Show>
  );
}

const footerLogoStyles = tv({
  base: 'gi-min-w-fit md:gi-ml-auto md:gi-mt-0',
  variants: {
    asLink: {
      true: [
        'focus:gi-rounded-sm',
        'focus:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
        'focus-visible:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
        'focus-visible:gi-outline-none',
        'focus-visible:gi-rounded-sm',
      ],
      false: '',
    },
  },
});
