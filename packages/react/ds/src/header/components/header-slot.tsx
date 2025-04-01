import { useState } from 'react';
import { cn } from '../../cn.js';
import { DrawerBody, DrawerWrapper } from '../../drawer/drawer.js';
import { Icon } from '../../icon/icon.js';
import { Input } from '../../primitives/input.js';
import { HeaderItem } from '../types.js';
import { translate as t } from '../../i18n/util.js';

type HeaderSlotProps = {
  item: HeaderItem;
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
    aria-label={t('header.headerSlot', {
      index: index + 1,
      defaultValue: `Slot Container ${index + 1}`,
    })}
    className="gi-hidden gi-bg-gray-50 gi-py-4 gi-px-4 gi-border-b-2xl gi-border-b-emerald-800 gi-order-3"
  >
    {slot}
  </div>
);

const DrawerTrigger = ({
  index,
  item: { component, drawerPosition, icon, label },
}: HeaderSlotProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <label
        htmlFor={`ItemActionDrawerTrigger-${index}`}
        className="gi-header-tool-item"
        onClick={() => setIsOpen(true)}
      >
        <Input
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

export const SlotItemAction = ({ item, index }: HeaderSlotProps) => {
  if (item.slotAppearance === 'drawer') {
    return <DrawerTrigger index={index} item={item} />;
  }

  return (
    <label
      htmlFor={`ItemActionTrigger-${index}`}
      aria-label={t('header.toggleActionItem', {
        item: item.label || `item ${index + 1}`,
        defaultValue: `Toggle item action for ${item.label || `item ${index + 1}`}`,
      })}
      className="gi-header-tool-item"
      data-label-index={index}
    >
      <Input
        data-testid={`ItemActionTrigger-${index}`}
        id={`ItemActionTrigger-${index}`}
        data-index={index}
        aria-expanded="false"
        aria-controls={`SlotContainer-${index + 1}`}
        type="checkbox"
      />
      {item.label && <span className="label">{item.label}</span>}
      {item.icon && (
        <Icon
          icon={item.icon}
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
