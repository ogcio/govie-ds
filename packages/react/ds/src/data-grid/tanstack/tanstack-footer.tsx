import React from 'react';
import { cn } from '../../cn.js';

interface TanstackFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TanstackFooter({
  children,
  className,
  ...props
}: TanstackFooterProps) {
  let start: React.ReactElement<SectionProps> | null = null;
  let center: React.ReactElement<SectionProps> | null = null;
  let end: React.ReactElement<SectionProps> | null = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === TanstackFooterStart) {
      start = child as React.ReactElement<SectionProps>;
    } else if (child.type === TanstackFooterCenter) {
      center = child as React.ReactElement<SectionProps>;
    } else if (child.type === TanstackFooterEnd) {
      end = child as React.ReactElement<SectionProps>;
    }
  });

  const hasStart = !!start;
  const hasCenter = !!center;
  const hasEnd = !!end;
  const onlyEnd = !hasStart && !hasCenter && hasEnd;

  return (
    <div
      {...props}
      className={cn(
        'gi-flex gi-flex-row gi-w-full gi-items-center gi-py-2',
        onlyEnd ? 'gi-justify-end' : 'gi-gap-2',
        className,
      )}
    >
      {hasStart && start && (
        <div
          className={cn(
            'gi-grow gi-basis-0 gi-min-w-0',
            (start as React.ReactElement<SectionProps>).props.className,
          )}
          style={(start as React.ReactElement<SectionProps>).props.style}
        >
          {(start as React.ReactElement<SectionProps>).props.children}
        </div>
      )}
      {hasCenter && center && (
        <div
          className={cn(
            'gi-grow gi-basis-0 gi-min-w-0 gi-text-center',
            (center as React.ReactElement<SectionProps>).props.className,
          )}
          style={(center as React.ReactElement<SectionProps>).props.style}
        >
          {(center as React.ReactElement<SectionProps>).props.children}
        </div>
      )}
      {hasEnd && end && (
        <div
          className={cn(
            onlyEnd ? 'gi-min-w-0' : 'gi-basis-1/2 gi-min-w-0 gi-text-right',
            (end as React.ReactElement<SectionProps>).props.className,
          )}
          style={(end as React.ReactElement<SectionProps>).props.style}
        >
          {(end as React.ReactElement<SectionProps>).props.children}
        </div>
      )}
    </div>
  );
}

export function TanstackFooterStart(props: SectionProps) {
  return <>{props.children}</>;
}

export function TanstackFooterCenter(props: SectionProps) {
  return <>{props.children}</>;
}

export function TanstackFooterEnd(props: SectionProps) {
  return <>{props.children}</>;
}
