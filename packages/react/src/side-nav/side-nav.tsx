'use client';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useState, useCallback, memo } from 'react';
import Heading from '@/Heading.js';
import Button from '@/atoms/Button';
import Paragraph from '@/atoms/Paragraph';
import type { IconId } from '@/icon/icon.js';
import { Icon } from '@/icon/icon.js';
import KeyboardArrowDown from '@/atoms/icons/KeyboardArrowDown';
import { Link } from '@/link/link.js';
import type { SideNavHeadingProps, SideNavItemProps, SideNavProps } from './types.js';
import clsx from 'clsx';

type SideNavContextType = {
  openItemIds: string[];
  setOpenItemIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedItemId?: string;
  setSelectedItemId: (id: string) => void;
  navId: string;
};

const SideNavContext = React.createContext<SideNavContextType | undefined>(undefined);

const ItemContent = memo(({ icon, label }: { icon?: React.ReactNode; label: React.ReactNode }) => {
  return (
    <div className="gi-side-nav-item-left gi-flex-1 gi-relative gi-flex gi-items-center gi-justify-between gi-w-full gi-gap-3">
      {icon && (
        <div className="gi-side-nav-item-icon">{typeof icon === 'string' ? <Icon icon={icon as IconId} /> : icon}</div>
      )}
      <div className="gi-side-nav-item-label gi-flex-1">
        {typeof label === 'string' ? <Paragraph size="md">{label}</Paragraph> : label}
      </div>
    </div>
  );
});

export const SideNavItem: React.FC<PropsWithChildren<SideNavItemProps> & { open?: boolean }> = React.memo(
  ({ children, primary, secondary, expandable, label, value, icon, href, asChild, open, actions }) => {
    const context = React.useContext(SideNavContext);

    if (!context) {
      throw new Error('SideNavItem must be used within a SideNav');
    }

    const { openItemIds, selectedItemId, setOpenItemIds, setSelectedItemId, navId } = context;

    const isOpen = openItemIds.includes(value);
    const isSelected = selectedItemId === value;

    useEffect(() => {
      if (open) {
        setOpenItemIds((previousIds: string[]) => {
          if (!previousIds.includes(value)) {
            return [...previousIds, value];
          }
          return previousIds;
        });
      }
    }, [open, setOpenItemIds, value]);

    const handleExpandCollapse = useCallback(() => {
      const updatedOpenIds = isOpen ? openItemIds.filter((id) => id !== value) : [...openItemIds, value];
      setOpenItemIds(updatedOpenIds);
    }, [isOpen, openItemIds, setOpenItemIds, value]);

    const handleSelection = useCallback(() => {
      setSelectedItemId(value);
    }, [setSelectedItemId, value]);

    const itemId = `${navId}-${value}`;
    const showExpandableIcon = primary && expandable;
    const isNavigable = href !== undefined;

    const handleClick = useCallback(() => {
      if (primary && expandable) {
        handleExpandCollapse();
      }
      handleSelection();
    }, [primary, expandable, handleExpandCollapse, handleSelection]);

    const handleButtonClick = useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        if (primary && expandable) {
          handleExpandCollapse();
        } else {
          handleSelection();
        }
      },
      [primary, expandable, handleExpandCollapse, handleSelection],
    );
    const hasActionsWithExpandable = !!actions && showExpandableIcon;

    // Right padding reserves space for absolutely positioned trailing elements:
    const itemClassName = clsx('gi-w-full !gi-h-12 gi-border-transparent !gi-px-3 !gi-py-2 ', {
      'gi-side-nav-item-selected': isSelected,
      'gi-side-nav-item-primary': primary,
      '!gi-px-6': secondary,
      // one element — either actions or chevron
      '!gi-pr-12': !!actions !== !!showExpandableIcon,
      // both elements — actions + chevron area
      '!gi-pr-[84px]': hasActionsWithExpandable,
    });

    return (
      <div
        role="group"
        aria-label={`${typeof label === 'string' ? label : ''} ${primary && expandable ? 'dropdown' : 'item'}`}
      >
        <div className="gi-relative gi-flex gi-items-center gi-mt-1">
          {isNavigable ? (
            <Link
              id={itemId}
              href={href}
              asChild={asChild}
              asButton={{
                variant: 'flat',
                appearance: 'dark',
              }}
              className={itemClassName}
              onClick={handleClick}
            >
              {asChild ? children : <ItemContent icon={icon} label={label} />}
            </Link>
          ) : (
            <Button
              variant="flat"
              appearance="dark"
              size="lg"
              onClick={handleButtonClick}
              className={itemClassName}
              id={itemId}
            >
              <ItemContent icon={icon} label={label} />
            </Button>
          )}
          {actions && (
            <div className={clsx('gi-absolute', hasActionsWithExpandable ? 'gi-right-12' : 'gi-right-3')}>
              {actions}
            </div>
          )}
          {showExpandableIcon && (
            <div className="gi-absolute gi-right-3 gi-pointer-events-none">
              <KeyboardArrowDown
                className={clsx('motion-safe:gi-transition-transform motion-safe:gi-duration-100', {
                  'gi-rotate-180': isOpen,
                })}
              />
            </div>
          )}
        </div>

        {expandable && primary && (
          <div className={clsx(isOpen ? 'gi-side-nav-item-content' : 'gi-hidden')}>{children}</div>
        )}
      </div>
    );
  },
);

export const SideNav: React.FC<PropsWithChildren<SideNavProps>> = memo(
  ({ children, className, dataTestid, onChange, value }) => {
    const [openItemIds, setOpenItemIds] = useState<string[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string | undefined>(value);
    const navId = React.useId();

    const handleSetSelectedItemId = useCallback(
      (id: string) => {
        setSelectedItemId(id);
        onChange?.(id);
      },
      [onChange],
    );

    const contextValue = React.useMemo(
      () => ({
        openItemIds,
        selectedItemId,
        setOpenItemIds,
        setSelectedItemId: handleSetSelectedItemId,
        navId,
      }),
      [openItemIds, selectedItemId, handleSetSelectedItemId, navId],
    );

    return (
      <SideNavContext.Provider value={contextValue}>
        <div className={clsx('gi-side-nav-container', className)} data-testid={dataTestid}>
          {children}
        </div>
      </SideNavContext.Provider>
    );
  },
);

export const SideNavHeading: React.FC<SideNavHeadingProps> = memo(({ children, secondary, className, ...props }) => {
  const context = React.useContext(SideNavContext);

  if (!context) {
    throw new Error('SideNavHeading must be used within a SideNav');
  }

  return (
    <Heading {...props} as="h5" className={clsx('gi-side-nav-heading', secondary ? 'gi-px-6' : 'gi-px-3', className)}>
      {children}
    </Heading>
  );
});

SideNav.displayName = 'SideNav';
SideNavItem.displayName = 'SideNavItem';
SideNavHeading.displayName = 'SideNavHeading';
