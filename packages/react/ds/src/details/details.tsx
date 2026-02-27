'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '../icon/icon.js';

export type DetailsProps = {
  label: string;
} & React.DetailsHTMLAttributes<HTMLDetailsElement>;

export const Details = ({ label, name, children, ...props }: DetailsProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (detailsRef.current?.open !== isOpen) {
      setIsOpen(detailsRef.current?.open ?? false);
    }
  }, []);

  const handleToggle = () => {
    setIsOpen(detailsRef.current?.open ?? false);
  };

  return (
    <details
      ref={detailsRef}
      onToggle={handleToggle}
      data-testid="govie-details"
      className="gi-block gi-text-md gi-text-gray-950"
      data-module="gi-details"
      name={name}
      aria-expanded={isOpen ? 'true' : 'false'}
      aria-details="details-content"
      {...props}
    >
      <summary
        className="gi-flex gi-items-center gi-relative gi-mb-1 gi-cursor-pointer gi-text-gray-950 gi-w-fit gi-list-none hover:gi-text-gray-950 focus:gi-rounded-sm focus:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)] focus-visible:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)] focus-visible:gi-rounded-sm focus-visible:gi-outline-none [&:focus>span]:gi-no-underline [&:focus>span]:gi-select-none [&:hover>span]:gi-underline-offset-[0.1rem] [&:hover>span]:[text-decoration-thickness:max(3px)] [&:hover>span]:[text-decoration-skip-ink:none]"
        data-testid="govie-details-summary"
        role="button"
        aria-controls="details-content"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        <Icon icon={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
        <span className="gi-underline gi-underline-offset-[0.1rem]">{label}</span>
      </summary>
      <div
        id="details-content"
        className="gi-py-4 gi-pl-5 gi-border-l-[5px] gi-border-solid gi-border-l-gray-200"
        aria-hidden={isOpen ? 'false' : 'true'}
      >
        {children}
      </div>
    </details>
  );
};
