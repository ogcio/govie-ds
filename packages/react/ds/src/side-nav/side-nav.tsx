'use client';
import React, { PropsWithChildren, useState } from 'react';
import { Icon } from '../icon/icon.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { cn } from '../cn.js';
import { SideNavItemProps, SideNavProps } from './types.js';

type SideNavContextType = {
  openItemId?: string;
  selectedItemId?: string;
  setOpenItemId: (id: string | undefined) => void;
  setSelectedItemId: (id: string) => void;
  navId: string;
};

const SideNavContext = React.createContext<SideNavContextType | undefined>(
  undefined,
);

export const SideNavItem: React.FC<PropsWithChildren<SideNavItemProps>> = ({
  children,
  isExpandable,
  label,
  value,
  icon,
}) => {
  const context = React.useContext(SideNavContext);

  if (!context) {
    throw new Error('SideNavItem must be used within a SideNav');
  }

  const {
    openItemId,
    selectedItemId,
    setOpenItemId,
    setSelectedItemId,
    navId,
  } = context;
  const isOpen = openItemId === value;
  const isSelected = selectedItemId === value;

  const handleClick = () => {
    setSelectedItemId(value);
    if (isExpandable) {
      setOpenItemId(isOpen ? undefined : value);
    }
  };

  const itemId = `${navId}-${value}`;

  return (
    <div role="group" aria-label={`${children} dropdown`}>
      <button
        onClick={(event) => {
          event.preventDefault();
          handleClick();
        }}
        className={cn('gi-side-nav-item', {
          'gi-side-nav-item-selected': isSelected,
        })}
        id={itemId}
      >
        <div className="gi-side-nav-item-left">
          {icon && (
            <div className="gi-side-nav-item-icon">
              <Icon icon={icon} />
            </div>
          )}
          <div className="gi-side-nav-item-label">
            <Paragraph size="md">{label}</Paragraph>
          </div>
        </div>
        {isExpandable && (
          <div className="gi-side-nav-expandable-icon">
            <Icon
              className={cn(isOpen && 'gi-rotate-180')}
              icon="keyboard_arrow_down"
            />
          </div>
        )}
      </button>

      {isExpandable && (
        <div className={cn(isOpen ? 'gi-side-nav-item-content' : 'gi-hidden')}>
          {children}
        </div>
      )}
    </div>
  );
};

export const SideNav: React.FC<PropsWithChildren<SideNavProps>> = ({
  children,
  className,
  dataTestid,
}) => {
  const [openItemId, setOpenItemId] = useState<string | undefined>(undefined);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
    undefined,
  );
  const navId = React.useId();

  return (
    <SideNavContext.Provider
      value={{
        openItemId,
        selectedItemId,
        setOpenItemId,
        setSelectedItemId,
        navId,
      }}
    >
      <div
        className={cn('gi-side-nav-container', className)}
        data-testid={dataTestid}
      >
        {children}
      </div>
    </SideNavContext.Provider>
  );
};
