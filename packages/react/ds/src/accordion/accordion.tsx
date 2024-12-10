import { AccordionItem } from './accordion-item.js';

type Props = {
  children: React.ReactElement<typeof AccordionItem>[];
  iconStart?: boolean;
};

export const Accordion = ({ children, iconStart }: Props) => {
  return (
    <div data-icon-start={iconStart} className="gi-max-w-[700px]">
      {children}
    </div>
  );
};
