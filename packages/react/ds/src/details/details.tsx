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
      className="gi-details"
      data-module="gi-details"
      name={name}
      aria-expanded={isOpen ? 'true' : 'false'}
      aria-details="details-content"
      {...props}
    >
      <summary
        className="gi-details-summary"
        data-testid="govie-details-summary"
        role="button"
        aria-controls="details-content"
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        <Icon icon={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
        <span className="gi-details-summary-text">{label}</span>
      </summary>
      <div
        id="details-content"
        className="gi-details-text"
        aria-hidden={isOpen ? 'false' : 'true'}
      >
        {children}
      </div>
    </details>
  );
};
