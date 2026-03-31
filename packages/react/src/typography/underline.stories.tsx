import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import { Link } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';

const meta = {
  title: 'Typography/Underline',
  parameters: {
    docs: {
      description: {
        component:
          'Interactive preview for `gi-underline` (typography.css) with the type scale and body copy used for descenders and wrapping.',
      },
    },
  },
} satisfies Meta;

export default meta;

const UNDERLINE_PLAYGROUND_SCALE_ROWS = [
  { label: 'Heading 1', fontClass: 'gi-heading-xl' },
  { label: 'Heading 2', fontClass: 'gi-heading-lg' },
  { label: 'Heading 3', fontClass: 'gi-heading-md' },
  { label: 'Heading 4', fontClass: 'gi-heading-sm' },
  { label: 'Heading 5', fontClass: 'gi-heading-xs' },
  { label: 'Heading 6', fontClass: 'gi-heading-2xs' },
  { label: 'Body XL', fontClass: 'gi-paragraph-xl' },
  { label: 'Body LG', fontClass: 'gi-paragraph-lg' },
  { label: 'Body MD', fontClass: 'gi-paragraph-md' },
  { label: 'Body SM', fontClass: 'gi-paragraph-sm' },
] as const;

export type UnderlinePlaygroundArguments = {
  /** When on, uses design-system `gi-underline` / link styles only (no story overrides). */
  useDefaultGiUnderline: boolean;
  underlineOffset: string;
  underlineOffsetHover: string;
  decorationThickness: number;
  decorationThicknessHover: number;
};

const UnderlinePlaygroundLongParagraphs = () => (
  <div className="gi-flex gi-flex-col gi-gap-6">
    <Paragraph
      as="span"
      size="md"
      className="gi-block gi-max-w-prose gi-text-black"
    >
      Long paragraph ( <Link href="#">philly</Link>,{' '}
      <Link href="#">typography</Link>, <Link href="#">quivery</Link>,{' '}
      <Link href="#">lazy</Link>, <Link href="#">bunny</Link>,{' '}
      <Link href="#">foggy</Link>, <Link href="#">jelly</Link> — check
      descenders): Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
      do eiusmod <Link href="#">tempor incididunt</Link> ut labore et dolore
      magna aliqua.
    </Paragraph>
    <Paragraph
      as="span"
      size="md"
      className="gi-block gi-max-w-prose gi-text-black"
    >
      Ut enim ad minim veniam, quis nostrud exercitation ullamco{' '}
      <Link href="#">laboris nisi</Link> ut aliquip ex ea{' '}
      <Link href="#">commodo consequat</Link>. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat{' '}
      <Link href="#">nulla pariatur</Link>. Excepteur sint occaecat cupidatat
      non proident, <Link href="#">sunt in culpa</Link> qui officia deserunt
      mollit anim id est laborum. Curabitur pretium tincidunt lacus nulla
      gravida orci a odio nullam varius turpis et euismod quis sollicitudin
      nibh.
    </Paragraph>
  </div>
);

const underlinePlaygroundScopedCss = `
.sb-underline-playground .gi-link {
  text-decoration-thickness: var(--sb-underline-playground-thickness) !important;
  text-underline-offset: var(--sb-underline-playground-offset) !important;
}
.sb-underline-playground .gi-link:hover {
  text-decoration-thickness: var(--sb-underline-playground-thickness-hover) !important;
  text-underline-offset: var(--sb-underline-playground-offset-hover) !important;
}
`;

const underlinePlaygroundWrapperStyle = (
  arguments_: UnderlinePlaygroundArguments,
): CSSProperties =>
  ({
    ['--sb-underline-playground-thickness']: `${arguments_.decorationThickness}px`,
    ['--sb-underline-playground-thickness-hover']: `${arguments_.decorationThicknessHover}px`,
    ['--sb-underline-playground-offset']: arguments_.underlineOffset,
    ['--sb-underline-playground-offset-hover']: arguments_.underlineOffsetHover,
  }) as CSSProperties;

export const Playground: StoryObj<UnderlinePlaygroundArguments> = {
  argTypes: {
    useDefaultGiUnderline: {
      control: 'boolean',
      description:
        'On: typography + link defaults only (no story CSS variables). Off: override offset and thickness below.',
    },
    underlineOffset: {
      control: 'text',
      description:
        'text-underline-offset when not hovering (e.g. 0.23em, 4px). Only when overrides are on.',
      if: { arg: 'useDefaultGiUnderline', eq: false },
    },
    underlineOffsetHover: {
      control: 'text',
      description: 'text-underline-offset on hover only.',
      if: { arg: 'useDefaultGiUnderline', eq: false },
    },
    decorationThickness: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
      description: 'Default text-decoration-thickness in px.',
      if: { arg: 'useDefaultGiUnderline', eq: false },
    },
    decorationThicknessHover: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
      description: 'text-decoration-thickness in px when hovering.',
      if: { arg: 'useDefaultGiUnderline', eq: false },
    },
  },
  args: {
    useDefaultGiUnderline: true,
    underlineOffset: '0.23em',
    underlineOffsetHover: '0.2em',
    decorationThickness: 1,
    decorationThicknessHover: 3,
  },
  render: (arguments_: UnderlinePlaygroundArguments) => {
    const useStoryOverrides = !arguments_.useDefaultGiUnderline;

    return (
      <>
        {useStoryOverrides ? (
          <style>{underlinePlaygroundScopedCss}</style>
        ) : null}
        <div
          className={
            useStoryOverrides
              ? 'sb-underline-playground gi-p-4 gi-flex gi-flex-col gi-gap-10'
              : 'gi-p-4 gi-flex gi-flex-col gi-gap-10'
          }
          style={
            useStoryOverrides
              ? underlinePlaygroundWrapperStyle(arguments_)
              : undefined
          }
        >
          <section className="gi-flex gi-flex-col gi-gap-4">
            <h2 className="gi-heading-sm gi-text-black">Type scale</h2>
            <ul className="gi-m-0 gi-list-none gi-flex gi-flex-col gi-gap-4 gi-p-0">
              {UNDERLINE_PLAYGROUND_SCALE_ROWS.map((row) => (
                <li key={row.label}>
                  <div className={`${row.fontClass} gi-text-black`}>
                    {row.label} with <Link href="#">jelly</Link>{' '}
                    <Link href="#">foggy</Link>{' '}
                    <Link href="#">Lorum Ipsum</Link>.
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="gi-flex gi-flex-col gi-gap-4">
            <h2 className="gi-heading-sm gi-text-black">Body paragraphs</h2>
            <UnderlinePlaygroundLongParagraphs />
          </section>
        </div>
      </>
    );
  },
  parameters: {
    controls: {
      include: [
        'useDefaultGiUnderline',
        'underlineOffset',
        'underlineOffsetHover',
        'decorationThickness',
        'decorationThicknessHover',
      ],
    },
    docs: {
      description: {
        story:
          'Turn **Use default gi underline** on to see only typography.css `gi-underline` / `a:where(.gi-underline)` and link styles. Turn it off to open **offset** (default + hover) and **thickness** controls; the story then injects scoped CSS variables on `.sb-underline-playground .gi-link`.',
      },
    },
  },
};
