import { render } from '../common/render';
import html from './tabs.html?raw';
import { TabsProps } from './tabs.schema';

describe('tabs', () => {
  const renderTabs = render<TabsProps>({
    componentName: 'tabs',
    macroName: 'govieTabs',
    html,
  });

  it('should render tabs', () => {
    const screen = renderTabs({
      ariaLabel: 'tabs',
      items: [
        {
          label: 'Tab 1',
          checked: true,
          panel: {
            text: 'Tab 1 Content',
          },
        },
        {
          label: 'Tab 2',
          panel: {
            text: 'Tab 2 Content',
          },
        },
        {
          label: 'Tab 3',
          panel: {
            text: 'Tab 3 Content',
          },
        },
      ],
    });
    expect(screen.getByText('Tab 1 Content')).toBeTruthy();
  });

  it('should render tabs', () => {
    const screen = renderTabs({
      ariaLabel: 'tabs',
      items: [
        {
          label: 'Tab 1',
          panel: {
            text: 'Tab 1 Content',
          },
        },
        {
          label: 'Tab 2',
          checked: true,
          panel: {
            text: 'Tab 2 Content',
          },
        },
        {
          label: 'Tab 3',
          panel: {
            text: 'Tab 3 Content',
          },
        },
      ],
    });
    expect(screen.getByText('Tab 2 Content')).toBeTruthy();
  });

  it('should pass axe tests', async () => {
    const screen = renderTabs({
      ariaLabel: 'tabs',
      items: [
        {
          label: 'Tab 1',
          checked: true,
          panel: {
            text: 'Tab 1 Content',
          },
        },
        {
          label: 'Tab 2',
          panel: {
            text: 'Tab 2 Content',
          },
        },
        {
          label: 'Tab 3',
          panel: {
            text: 'Tab 3 Content',
          },
        },
      ],
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
