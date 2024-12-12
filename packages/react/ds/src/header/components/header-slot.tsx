import { useEffect } from 'react';
import ReactDOMClient from 'react-dom/client';
import { Icon } from '../../icon/icon.js';

type SlotProps = {
  item: {
    slot: React.ReactNode;
    label?: string;
    icon?: string;
  };
  index: number;
};

export const addNewGovieHeaderSlotElement = (
  index: number,
  { slot }: { slot: React.ReactNode },
) => {
  const parent = document.querySelector('#GovieHeader');

  if (parent) {
    const childNode = document.createElement('div');
    childNode.id = `SlotContainer-${index}`;
    childNode.dataset.index = index.toString();
    childNode.className =
      'gi-hidden gi-bg-gray-50 gi-px-8 gi-pt-8 gi-pb-14 gi-border-b-2xl gi-border-b-emerald-800';

    parent.append(childNode);
    const root = ReactDOMClient.createRoot(childNode);
    root.render(slot);

    return () => {
      queueMicrotask(() => {
        root.unmount();
        childNode.remove();
      });
    };
  }
};

const SlotContainer = ({ index, item }: SlotProps) => {
  useEffect(() => {
    const cleanup = addNewGovieHeaderSlotElement(index, item);
    return cleanup;
  }, [index, item]);

  return null;
};

const SlotItemAction = ({ item: { label, icon }, index }: SlotProps) => {
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

export const SlotItem = ({ ...props }: SlotProps) => {
  return (
    <>
      <SlotItemAction {...props} />
      <SlotContainer {...props} />
    </>
  );
};
