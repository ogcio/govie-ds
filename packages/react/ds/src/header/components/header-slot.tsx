import { useState } from 'react';
import { cn } from '../../cn.js';
import { DrawerBody, DrawerWrapper } from '../../drawer/drawer.js';
import { Icon, IconId } from '../../icon/icon.js';
import { HeaderSlotItemType } from '../types.js';

type HeaderSlotProps = {
  item: {
    slot: HeaderSlotItemType;
    label?: string;
    icon?: IconId;
  };
  index: number;
};
type HeaderSlotContainerProps = {
  slot: React.ReactNode;
  index: number;
};

export const SlotContainer = ({ index, slot }: HeaderSlotContainerProps) => (
  <div
    id={`SlotContainer-${index}`}
    data-index={index}
    aria-label={`Slot Container ${index + 1}`}
    className="gi-hidden gi-bg-gray-50 gi-py-4 gi-px-4 gi-border-b-2xl gi-border-b-emerald-800"
  >
    {slot}
  </div>
);

const DrawerTrigger = ({
  index,
  item: {
    slot: { component, drawerPosition },
    icon,
    label,
  },
}: HeaderSlotProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <label
        htmlFor={`ItemActionDrawerTrigger-${index}`}
        className="gi-header-tool-item"
        onClick={() => setIsOpen(true)}
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
        position={drawerPosition || 'right'}
        closeButtonLabel="Close"
        closeButtonSize="large"
      >
        <DrawerBody>{component}</DrawerBody>
      </DrawerWrapper>
    </>
  );
};

export const SlotItemAction = ({
  item: { label, icon, slot },
  index,
}: HeaderSlotProps) => {
  const { slotAppearance = 'dropdown' } = slot;

  if (slotAppearance === 'drawer') {
    return <DrawerTrigger index={index} item={{ label, icon, slot }} />;
  }

  return (
    <label
      htmlFor={`ItemActionTrigger-${index}`}
      aria-label={`Toggle item action for ${label || `item ${index + 1}`}`}
      className="gi-header-tool-item"
      data-label-index={index}
    >
      <input
        data-testid={`ItemActionTrigger-${index}`}
        className="gi-block gi-w-0 gi-absolute gi-h-0"
        id={`ItemActionTrigger-${index}`}
        data-index={index}
        aria-expanded="false"
        aria-controls={`SlotContainer-${index + 1}`}
        type="checkbox"
      />
      {label && <span className="label">{label}</span>}
      {icon && (
        <Icon
          icon={icon}
          aria-hidden="true"
          id={`ItemIconActionTrigger-${index}`}
        />
      )}
      <Icon
        className="gi-hidden close-icon"
        aria-hidden="true"
        id={`ItemCloseTrigger-${index}`}
        icon="close"
      />
    </label>
  );
};
