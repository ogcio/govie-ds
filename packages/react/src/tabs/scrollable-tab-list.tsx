import {
  useState,
  useRef,
  useEffect,
  Children,
  isValidElement,
  ReactNode,
  KeyboardEvent,
  MouseEvent,
  CSSProperties,
  useLayoutEffect,
} from 'react';
import { cn } from '../cn.js';
import { InternalTabItem } from './tab-item.js';
import { TabItemProps, TabKeyboardEvent, TabMouseClickEvent } from './types.js';

type ScrollableTabsProps = {
  children: ReactNode;
  tabName: string;
  appearance?: 'default' | 'dark';
  className?: string;
};

export const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  children,
  tabName,
  className = '',
  appearance = 'default',
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = Children.count(children);

  useEffect(() => {
    let index = 0;
    for (const child of Children.toArray(children)) {
      if (isValidElement<TabItemProps>(child)) {
        if ((child?.props as any).checked) {
          break;
        } else {
          continue;
        }
      }
      index++;
    }
  }, [children]);

  useLayoutEffect(() => {
    const element = tabRefs.current[activeTab];
    const container = containerRef.current;

    if (!element || !container) {
      return;
    }

    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    requestAnimationFrame(() => {
      setIndicatorStyle({
        left: elementRect.left - containerRect.left + container.scrollLeft,
        width: elementRect.width,
      });
      element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    });
  }, [activeTab]);

  const handleClick =
    (index: number, original?: (event: TabMouseClickEvent) => void) =>
    (event: TabMouseClickEvent) => {
      setActiveTab(index);

      if (original) {
        original(event);
      }
      const ariaControl = event.currentTarget.getAttribute('aria-controls');
      if (ariaControl) {
        for (const element of document.querySelectorAll(`[role="tabpanel"]`)) {
          if (element instanceof HTMLElement) {
            element.style.display =
              element.id === ariaControl ? 'block' : 'none';
          }
        }
      }
    };

  const handleKeyDown = (event: TabKeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      let next = activeTab + (event.key === 'ArrowRight' ? 1 : -1);
      if (next < 0) {
        next = 0;
      }
      if (next >= count) {
        next = count - 1;
      }
      setActiveTab(next);
      event.preventDefault();
    }
  };

  const items = Children.map(children, (child: any, index) => {
    if (isValidElement<TabItemProps>(child)) {
      return (
        <InternalTabItem
          {...child?.props}
          appearance={appearance}
          index={index}
          checked={activeTab === index}
          onTabClick={handleClick(index, child.props.onTabClick)}
          onTabKeyDown={handleKeyDown}
          ref={(element: any) => {
            tabRefs.current[index] = element;
          }}
        />
      );
    }
    return null;
  });

  const indicatorCss: CSSProperties = {
    left: indicatorStyle.left,
    width: indicatorStyle.width,
  };

  return (
    <div
      id={tabName}
      ref={containerRef}
      role="tablist"
      className={cn('gi-tab-list ', className)}
    >
      {items}
      <span
        className={cn('gi-tab-indicator', {
          'gi-bg-color-border-system-neutral-interactive-default':
            appearance === 'dark',
          'gi-bg-color-border-tone-primary-accent-selected':
            appearance === 'default',
        })}
        style={indicatorCss}
      />
    </div>
  );
};
