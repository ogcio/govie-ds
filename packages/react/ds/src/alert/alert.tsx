'use client';
import { type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../cn.js';
import { Heading } from '../heading/heading.js';
import { Icon } from '../icon/icon.js';

const alertVariants = tv({
  slots: {
    base: 'gi-alert',
    container: 'gi-alert-container',
    content: 'gi-alert-content',
    heading: 'gi-alert-title',
  },
  variants: {
    variant: {
      info: {
        base: 'gi-alert-info',
      },
      danger: {
        base: 'gi-alert-danger',
      },
      success: {
        base: 'gi-alert-success',
      },
      warning: {
        base: 'gi-alert-warning',
      },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

type AlertProps = {
  variant?: VariantProps<typeof alertVariants>['variant'];
  title: string;
  children?: ReactNode;
  className?: string;
};

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

function Alert({ title, children, variant = 'info', className }: AlertProps) {
  const { base, heading, container, content } = alertVariants({
    variant,
  });

  return (
    <div className={cn(base(), className)} role="alert">
      <div className={cn(container())}>
        <Icon size="lg" icon={icon({ variant })} />
        <Heading size="sm" as="h2" customClasses={heading()}>
          {title}
        </Heading>
      </div>
      <div className={content()}>{children}</div>
    </div>
  );
}

export { Alert, alertVariants };
export type { AlertProps };
