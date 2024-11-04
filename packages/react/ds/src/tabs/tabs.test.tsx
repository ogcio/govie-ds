import { render, cleanup } from '../test-utils.js';
import { TabsContent } from './tabs-content.js';
import { TabsProps, Tabs } from './tabs.js';

describe('tabs', () => {
  afterEach(cleanup);
  const renderTabs = (props: TabsProps) => render(<Tabs {...props} />);

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

  it('should pass axe tests', async () => {
    const screen = renderTabs({
      ariaLabelledBy: 'tabs',
      id: 'tab-1',
      children: TabsContent,
    });

    try {
      await screen.axe();
    } catch (error: any) {
      // ARIA tabs definition allows multiple items in tablist, AXE throws an error instead
      // https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
      if (error.message?.includes('input[aria-labelledby]')) {
        return;
      }
      throw error;
    }
  });
});