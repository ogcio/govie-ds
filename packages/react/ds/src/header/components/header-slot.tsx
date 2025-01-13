import { Icon } from '../../icon/icon.js';

type SlotProps = {
  item: {
    slot: React.ReactNode;
    label?: string;
    icon?: string;
  };
  index: number;
};
type SlotContainerProps = {
  slot: React.ReactNode;
  index: number;
};

export const SlotContainer = ({ index, slot }: SlotContainerProps) => (
  <div
    id={`SlotContainer-${index + 1}`}
    data-index={index}
    className="gi-hidden gi-bg-gray-50 gi-py-4 gi-px-4 gi-border-b-2xl gi-border-b-emerald-800"
  >
    {slot}
  </div>
);

export const SlotItemAction = ({ item: { label, icon }, index }: SlotProps) => {
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
      <Icon icon={icon || 'search'} id={`ItemIconActionTrigger-${index}`} />
      <Icon
        className="gi-hidden close-icon"
        id={`ItemCloseTrigger-${index}`}
        icon="close"
      />
    </label>
  );
};
