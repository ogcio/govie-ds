import React from 'react';

type CaptionProps = {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export function Caption({ children, size = 'lg' }: CaptionProps) {
  return (
    <caption className={`gi-text-left gi-mb-4 gi-font-bold gi-text-${size}`}>
      {children}
    </caption>
  );
}
