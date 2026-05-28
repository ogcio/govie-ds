'use client';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useState, useCallback, memo, useMemo } from 'react';
import GiSideNav from '@/atoms/sideNav/SideNav';
import GiSideNavItem, { slotStyles, contentStyles } from '@/atoms/sideNav/SideNavItem';
import GiBox from '@/atoms/Box';
import GiParagraph from '@/atoms/Paragraph';
import KeyboardArrowDown from '@/atoms/icons/KeyboardArrowDown';
import { Icon, type IconId } from '@/icon/icon';
import { cn } from '@/cn';
import type { SideNavItemProps, SideNavProps } from './types';

export const SideNavItem: React.FC<PropsWithChildren<SideNavItemProps>> = memo(
  ({
    children,
    primary,
    expandable,
    label,
    value,
    href,
    icon,
    open,
    actions,
    ariaLabel,
    className,
    dataTestId,
    asChild,
  }) => {
    const context = useSideNavContext();
    const { openItemIds, selectedItemId, setOpenItemIds, setSelectedItemId, navId, depth } = context;

    const isOpen = openItemIds.includes(value);
    const isSelected = selectedItemId === value;
    const isPrimary = primary ?? depth === 0;
    const itemId = `${navId}-${value}`;
    const showSelected = isSelected && !expandable;

    useEffect(() => {
      if (open) {
        setOpenItemIds((previousIds) => {
          if (previousIds.includes(value)) {
            return previousIds;
          }
          return [...previousIds, value];
        });
      }
    }, [open, setOpenItemIds, value]);

    const handleClick = useCallback(() => {
      if (expandable) {
        setOpenItemIds((previousIds) =>
          previousIds.includes(value) ? previousIds.filter((id) => id !== value) : [...previousIds, value],
        );
      } else {
        setSelectedItemId(value);
      }
    }, [expandable, setOpenItemIds, setSelectedItemId, value]);

    const nestedContextValue = useMemo(() => ({ ...context, depth: depth + 1 }), [context, depth]);

    const childArray = React.Children.toArray(children);

    const interactiveElement = (() => {
      const content = (
        <GiBox className={contentStyles({ primary: isPrimary })}>
          {typeof icon === 'string' ? <Icon icon={icon as IconId} /> : icon}
          {typeof label === 'string' ? (
            <GiParagraph size={isPrimary ? 'md' : 'sm'} className="gi-flex-1">
              {label}
            </GiParagraph>
          ) : (
            label
          )}
          {expandable && isPrimary ? <KeyboardArrowDown className={isOpen ? 'gi-rotate-180' : ''} /> : null}
        </GiBox>
      );

      if (asChild) {
        const childElement = childArray.find((child) => React.isValidElement(child));
        if (!childElement || !React.isValidElement(childElement)) {
          return null;
        }
        const childProps = childElement.props as React.HTMLAttributes<HTMLElement>;
        return React.cloneElement(childElement, {
          ...childProps,
          className: cn(
            slotStyles({
              hasActions: !!actions,
              selected: showSelected,
              size: 'lg',
            }),
            childProps.className,
          ),
          'aria-expanded': expandable ? isOpen : undefined,
          'aria-controls': expandable ? `${itemId}-content` : undefined,
          'aria-label': ariaLabel ?? childProps['aria-label'],
          onClick: (event: React.MouseEvent<HTMLElement>) => {
            handleClick();
            childProps.onClick?.(event);
          },
          children: content,
        } as React.HTMLAttributes<HTMLElement>);
      }

      if (href && !expandable) {
        return (
          <a
            href={href}
            aria-label={ariaLabel}
            className={slotStyles({
              hasActions: !!actions,
              selected: showSelected,
              size: 'lg',
            })}
            onClick={handleClick}
          >
            {content}
          </a>
        );
      }

      return (
        <button
          type="button"
          aria-label={ariaLabel}
          aria-expanded={expandable ? isOpen : undefined}
          aria-controls={expandable ? `${itemId}-content` : undefined}
          className={slotStyles({
            hasActions: !!actions,
            selected: showSelected,
            size: 'lg',
          })}
          onClick={handleClick}
        >
          {content}
        </button>
      );
    })();

    return (
      <GiSideNavItem
        id={itemId}
        selected={showSelected}
        expanded={expandable ? isOpen : undefined}
        expandedContentId={expandable ? `${itemId}-content` : undefined}
        expandedContent={
          expandable ? (
            <SideNavContext.Provider value={nestedContextValue}>{childArray}</SideNavContext.Provider>
          ) : undefined
        }
        expandedLabel={typeof label === 'string' ? label : ariaLabel}
        actions={actions}
        className={className}
        dataTestId={dataTestId}
      >
        {interactiveElement}
      </GiSideNavItem>
    );
  },
);

export const SideNav: React.FC<PropsWithChildren<SideNavProps>> = memo(
  ({ children, className, dataTestId, dataTestid, onChange, value, ariaLabel, id }) => {
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

    const contextValue = useMemo(
      () => ({
        openItemIds,
        selectedItemId,
        setOpenItemIds,
        setSelectedItemId: handleSetSelectedItemId,
        navId,
        depth: 0,
      }),
      [openItemIds, selectedItemId, handleSetSelectedItemId, navId],
    );

    return (
      <SideNavContext.Provider value={contextValue}>
        <GiSideNav
          id={id}
          className={className}
          dataTestId={dataTestId ?? dataTestid}
          ariaLabel={ariaLabel ?? 'Side navigation'}
        >
          {children}
        </GiSideNav>
      </SideNavContext.Provider>
    );
  },
);

type SideNavContextType = {
  openItemIds: string[];
  setOpenItemIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedItemId?: string;
  setSelectedItemId: (id: string) => void;
  navId: string;
  depth: number;
};

const SideNavContext = React.createContext<SideNavContextType | undefined>(undefined);

function useSideNavContext() {
  const context = React.useContext(SideNavContext);
  if (!context) {
    throw new Error('SideNavItem must be used within a SideNav');
  }
  return context;
}

SideNav.displayName = 'SideNav';
SideNavItem.displayName = 'SideNavItem';
