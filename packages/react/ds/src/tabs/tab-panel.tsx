import { slugify } from '../utilities.js';
import { TabPanelProps } from './types.js';

export function TabPanel({ value, children }: TabPanelProps) {
  const valueSlug = slugify(value);
  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-panel-${valueSlug}`}
      id={`tab-panel-${valueSlug}`}
      tabIndex={0}
      className="gi-tab-panel"
    >
      {children}
    </div>
  );
}
