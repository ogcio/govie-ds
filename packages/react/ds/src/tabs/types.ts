import { ReactNode } from 'react';
import { IconId } from '../icon/icon.js';

type TabAppearanceType = 'default' | 'dark';
type TabLabelAlignmentType = 'start' | 'end' | 'center';

export type TabsProps = {
  /** ID of the tabs container */
  id?: string;
  /** ID of the element that labels the tabs (required for accessibility) */
  ariaLabelledBy: string;
  /** Test ID for the tabs container */
  dataTestid?: string;
  /** Visual appearance of the tabs. */
  appearance?: TabAppearanceType;
  /** Size of the tabs. Default: md */
  size?: 'sm' | 'md';
  /** if true all the tabs will space equally covering full available width. Default: false */
  stretch?: boolean;
  /** if true all the tabs will space equally covering full available width. Default: true */
  padding?: boolean;
  /** Property to set the label alignment. Default: start */
  labelAlignment?: TabLabelAlignmentType;
  /** TabList, TabItem, and TabPanel components */
  children: React.ReactNode;
};

export type TabItemProps = {
  /** Optional href to render the tab as a link */
  href?: string;
  /** Whether the tab is currently selected */
  checked?: boolean;
  /** Accessible label for the tab */
  ariaLabel?: string;
  /** ID of the element that labels the tab */
  ariaLabelledby?: string;
  /** Unique identifier for the tab */
  value: string;
  /** Tab label text */
  children: string;
  /** Optional click event handler for the tab */
  onTabClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: IconId;
};

export type TabPanelProps = {
  /** The value used to associate the panel with its corresponding tab */
  value: string;
  /** Content to be rendered inside the tab panel */
  children: React.ReactNode;
};

export type TabListProps = {
  tabName?: string;
  appearance?: TabAppearanceType;
  size?: 'sm' | 'md';
  ariaLabelledBy?: string;
  stretch?: boolean;
  padding?: boolean;
  children: ReactNode;
  labelAlignment?: TabLabelAlignmentType;
};

export type InternalTabItemProps = TabItemProps & {
  onTabKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  index: number;
  appearance?: TabAppearanceType;
  size?: 'md' | 'sm';
  stretch?: boolean;
  labelAlignment?: TabLabelAlignmentType;
};
