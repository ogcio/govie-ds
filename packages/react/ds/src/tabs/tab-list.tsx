'use client';
import {
  useState,
  useEffect,
  Children,
  isValidElement,
  ReactNode,
} from 'react';
import { InternalTabItem, TabItemProps } from './tab-item.js';

export const TabList = ({
  children,
  tabName,
}: {
  tabName?: string;
  children: ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const tabCount = Children.count(children);

  useEffect(() => {
    // Initialize the active tab based on children
    // Find if any child is checked
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

  const handleOnTabSelected =
    (
      originalHandler?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      ) => void,
    ) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  const handleOnTabClick = (index: number) => {
    setActiveTab(index);
  };

  const childrenWithName = Children.map(children, (element, index) => {
    if (isValidElement<TabItemProps>(element)) {
      return (
        <InternalTabItem
          {...element.props}
          index={index}
          checked={activeTab === index}
          onTabKeyDown={handleOnTabKeyDown}
          onTabClick={handleOnTabClick}
          onTabSelected={handleOnTabSelected(element?.props?.onTabSelected)}
        />
      );
    }

    return null;
  });

  return (
    <div role="tablist" className="gi--mb-[1px]">
      {childrenWithName}
    </div>
  );
};
