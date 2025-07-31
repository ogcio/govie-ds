'use client';
import {
  useState,
  useEffect,
  Children,
  isValidElement,
  ReactNode,
} from 'react';
import { InternalTabItem } from './tab-item.js';
import { TabItemProps } from './types.js';

export const TabList = ({
  children,
  tabName,
  variant,
  size,
  ariaLabelledBy,
}: {
  tabName?: string;
  variant?: 'primary' | 'neutral';
  size?: 'sm' | 'md';
  ariaLabelledBy?: string;
  children: ReactNode;
}) => {
  /*
  Prefer using this wrapper to handle indicator animation.
  return <ScrollableTabs children={children} variant={variant} tabName={tabName} />
  */

  const [activeTab, setActiveTab] = useState<number | null>(null);
  const tabCount = Children.count(children);

  useEffect(() => {
    let foundCheckedTab = false;
    let checkedIndex = 0;

    Children.forEach(children, (child, index) => {
      if (
        isValidElement<TabItemProps>(child) &&
        'checked' in child.props &&
        child.props.checked === true
      ) {
        checkedIndex = index;
        foundCheckedTab = true;
      }
    });

    setActiveTab(foundCheckedTab ? checkedIndex : 0);
  }, []);

  const handleOnTabClick =
    (
      index: number,
      originalHandler?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      ) => void,
    ) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setActiveTab(index);

      const tabs = document.querySelector(`#${tabName}`) as HTMLElement;

      const tabPanels: HTMLElement[] = [
        ...tabs.querySelectorAll(`[role=tabpanel]`),
      ] as HTMLElement[];

      for (const tabPanel of tabPanels) {
        tabPanel.style.display = 'none';
      }
      const ariaControlAttribute =
        event.currentTarget.getAttribute('aria-controls');
      if (!ariaControlAttribute) {
        return;
      }

      const tabpanel = document.querySelector(
        `#${ariaControlAttribute}`,
      ) as HTMLElement;

      tabpanel.style.display = 'block';

      if (originalHandler) {
        originalHandler(event);
      }
    };

  const handleOnTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    let flag = false;

    switch (event.key) {
      case 'ArrowLeft': {
        let newTab = (activeTab ?? 0) - 1;
        if (newTab < 0) {
          newTab = 0;
        }
        setActiveTab(newTab);
        flag = true;
        break;
      }

      case 'ArrowRight': {
        let newTab = (activeTab ?? 0) + 1;
        if (newTab >= tabCount) {
          newTab = tabCount - 1;
        }
        setActiveTab(newTab);
        flag = true;
        break;
      }

      default: {
        break;
      }
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const childrenWithName = Children.map(children, (element, index) => {
    if (isValidElement<TabItemProps>(element)) {
      return (
        <InternalTabItem
          {...element.props}
          variant={variant}
          size={size}
          index={index}
          checked={activeTab === index}
          onTabKeyDown={handleOnTabKeyDown}
          onTabClick={handleOnTabClick(index, element?.props?.onTabClick)}
        />
      );
    }

    return null;
  });

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="gi-tab-list"
      aria-labelledby={ariaLabelledBy}
      id={`${tabName}-list`}
    >
      {children && Children.count(childrenWithName) > 0 ? (
        childrenWithName
      ) : (
        <div className="gi-sr-only">No content available for this tab.</div>
      )}
    </div>
  );
};
