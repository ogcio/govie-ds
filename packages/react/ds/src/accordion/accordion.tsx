import { AccordionItem } from './accordion-item.js';

type Props = {
  children: React.ReactElement<typeof AccordionItem>[];
  iconStart?: boolean;
  dataTestid?: string;
};

export const Accordion = ({ children, iconStart, dataTestid }: Props) => {
  return (
    <div
      data-testid={dataTestid}
      data-icon-start={iconStart}
      className="gi-max-w-prose"
      role="presentation"
    >
      {children}
    </div>
  );
};
