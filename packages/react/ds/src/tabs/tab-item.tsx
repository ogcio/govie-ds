'use client';
import React, { useEffect, useRef } from 'react';
import { slugify } from '../utils.js';

export type TabItemProps = {
  value: string;
  children: React.ReactNode;
  href?: string;
  index?: number;
  checked?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  onTabSelected?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onTabClick?: (index: number) => void;
  onTabKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
};

export const TabItem = ({
  value,
  href,
  index = -1,
  checked = false,
  children,
  onTabSelected = () => {},
  onTabClick = () => {},
  onTabKeyDown = () => {},
}: TabItemProps) => {
  const valueSlug = slugify(value);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (checked) {
      buttonRef.current?.click();
    }
  }, [checked]);

  return (
    <button
      ref={buttonRef}
      id={`tab-${valueSlug}`}
      role="tab"
      aria-roledescription="tab"
      aria-selected={checked ? 'true' : 'false'}
      aria-controls={`tab-panel-${valueSlug}`}
      className={`gi-tab-item ${checked ? 'gi-tab-item-checked' : ''}`}
      onClick={(event) => {
        onTabClick(index);
        onTabSelected(event);
      }}
      onKeyDown={(event) => {
        onTabKeyDown(event);
      }}
    >
      {href && (
        <a href={href} className="gi-decoration-xs">
          {children}
        </a>
      )}
      {!href && <span className="gi-decoration-xs">{children}</span>}
    </button>
  );
};
