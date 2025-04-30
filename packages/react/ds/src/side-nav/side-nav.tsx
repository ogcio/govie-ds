'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { SideNavItemProps, SideNavProps } from './types.js';

type SideNavContextType = {
  openItemIds: string[];
  setOpenItemIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedItemId?: string;
  setSelectedItemId: (id: string) => void;
  navId: string;
};

const SideNavContext = React.createContext<SideNavContextType | undefined>(
  undefined,
);

export const SideNavItem: React.FC<
  PropsWithChildren<SideNavItemProps> & { open?: boolean }
> = ({ children, parent, expandable, label, value, icon, open = false }) => {
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

  useEffect(() => {
    if (open) {
      setOpenItemIds((prevIds: string[]) => {
        if (!prevIds.includes(value)) {
          return [...prevIds, value];
        }
        return prevIds;
      });
    }
  }, [open, setOpenItemIds, value]);

  const handleClick = () => {
    if (parent && expandable) {
      const updatedOpenIds = isOpen
        ? openItemIds.filter((id) => id !== value)
        : [...openItemIds, value];
      setOpenItemIds(updatedOpenIds);
    } else {
      setSelectedItemId(value);
    }
  };

  const itemId = `${navId}-${value}`;
  const showExpandableIcon = parent && expandable;

  return (
    <div role="group" aria-label={`${children} dropdown`}>
      <button
        onClick={(event) => {
          event.preventDefault();
          handleClick();
        }}
        className={cn('gi-side-nav-item', {
          'gi-side-nav-item-selected': isSelected,
          'gi-side-nav-item-parent': parent,
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
        {showExpandableIcon && (
          <div className="gi-side-nav-expandable-icon">
            <Icon
              className={cn(isOpen && 'gi-rotate-180')}
              icon="keyboard_arrow_down"
            />
          </div>
        )}
      </button>

      {expandable && (
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
  onChange,
  value,
}) => {
  const [openItemIds, setOpenItemIds] = useState<string[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
    value,
  );
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
