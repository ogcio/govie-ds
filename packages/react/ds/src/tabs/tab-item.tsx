import React from 'react';
import { slugify } from '../utils.js';

export function TabItem({
  value,
  href,
  checked = false,
  children,
}: {
  value: string;
  href?: string;
  checked?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  children: React.ReactNode;
}) {
  const valueSlug = slugify(value);
  return (
    <>
      <input
        name="tabs"
        type="radio"
        id={`tab-${valueSlug}`}
        aria-labelledby={`tab-label-${valueSlug}`}
        aria-roledescription="tab"
        defaultChecked={checked}
        className="gi-absolute gi-opacity-0"
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
          gi-border-solid 
          gi-border-border-gray-200
          gi-border-b-xs 
          gi-relative
          gi--mb-[1px]
          gi-mr-1
          gi-bg-gray-50
          gi-text-center 
          gi-text-md
          gi-underline
          gi-text-slate-300"
      >
        <a
          href={href}
          className="
            gi-decoration-xs
            hover:gi-decoration-lg
            focus:gi-outline
            focus:gi-outline-transparent
            focus:gi-bg-yellow-400
            focus:gi-outline-2
            focus:gi-shadow-sm
            focus:gi-shadow-yellow-400"
        >
          {children}
        </a>
      </label>
    </>
  );
}
