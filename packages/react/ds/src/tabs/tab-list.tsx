'use client';
import React, { useState } from 'react';

export const TabList = ({
  children,
  tabName,
}: {
  tabName: string;
  children: React.ReactElement;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabCount = React.Children.count(children);

  const onTabFocus = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    const tabs = document.querySelector(`#${tabName}`) as HTMLElement;

    const tabPanels: HTMLElement[] = [
      ...tabs.querySelectorAll(`[role=tabpanel]`),
    ] as HTMLElement[];

    for (const tabPanel of tabPanels) {
      tabPanel.classList.remove('!gi-block');
    }
    const ariaControlAttribute =
      event.currentTarget.getAttribute('aria-controls');
    if (!ariaControlAttribute) {
      return;
    }

    const tabpanel = document.querySelector(
      `#${ariaControlAttribute}`,
    ) as HTMLElement;

    tabpanel.classList.add('!gi-block');
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let flag = false;

    switch (event.key) {
      case 'ArrowLeft': {
        let newTab = activeTab - 1;
        if (newTab < 0) {
          newTab = 0;
        }
        setActiveTab(newTab);
        flag = true;
        break;
      }

      case 'ArrowRight': {
        let newTab = activeTab + 1;
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

  const childrenWithName = React.Children.map(children, (element, index) => {
    if (
      React.isValidElement<{
        index: number;
        checked: boolean;
        onTabFocus: (
          event: React.FocusEvent<HTMLButtonElement, Element>,
        ) => void;
        onTabClick: (index: number) => void;
        onTabKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
      }>(element)
    ) {
      return React.cloneElement<{
        index: number;
        checked: boolean;
        onTabFocus: (
          event: React.FocusEvent<HTMLButtonElement, Element>,
        ) => void;
        onTabClick: (index: number) => void;
        onTabKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
      }>(element, {
        index,
        checked: activeTab === index,
        onTabClick,
        onTabKeyDown,
        onTabFocus,
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
