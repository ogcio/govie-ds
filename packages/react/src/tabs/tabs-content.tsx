import { TabItem } from './tab-item.js';
import { TabList } from './tab-list.js';
import { TabPanel } from './tab-panel.js';

export const TabsContent = (
  <>
    <TabList tabName="tab-1">
      <TabItem value="tab1" checked>
        Tab 1
      </TabItem>
      <TabItem value="tab2">Tab 2</TabItem>
      <TabItem value="tab3">Tab 3</TabItem>
    </TabList>
    <TabPanel value="tab1">Tab 1 Content</TabPanel>
    <TabPanel value="tab2">Tab 2 Content</TabPanel>
    <TabPanel value="tab3">Tab 3 Content</TabPanel>
  </>
);
