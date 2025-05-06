export type TabsProps = {
  items: Array<{
    label: string;
    href?: string;
    checked?: boolean;
    panel: {
      content?: string;
    };
    id: string;
  }>;
  id: string;
  ariaLabelledBy: string;
  dataTestid?: string;
};
