'use client';
import {
  useState,
  useEffect,
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
} from 'react';
import { TabItemProps } from './tab-item.js';

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

  const onTabSelected = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
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
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
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

  const onTabClick = (index: number) => {
    setActiveTab(index);
  };

  const childrenWithName = Children.map(children, (element, index) => {
    if (
      isValidElement<{
        index: number;
        checked: boolean;
        onTabSelected: (
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => void;
        onTabClick: (index: number) => void;
        onTabKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
      }>(element)
    ) {
      return cloneElement<{
        index: number;
        checked: boolean;
        onTabSelected: (
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => void;
        onTabClick: (index: number) => void;
        onTabKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
      }>(element, {
        index,
        checked: activeTab === index,
        onTabClick,
        onTabKeyDown,
        onTabSelected,
      });
    }
    return element;
  });

  return (
    <div role="tablist" className="gi--mb-[1px]">
      {childrenWithName}
    </div>
  );
};
