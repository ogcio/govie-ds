'use client';
import React, { PropsWithChildren, useState } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { SideNavItemProps, SideNavProps } from './types.js';

type SideNavContextType = {
  openItemIds: string[];
  selectedItemId?: string;
  setOpenItemIds: (ids: string[]) => void;
  setSelectedItemId: (id: string) => void;
  navId: string;
};

const SideNavContext = React.createContext<SideNavContextType | undefined>(
  undefined,
);

export const SideNavItem: React.FC<PropsWithChildren<SideNavItemProps>> = ({
  children,
  parent,
  label,
  value,
  icon,
}) => {
  const context = React.useContext(SideNavContext);

  if (!context) {
    throw new Error('SideNavItem must be used within a SideNav');
  }

  const {
    openItemIds,
    selectedItemId,
    setOpenItemIds,
    setSelectedItemId,
    navId,
  } = context;

  const isOpen = openItemIds.includes(value);
  const isSelected = selectedItemId === value;

  const handleClick = () => {
    if (parent) {
      const updatedOpenIds = isOpen
        ? openItemIds.filter((id) => id !== value)
        : [...openItemIds, value];
      setOpenItemIds(updatedOpenIds);
    } else {
      setSelectedItemId(value);
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
        {parent && (
          <div className="gi-side-nav-expandable-icon">
            <Icon
              className={cn(isOpen && 'gi-rotate-180')}
              icon="keyboard_arrow_down"
            />
          </div>
        )}
      </button>

      {parent && (
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
  onChange, // <-- new
}) => {
  const [openItemIds, setOpenItemIds] = useState<string[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
  const navId = React.useId();

  const handleSetSelectedItemId = (id: string) => {
    setSelectedItemId(id);
    onChange?.(id);
  };

  return (
    <SideNavContext.Provider
      value={{
        openItemIds,
        selectedItemId,
        setOpenItemIds,
        setSelectedItemId: handleSetSelectedItemId,
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

SideNav.displayName = 'SideNav';
SideNavItem.displayName = 'SideNavItem';
