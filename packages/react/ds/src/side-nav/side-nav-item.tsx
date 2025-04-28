'use client';
import React, { useState, PropsWithChildren } from 'react';
import { Icon } from '../icon/icon.js';
import { SideNavItemProps } from './types.js';
import { Paragraph } from '../paragraph/paragraph.js';

export const SideNavItem = ({
  children,
}: PropsWithChildren<SideNavItemProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div role="group" aria-label={`${children} dropdown`}>
      <button
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={`gi-side-nav-toggle ${isOpen && 'gi-side-nav-toggle-open'}`}
      >
        <div className="gi-side-nav-toggle-content">
          <Paragraph size="md">{children}</Paragraph>
        </div>

        <Icon
          className={`${isOpen && 'gi-rotate-180'}`}
          icon="keyboard_arrow_down"
        />
      </button>

      <div
        className={`${
          isOpen ? 'gi-side-nav-dropdown-container-open' : 'gi-hidden'
        }`}
      >
        <div className="gi-side-nav-checkbox-container">Content Slot</div>
      </div>
    </div>
  );
};
