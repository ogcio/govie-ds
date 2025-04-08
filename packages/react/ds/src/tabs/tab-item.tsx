'use client';
import React, { FC, useEffect, useRef } from 'react';
import { slugify } from '../utilities.js';

export type TabItemProps = {
  value: string;
  children: React.ReactNode;
  href?: string;
  checked?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  onTabSelected?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

export type InternalTabItemProps = TabItemProps & {
  index?: number;
  onTabClick?: (index: number) => void;
  onTabKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
};

// Component exposed to pick only the props needed
export const TabItem: FC<TabItemProps> = () => null;

export const InternalTabItem: FC<InternalTabItemProps> = ({
  value,
  href,
  index = -1,
  checked = false,
  children,
  onTabSelected,
  onTabClick,
  onTabKeyDown,
}) => {
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
        if (onTabClick) {
          onTabClick(index);
        }
        if (onTabSelected) {
          onTabSelected(event);
        }
        buttonRef.current?.blur();
      }}
      onKeyDown={(event) => {
        if (onTabKeyDown) {
          onTabKeyDown(event);
        }
      }}
    >
      {href ? (
        <a href={href} className="gi-decoration-xs">
          {children}
        </a>
      ) : (
        <span className="gi-decoration-xs">{children}</span>
      )}
    </button>
  );
};

TabItem.displayName = 'TabItem';
