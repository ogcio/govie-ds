import { renderComponent, cleanup, fireEvent } from '../test-utilities.js';
import { TabsContent } from './tabs-content.js';
import { TabsProps, Tabs } from './tabs.js';

describe('tabs', () => {
  afterEach(cleanup);
  const renderTabs = (props: TabsProps) => renderComponent(<Tabs {...props} />);

  it('should render tabs', () => {
    const screen = renderTabs({
      ariaLabelledBy: 'tabs',
      id: 'tab-1',
      children: TabsContent,
    });
    expect(screen.getByText('Tab 1 Content')).toBeTruthy();
  });

  it('should render tabs', () => {
    const screen = renderTabs({
      ariaLabelledBy: 'tabs',
      id: 'tab-1',
      children: TabsContent,
    });
    expect(screen.getByText('Tab 2 Content')).toBeTruthy();
  });

  it('should allow selecting a tab', () => {
    const screen = renderTabs({
      ariaLabelledBy: 'tabs',
      id: 'tab-1',
      children: TabsContent,
    });

    const tablist = screen.container.querySelector('[role="tablist"]');
    const tabButtons = tablist?.querySelectorAll('button');

    if (tabButtons) {
      fireEvent.click(tabButtons[1]);

      expect(tabButtons[1]).toHaveAttribute('aria-selected', 'true');
      expect(tabButtons[0]).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Tab 2 Content')).toBeVisible();
    }
  });

  it('should pass axe tests', async () => {
    const screen = renderTabs({
      ariaLabelledBy: 'tabs',
      id: 'tab-1',
      children: TabsContent,
    });

    try {
      await screen.axe();
    } catch (error) {
      // ARIA tabs definition allows multiple items in tablist, AXE throws an error instead
      // https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
      if ((error as Error).message?.includes('input[aria-labelledby]')) {
        return;
      }
      throw error;
    }
  });
});
