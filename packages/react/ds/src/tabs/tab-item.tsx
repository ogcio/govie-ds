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
  onTabClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type InternalTabItemProps = TabItemProps & {
  onTabClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onTabKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  index: number;
};

// Component exposed to pick only the props needed
export const TabItem: FC<TabItemProps> = () => null;

export const InternalTabItem: FC<InternalTabItemProps> = ({
  value,
  href,
  checked = false,
  children,
  onTabClick,
  onTabKeyDown,
}) => {
  const valueSlug = slugify(value);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const clickButtonRef = useRef(false);

  useEffect(() => {
    if (checked && !clickButtonRef.current) {
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
        clickButtonRef.current = true;
        if (onTabClick) {
          onTabClick(event);
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
