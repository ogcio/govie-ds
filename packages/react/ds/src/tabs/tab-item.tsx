import React from 'react';
import { slugify } from '../utils.js';

export function TabItem({
  value,
  href,
  checked = false,
  children,
  tabName,
}: {
  value: string;
  href?: string;
  checked?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  children: React.ReactNode;
  tabName?: string;
}) {
  const valueSlug = slugify(value);
  return (
    <>
      <input
        name={tabName}
        type="radio"
        id={`tab-${valueSlug}`}
        aria-labelledby={`tab-label-${valueSlug}`}
        aria-roledescription="tab"
        defaultChecked={checked}
        className="tab-item gi-absolute gi-opacity-0"
      />
      <label
        role="tab"
        htmlFor={`tab-${valueSlug}`}
        id={`tab-label-${valueSlug}`}
        aria-hidden="true"
        className="
          gi-inline-block 
          gi-cursor-pointer
          gi-px-5
          gi-py-2
          gi-relative
          gi-mr-1
          gi-bg-gray-50
          gi-text-center 
          gi-text-md
          gi-underline
          gi-text-slate-300"
      >
        <a href={href} className="gi-decoration-xs">
          {children}
        </a>
      </label>
    </>
  );
}
