import React from 'react';
import { cn } from '../../cn.js';

interface TanstackFooterTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface TanstackFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export type { TanstackFooterProps, TanstackFooterTypeProps };

const isTanstackFooterSection = (
  child: React.ReactNode,
  sectionType: React.ComponentType<TanstackFooterTypeProps>,
): child is React.ReactElement<TanstackFooterTypeProps> => {
  return React.isValidElement(child) && child.type === sectionType;
};

const renderFooterType = (
  section: React.ReactElement<TanstackFooterTypeProps> | null,
  baseClassName: string,
  conditionalClassName?: string,
): React.ReactNode => {
  if (!section) return null;

  return (
    <div
      className={cn(
        baseClassName,
        conditionalClassName,
        section.props.className,
      )}
      style={section.props.style}
    >
      {section.props.children}
    </div>
  );
};

export const TanstackFooterStart: React.FC<TanstackFooterTypeProps> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;
TanstackFooterStart.displayName = 'TanstackFooterStart';

export const TanstackFooterCenter: React.FC<TanstackFooterTypeProps> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;
TanstackFooterCenter.displayName = 'TanstackFooterCenter';

export const TanstackFooterEnd: React.FC<TanstackFooterTypeProps> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;
TanstackFooterEnd.displayName = 'TanstackFooterEnd';

export const TanstackFooter: React.FC<TanstackFooterProps> = ({
  children,
  className,
  ...props
}) => {
  const sections = React.useMemo(() => {
    let start: React.ReactElement<TanstackFooterTypeProps> | null = null;
    let center: React.ReactElement<TanstackFooterTypeProps> | null = null;
    let end: React.ReactElement<TanstackFooterTypeProps> | null = null;

    React.Children.forEach(children, (child) => {
      if (isTanstackFooterSection(child, TanstackFooterStart)) {
        start = child;
      } else if (isTanstackFooterSection(child, TanstackFooterCenter)) {
        center = child;
      } else if (isTanstackFooterSection(child, TanstackFooterEnd)) {
        end = child;
      }
    });

    return { start, center, end };
  }, [children]);

  const { start, center, end } = sections;

  const hasStart = Boolean(start);
  const hasCenter = Boolean(center);
  const hasEnd = Boolean(end);
  const onlyEnd = !hasStart && !hasCenter && hasEnd;

  const baseSectionClasses = 'gi-grow gi-basis-0 gi-min-w-0';
  const centerSectionClasses = `${baseSectionClasses} gi-text-center`;
  const endSectionClasses = cn('gi-min-w-0', {
    'gi-basis-1/2 gi-text-right': !onlyEnd,
  });

  return (
    <div
      {...props}
      className={cn(
        'gi-flex gi-flex-row gi-w-full gi-items-center gi-py-2',
        onlyEnd ? 'gi-justify-end' : 'gi-gap-2',
        className,
      )}
    >
      {renderFooterType(start, baseSectionClasses)}
      {renderFooterType(center, centerSectionClasses)}
      {renderFooterType(end, endSectionClasses)}
    </div>
  );
};

TanstackFooter.displayName = 'TanstackFooter';
