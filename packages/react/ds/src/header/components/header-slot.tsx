import { useEffect } from 'react';
import ReactDOMClient from 'react-dom/client';
import { Icon } from '../../icon/icon.js';

type SloTProps = {
  item: {
    slot: React.ReactNode;
    label?: string;
    icon?: string;
  };
  index: number;
};

export const addNewGovieHeaderSlotElement = ({ index, item }: SloTProps) => {
  const parent = document.querySelector('#GovieHeader');

  if (parent) {
    const childNode = document.createElement('div');
    childNode.id = `SlotContainer-${index}`;
    childNode.dataset.index = index.toString();
    childNode.className = 'gi-hidden gi-bg-gray-50 gi-p-4';

    parent.append(childNode);
    const root = ReactDOMClient.createRoot(childNode);
    root.render(item.slot);

    return () => {
      root.unmount();
      childNode.remove();
    };
  }
};

const SlotContainer = ({ index, item }: SloTProps) => {
  useEffect(() => {
    const cleanup = addNewGovieHeaderSlotElement({ index, item });
    return cleanup;
  }, [index, item]);

  return null;
};

const SlotAction = ({ item, index }: SloTProps) => {
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
      {item.label && <span className="label">{item.label}</span>}
      <Icon
        icon={item.icon || 'search'}
        id={`ItemIconActionTrigger-${index}`}
      />
      <Icon
        className="gi-hidden close-icon"
        id={`ItemCloseTrigger-${index}`}
        icon="close"
      />
    </label>
  );
};

export const Slot = ({ ...props }: SloTProps) => {
  return (
    <>
      <SlotAction {...props} />
      <SlotContainer {...props} />
    </>
  );
};
