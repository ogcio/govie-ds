import { useEffect } from 'react';
import { Icon } from '../../icon/icon.js';
import ReactDOMClient from 'react-dom/client';

type SloTProps = {
  item: any;
  index: number;
};

export const addNewGovieHeaderSlotElement = ({ index, item }: SloTProps) => {
  const parent = document.getElementById('GovieHeader');

  if (parent) {
    const childNode = document.createElement('div');
    childNode.id = `SlotContainer-${index}`;
    childNode.setAttribute('data-index', index.toString());
    childNode.className = 'gi-hidden gi-bg-gray-50 gi-p-4';

    parent.appendChild(childNode);
    const root = ReactDOMClient.createRoot(childNode);
    root.render(item.slot);

    return () => {
      root.unmount();
      parent.removeChild(childNode);
    };
  }
};

const SlotContainer = ({ index, item }: SloTProps) => {
  useEffect(() => {
    addNewGovieHeaderSlotElement({ index, item });
  }, []);

  return null;
};

const SlotAction = ({ item, index }: SloTProps) => {
  return (
    <label
      htmlFor={`ItemActionTrigger-${index}`}
      className={'gi-header-tool-item'}
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
