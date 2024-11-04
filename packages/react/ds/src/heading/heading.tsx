export enum HeadingSize {
  xl = 'xl',
  lg = 'lg',
  md = 'md',
  sm = 'sm',
  xs = 'xs',
  '2xs' = '2xs',
}

export enum HeadingAs {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export type HeadingProps = {
  caption?: string;
  as?: keyof typeof HeadingAs;
  size?: keyof typeof HeadingSize;
  children: React.ReactNode;
  customClasses?: string;
};

const HeadingAsToSizeMap = {
  h1: HeadingSize.xl,
  h2: HeadingSize.lg,
  h3: HeadingSize.md,
  h4: HeadingSize.sm,
  h5: HeadingSize.xs,
  h6: HeadingSize['2xs'],
};

const HeadingSizeToClassesMap = {
  xl: 'gi-heading-xl',
  lg: 'gi-heading-lg',
  md: 'gi-heading-md',
  sm: 'gi-heading-sm',
  xs: 'gi-heading-xs',
  '2xs': 'gi-heading-2xs',
};

export function Heading({
  as: As = HeadingAs.h1,
  size,
  children,
  caption,
  customClasses = '',
}: HeadingProps) {
  const defaultSize = (() => HeadingAsToSizeMap[As])();
  const sizeClasses = (() => HeadingSizeToClassesMap[size ?? defaultSize])();
  const combinedClasses = `${sizeClasses} ${customClasses}`.trim();

  return (
    <>
      {caption && (
        <span className="gi-text-gray-500" data-testid="govie-heading-caption">
          {caption}
        </span>
      )}
      <As className={combinedClasses}>{children}</As>
    </>
  );
}
