import { tv } from 'tailwind-variants';
import { Show } from '@builder.io/mitosis';

export const As = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
} as const;

export const Size = {
  XL: 'xl',
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
  XXS: '2xs',
} as const;

export type Props = {
  id?: string;
  as?: (typeof As)[keyof typeof As];
  size?: (typeof Size)[keyof typeof Size];
  children: any;
  dataTestId?: string;
};

export default function Heading(props: Props) {
  return (
    <>
      <Show when={!props.as || props.as === As.H1}>
        <h1
          id={props.id}
          data-testid={props.dataTestId}
          class={styles({ size: getSize(props.as, props.size) })}
        >
          {props.children}
        </h1>
      </Show>
      <Show when={props.as === As.H2}>
        <h2
          id={props.id}
          data-testid={props.dataTestId}
          class={styles({ size: getSize(props.as, props.size) })}
        >
          {props.children}
        </h2>
      </Show>
      <Show when={props.as === As.H3}>
        <h3
          id={props.id}
          data-testid={props.dataTestId}
          class={styles({ size: getSize(props.as, props.size) })}
        >
          {props.children}
        </h3>
      </Show>
      <Show when={props.as === As.H4}>
        <h4
          id={props.id}
          data-testid={props.dataTestId}
          class={styles({ size: getSize(props.as, props.size) })}
        >
          {props.children}
        </h4>
      </Show>
      <Show when={props.as === As.H5}>
        <h5
          id={props.id}
          data-testid={props.dataTestId}
          class={styles({ size: getSize(props.as, props.size) })}
        >
          {props.children}
        </h5>
      </Show>
      <Show when={props.as === As.H6}>
        <h6
          id={props.id}
          data-testid={props.dataTestId}
          class={styles({ size: getSize(props.as, props.size) })}
        >
          {props.children}
        </h6>
      </Show>
    </>
  );
}

export const styles = tv({
  base: 'gi-font-bold gi-font-primary',
  variants: {
    size: {
      xl: 'gi-text-4xl md:gi-text-5xl xl:gi-text-6xl',
      lg: 'gi-text-2xl md:gi-text-3xl xl:gi-text-4xl',
      md: 'gi-text-lg md:gi-text-xl xl:gi-text-2xl',
      sm: 'gi-text-lg xl:gi-text-xl',
      xs: 'gi-text-md',
      '2xs': 'gi-text-sm',
    },
  },
  defaultVariants: {
    size: Size.XL,
  },
});

const defaultSizeMap = {
  [As.H1]: Size.XL,
  [As.H2]: Size.LG,
  [As.H3]: Size.MD,
  [As.H4]: Size.SM,
  [As.H5]: Size.XS,
  [As.H6]: Size.XXS,
} as const;

const getAs = (x: Props['as'] = As.H1) =>
  Object.values(As).includes(x) ? x : As.H1;

const getSize = (
  as: Props['as'],
  size: Props['size'] = defaultSizeMap[getAs(as)],
) => (Object.values(Size).includes(size) ? size : defaultSizeMap[getAs(as)]);
