import { useState } from 'react';
import { cn } from '../../cn.js';
import { DrawerBody, DrawerWrapper } from '../../drawer/drawer.js';
import { Icon, IconId } from '../../icon/icon.js';
import { HeaderSlotItemType } from '../header.js';

type SlotProps = {
  item: {
    slot: HeaderSlotItemType;
    label?: string;
    icon?: IconId;
  };
  index: number;
};
type SlotContainerProps = {
  slot: React.ReactNode;
  index: number;
};

export const SlotContainer = ({ index, slot }: SlotContainerProps) => (
  <div
    id={`SlotContainer-${index}`}
    data-index={index}
    className="gi-hidden gi-bg-gray-50 gi-py-4 gi-px-4 gi-border-b-2xl gi-border-b-emerald-800"
  >
    {slot}
  </div>
);

const DrawerTrigger = ({ index, label, icon, component, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <label
        htmlFor={`ItemActionDrawerTrigger-${index}`}
        className="gi-header-tool-item"
        onClick={() => setIsOpen(true)}
        {...props}
      >
        <input
          data-testid={`ItemActionDrawerTrigger-${index}`}
          className="gi-block gi-w-0 gi-absolute gi-h-0"
          id={`ItemActionDrawerTrigger-${index}`}
          data-index={index}
          type="checkbox"
        />
        {label && <span className="label">{label}</span>}
        {icon && (
          <Icon
            className={cn({
              'gi-hidden': isOpen,
              'gi-block': !isOpen,
            })}
            icon={icon}
            id={`ItemIconDrawerActionTrigger-${index}`}
          />
        )}
        <Icon
          className={cn({
            'gi-hidden': !isOpen,
            'gi-block': isOpen,
          })}
          id={`ItemCloseTrigger-${index}`}
          icon="close"
        />
      </label>
      <DrawerWrapper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        closeButtonLabel="Close"
      >
        <DrawerBody>{component}</DrawerBody>
      </DrawerWrapper>
    </>
  );
};

export const SlotItemAction = ({
  item: { label, icon, slot },
  index,
}: SlotProps) => {
  const { slotAppearance = 'dropdown', component } = slot;

  if (slotAppearance === 'drawer') {
    return (
      <DrawerTrigger
        index={index}
        label={label}
        icon={icon}
        component={component}
      />
    );
  }

  return (
    <label
      htmlFor={`ItemActionTrigger-${index}`}
      className="gi-header-tool-item"
    >
      <input
        data-testid={`ItemActionTrigger-${index}`}
        className="gi-block gi-w-0 gi-absolute gi-h-0"
        id={`ItemActionTrigger-${index}`}
        data-index={index}
        type="checkbox"
      />
      {label && <span className="label">{label}</span>}
      {icon && <Icon icon={icon} id={`ItemIconActionTrigger-${index}`} />}
      <Icon
        className="gi-hidden close-icon"
        id={`ItemCloseTrigger-${index}`}
        icon="close"
      />
    </label>
  );
};
