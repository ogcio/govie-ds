import { tv } from 'tailwind-variants';

const formFieldErrorDescendantClasses = [
  `[&_input[type='text']]:gi-border-color-border-intent-error-default [&_input[type='text']]:gi-focus-visible-state-border`,
  `[&_input[type='password']]:gi-border-color-border-intent-error-default [&_input[type='password']]:gi-focus-visible-state-border`,
  `[&_input[type='email']]:gi-border-color-border-intent-error-default [&_input[type='email']]:gi-focus-visible-state-border`,
  `[&_input[type='number']]:gi-border-color-border-intent-error-default [&_input[type='number']]:gi-focus-visible-state-border`,
  `[&_input[type='tel']]:gi-border-color-border-intent-error-default [&_input[type='tel']]:gi-focus-visible-state-border`,
  `[&_input[type='url']]:gi-border-color-border-intent-error-default [&_input[type='url']]:gi-focus-visible-state-border`,
  `[&_input[type='search']]:gi-border-color-border-intent-error-default [&_input[type='search']]:gi-focus-visible-state-border`,
  `[&_input[type='date']]:gi-border-color-border-intent-error-default [&_input[type='date']]:gi-focus-visible-state-border`,
  `[&_input[type='datetime-local']]:gi-border-color-border-intent-error-default [&_input[type='datetime-local']]:gi-focus-visible-state-border`,
  `[&_input[type='color']]:gi-border-color-border-intent-error-default [&_input[type='color']]:gi-focus-visible-state-border`,
  `[&_input[type='file']]:gi-border-color-border-intent-error-default [&_input[type='file']]:gi-focus-visible-state-border`,
  `[&_input[type='range']]:gi-border-color-border-intent-error-default [&_input[type='range']]:gi-focus-visible-state-border`,
  '[&_select]:gi-border-color-border-intent-error-default [&_select]:gi-focus-visible-state-border',
  '[&_textarea]:gi-border-color-border-intent-error-default [&_textarea]:gi-focus-visible-state-border',
].join(' ');

const formFieldStyles = tv({
  base: '',
  variants: {
    error: {
      true: [
        'gi-pl-4 gi-border-solid gi-border-l-lg gi-border-color-border-intent-error-default',
        formFieldErrorDescendantClasses,
      ],
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
});

export default formFieldStyles;
