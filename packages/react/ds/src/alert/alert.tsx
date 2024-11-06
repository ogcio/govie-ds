'use client';
import { type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';
import { Heading } from '../heading/heading.js';
import { Icon } from '../icon/icon.js';
import { Paragraph } from '../paragraph/paragraph.js';

const alertVariants = tv({
  slots: {
    base: 'gi-alert',
    container: 'gi-alert-container',
    content: 'gi-alert-description',
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

type AlertProps = {
  variant?: VariantProps<typeof alertVariants>['variant']
  title: string;
  children?: ReactNode;
  className?: string;
};

function Alert({ title, children, variant = 'info', className }: AlertProps) {
  const { base, heading, container, content } = alertVariants({
    variant,
  });

  const icon = ({ variant }: VariantProps<typeof alertVariants>) => {
    let icon;
    switch (variant) {
      case 'danger':
      case 'warning': {
        icon = 'error';
        break;
      }
      case 'success': {
        icon = 'check_circle';
        break;
      }
      default: {
        icon = 'info';
      }
    }
    return icon;
  };
  return (
    <div className={cn(base(), className)} role="alert">
      <div className={cn(container())}>
        <Icon size="lg" icon={icon({ variant })} />
        <span className="gi-sr-only">{variant}</span>
        <Heading as="h2" customClasses={heading()}>
          {title}
        </Heading>
      </div>
      <div className={content()}>{children}</div>
    </div>
  );
}

export { Alert, alertVariants };
export type { AlertProps };
