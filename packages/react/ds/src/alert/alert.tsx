'use client';
import { useState, type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';
import { Heading } from '../heading/heading.js';
import { IconButton } from '../icon-button/icon-button.js';
import { Paragraph } from '../paragraph/paragraph.js';

const alertVariants = tv({
  slots: {
    base: 'gi-alert',
    container: 'gi-alert-container',
    description: 'gi-alert-description',
    heading: 'gi-alert-title',
    dismiss: 'gi-alert-dismiss',
  },
  variants: {
    variant: {
      info: {
        base: 'gi-alert-info',
        dismiss: 'gi-alert-dismiss-info',
      },
      danger: {
        base: 'gi-alert-danger',
        dismiss: 'gi-alert-dismiss-danger',
      },
      success: {
        base: 'gi-alert-success',
        dismiss: 'gi-alert-dismiss-success',
      },
      warning: {
        base: 'gi-alert-warning',
        dismiss: 'gi-alert-dismiss-warning',
      },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

type AlertProps = VariantProps<typeof alertVariants> & {
  title: string;
  children?: ReactNode;
  className?: string;
  dismissable?: boolean;
};

function Alert({
  title,
  children,
  variant,
  className,
  dismissable = true,
}: AlertProps) {
  const { base, heading, container, description, dismiss } = alertVariants({
    variant,
  });
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return null;
  }
  return (
    <div className={cn(base(), className)} role="alert">
      <div className={cn(container())}>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="gi-sr-only">{variant}</span>
        <Heading as="h2" customClasses={heading()}>
          {title}
        </Heading>
        {dismissable && (
          <IconButton
            variant="flat"
            icon={{ icon: 'close' }}
            className={dismiss()}
            size="large"
            onClick={() => setDismissed(true)}
          />
        )}
      </div>
      <Paragraph className={description()}>{children}</Paragraph>
    </div>
  );
}

export { Alert, alertVariants };
export type { AlertProps };
