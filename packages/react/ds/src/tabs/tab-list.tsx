'use client';
import { useState, useEffect, Children, isValidElement } from 'react';
import { cn } from '../cn.js';
import { InternalTabItem } from './tab-item.js';
import {
  TabItemProps,
  TabKeyboardEvent,
  TabListProps,
  TabMouseClickEvent,
} from './types.js';

export const TabList = ({
  children,
  tabName,
  appearance,
  size,
  ariaLabelledBy,
  stretch,
  padding = true,
  labelAlignment,
}: TabListProps) => {
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

  const getTabSection = (): HTMLElement | null => {
    const section = document.querySelector(`#${tabName}`);
    if (!section) {
      return null;
    }
    return section as HTMLElement;
  };

  const showPanelByTabIndex = (tabIndex: number): void => {
    const tabSection = getTabSection();
    if (!tabSection) {
      return;
    }

    const tabPanels =
      tabSection.querySelectorAll<HTMLElement>('[role="tabpanel"]');

    for (const tabPanel of tabPanels) {
      tabPanel.style.display = 'none';
      tabPanel.setAttribute('aria-hidden', 'true');
    }

    const tabElements = [
      ...tabSection.querySelectorAll<HTMLElement>('[role="tab"]'),
    ];

    const selectedTab = tabElements.find((tabElement) => {
      const index =
        tabElement.dataset.index ?? tabElement.getAttribute('index');

      if (index === null) {
        return;
      }

      return Number(index) === tabIndex;
    });

    if (!selectedTab) {
      return;
    }

    const controlsId = selectedTab.getAttribute('aria-controls');
    if (!controlsId) {
      return;
    }

    const targetPanel = tabSection.querySelector<HTMLElement>(`#${controlsId}`);

    if (!targetPanel) {
      return;
    }

    targetPanel.style.display = 'block';
    targetPanel.setAttribute('aria-hidden', 'false');
  };

  useEffect(() => {
    showPanelByTabIndex(activeTab ?? 0);
  }, [activeTab]);

  const handleOnTabClick =
    (index: number, originalHandler?: (event: TabMouseClickEvent) => void) =>
    (event: TabMouseClickEvent) => {
      setActiveTab(index);
      if (originalHandler) {
        originalHandler(event);
      }
    };

  const handleOnTabKeyDown = (event: TabKeyboardEvent) => {
    let direction = 0;

    if (event.key === 'ArrowLeft') {
      direction = -1;
    } else if (event.key === 'ArrowRight') {
      direction = 1;
    }

    if (direction === 0) {
      return;
    }

    const currentIndex = activeTab ?? 0;
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = 0;
    }

    if (newIndex >= tabCount) {
      newIndex = tabCount - 1;
    }

    const childrenArray = Children.toArray(children);
    const child = childrenArray[newIndex] as any;

    if (!child) {
      return;
    }

    setActiveTab(newIndex);

    const syntheticEvent = {
      currentTarget: {
        getAttribute: (name: string) => {
          if (name === 'aria-controls') {
            return `tab-panel-${child?.props?.value}`;
          }
          return null;
        },
      },
      bubbles: true,
      isTrusted: true,
    } as unknown as React.MouseEvent<HTMLButtonElement>;

    const onClickHandler = () => {
      if (direction === -1) {
        return child.props?.onTabClick?.(event);
      }
      return event;
    };

    handleOnTabClick(newIndex, onClickHandler)(syntheticEvent);

    event.stopPropagation();
    event.preventDefault();
  };

  const childrenWithName = Children.map(children, (element, index) => {
    if (isValidElement<TabItemProps>(element)) {
      return (
        <InternalTabItem
          {...element.props}
          appearance={appearance}
          stretch={stretch}
          labelAlignment={labelAlignment}
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
      className={cn('gi-tab-list', {
        'gi-tab-list-stretch': stretch,
        'gi-gap-4': padding,
        'gi-gap-0': !padding,
      })}
      aria-labelledby={ariaLabelledBy}
      id={`${tabName}-list`}
    >
      {childrenWithName}
    </div>
  );
};
