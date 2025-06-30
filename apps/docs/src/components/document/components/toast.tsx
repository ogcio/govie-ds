'use client';
import {
  Button,
  toaster,
  ToastProps,
  ToastProvider,
} from '@ogcio/design-system-react';

export const Toast = (props: ToastProps) => {
  return (
    <>
      <ToastProvider />
      <Button
        onClick={() =>
          toaster.create(
            props || {
              title: 'Default',
              description: 'This is some content',
              animation: 'fadeinup',
              variant: 'info',
              position: {
                x: 'left',
                y: 'top',
              },
            },
          )
        }
      >
        Trigger Toast
      </Button>
    </>
  );
};
