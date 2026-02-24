import { useState } from 'react';
import { cn } from '../../cn.js';
import { DrawerBody, DrawerWrapper } from '../../drawer/drawer.js';
import { translate as t } from '../../i18n/utility.js';
import { Icon } from '../../icon/icon.js';
import { Input } from '../../primitives/input.js';
import type { HeaderAppearance, HeaderItem } from '../types.js';
import {
  headerSlotContainerVariants,
  headerToolItemVariants,
} from '../variants.js';

type HeaderSlotProps = {
  item: HeaderItem;
  index: number;
  appearance: HeaderAppearance;
};
type HeaderSlotContainerProps = {
  slot: React.ReactNode;
  index: number;
  appearance: HeaderAppearance;
};

export const SlotContainer = ({
  index,
  slot,
  appearance,
}: HeaderSlotContainerProps) => (
  <div
    id={`SlotContainer-${index}`}
    data-testid={`SlotContainer-${index}`}
    data-index={index}
    aria-label={t('header.headerSlot', {
      index: index + 1,
      defaultValue: `Slot Container ${index + 1}`,
    })}
    className={cn(headerSlotContainerVariants({ appearance }), 'gi-hidden')}
  >
    {slot}
  </div>
);

const DrawerTrigger = ({
  index,
  item: { component, drawerPosition, icon, label, ariaLabel, closeLabel },
  appearance,
}: HeaderSlotProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <label
        htmlFor={`ItemActionDrawerTrigger-${index}`}
        className={headerToolItemVariants({ appearance })}
        onClick={() => setIsOpen(true)}
      >
        <Input
          data-testid={`ItemActionDrawerTrigger-${index}`}
          className="gi-header-tool-item-input"
          id={`ItemActionDrawerTrigger-${index}`}
          data-index={index}
          aria-label={ariaLabel || label || ''}
          type="checkbox"
        />
        {label && (
          <span
            id={`ItemActionDrawerTrigger-${index}-label`}
            className="label"
            aria-hidden={ariaLabel ? 'true' : 'false'}
          >
            {label}
          </span>
        )}
        {icon && (
          <Icon
            className={cn({
              'gi-hidden': isOpen,
              'gi-block': !isOpen,
            })}
            icon={icon}
            id={`ItemIconDrawerActionTrigger-${index}`}
            ariaHidden={true}
          />
        )}
        <Icon
          className={cn({
            'gi-hidden': !isOpen,
            'gi-block': isOpen,
          })}
          id={`ItemCloseTrigger-${index}`}
          ariaHidden={true}
          data-testid={`ItemCloseTrigger-${index}`}
          icon="close"
        />
      </label>
      <DrawerWrapper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={drawerPosition || 'right'}
        closeButtonLabel={t('header.drawer.close', {
          defaultValue: closeLabel || 'Close',
        })}
        closeButtonSize="large"
      >
        <DrawerBody>{component}</DrawerBody>
      </DrawerWrapper>
    </>
  );
};

export const SlotItemAction = ({
  item,
  index,
  appearance,
}: HeaderSlotProps) => {
  if (item.slotAppearance === 'drawer') {
    return <DrawerTrigger index={index} item={item} appearance={appearance} />;
  }

  return (
    <label
      htmlFor={`ItemActionTrigger-${index}`}
      aria-label={t('header.toggleActionItem', {
        item: item.label || `item ${index + 1}`,
        defaultValue: `Toggle item action for ${item.label || `item ${index + 1}`}`,
      })}
      className={headerToolItemVariants({ appearance })}
      data-label-index={index}
    >
      <Input
        data-testid={`ItemActionTrigger-${index}`}
        id={`ItemActionTrigger-${index}`}
        className="gi-header-tool-item-input"
        data-index={index}
        aria-expanded="false"
        aria-controls={`SlotContainer-${index + 1}`}
        type="button"
      />
      {item.label && <span className="label">{item.label}</span>}
      {item.icon && (
        <Icon
          icon={item.icon}
          ariaHidden={true}
          id={`ItemIconActionTrigger-${index}`}
        />
      )}
      <Icon
        className="gi-hidden close-icon"
        ariaHidden={true}
        id={`ItemCloseTrigger-${index}`}
        icon="close"
        data-testid={`ItemCloseTrigger-${index}`}
        // TODO: temporary fix of icons interaction
        useFontIcon={true}
      />
    </label>
  );
};
