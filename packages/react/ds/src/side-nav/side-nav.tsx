'use client';
import React, {
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
  memo,
} from 'react';
import { Button } from '../button/button.js';
import { cn } from '../cn.js';
import { Heading } from '../heading/heading.js';
import { Icon, IconId } from '../icon/icon.js';
import { Link } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';
import {
  SideNavHeadingProps,
  SideNavItemProps,
  SideNavProps,
} from './types.js';

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

const ItemContent = memo(
  ({
    icon,
    label,
    showExpandableIcon,
    isOpen,
  }: {
    icon?: IconId;
    label: string;
    showExpandableIcon?: boolean;
    isOpen?: boolean;
  }) => {
    return (
      <>
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
      </>
    );
  },
);

export const SideNavItem: React.FC<
  PropsWithChildren<SideNavItemProps> & { open?: boolean }
> = React.memo(
  ({
    children,
    primary,
    secondary,
    expandable,
    label,
    value,
    icon,
    href,
    asChild,
    open,
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
      const updatedOpenIds = isOpen
        ? openItemIds.filter((id) => id !== value)
        : [...openItemIds, value];
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

    const itemClassName = cn('gi-side-nav-item', {
      'gi-side-nav-item-selected': isSelected,
      'gi-side-nav-item-primary': primary,
      'gi-side-nav-item-secondary': secondary,
    });

    const buttonClassName = cn('gi-side-nav-item', {
      'gi-side-nav-item-selected': isSelected,
      'gi-side-nav-item-primary': primary,
      'gi-side-nav-item-secondary': secondary,
    });

    return (
      <div
        role="group"
        aria-label={`${label} ${primary && expandable ? 'dropdown' : 'item'}`}
      >
        {isNavigable ? (
          <Link
            id={itemId}
            href={href}
            asChild={asChild}
            asButton={{
              variant: 'flat',
              appearance: 'dark',
              size: 'medium',
            }}
            className={itemClassName}
            onClick={handleClick}
          >
            {asChild ? (
              children
            ) : (
              <ItemContent
                icon={icon}
                label={label}
                showExpandableIcon={showExpandableIcon}
                isOpen={isOpen}
              />
            )}
          </Link>
        ) : (
          <Button
            variant="flat"
            appearance="dark"
            size="medium"
            onClick={handleButtonClick}
            className={buttonClassName}
            id={itemId}
          >
            <ItemContent
              icon={icon}
              label={label}
              showExpandableIcon={showExpandableIcon}
              isOpen={isOpen}
            />
          </Button>
        )}

        {expandable && primary && (
          <div
            className={cn(isOpen ? 'gi-side-nav-item-content' : 'gi-hidden')}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);

export const SideNav: React.FC<PropsWithChildren<SideNavProps>> = memo(
  ({ children, className, dataTestid, onChange, value }) => {
    const [openItemIds, setOpenItemIds] = useState<string[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
      value,
    );
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
        <div
          className={cn('gi-side-nav-container', className)}
          data-testid={dataTestid}
        >
          {children}
        </div>
      </SideNavContext.Provider>
    );
  },
);

export const SideNavHeading: React.FC<SideNavHeadingProps> = memo(
  ({ children, secondary, className, ...props }) => {
    const context = React.useContext(SideNavContext);

    if (!context) {
      throw new Error('SideNavHeading must be used within a SideNav');
    }

    return (
      <Heading
        {...props}
        as="h5"
        className={cn(
          'gi-side-nav-heading',
          secondary ? 'gi-px-6' : 'gi-px-3',
          className,
        )}
      >
        {children}
      </Heading>
    );
  },
);

SideNav.displayName = 'SideNav';
SideNavItem.displayName = 'SideNavItem';
SideNavHeading.displayName = 'SideNavHeading';
