const hidden = 'gi-hidden';
const block = 'gi-block';

const getElements = () => {
  const itemSlotActions = document.querySelectorAll(
    "[id^='ItemActionTrigger-']",
  );
  const slotContainers = document.querySelectorAll("[id^='SlotContainer-']");
  const searchTrigger = document.querySelector(
    `#SearchTrigger`,
  ) as HTMLInputElement;

  return {
    itemSlotActions,
    slotContainers,
    searchTrigger,
  };
};

export const attachEventsToItemActionTriggers = () => {
  const { itemSlotActions, slotContainers, searchTrigger } = getElements();

  if (itemSlotActions.length > 0) {
    const toggleIcons = (
      currentTrigger: HTMLInputElement,
      fromFilteredItems?: boolean,
      fromSearchTrigger?: boolean,
    ) => {
      const index = currentTrigger.dataset.index || '';
      const icon = document.querySelector(
        `#ItemIconActionTrigger-${index}`,
      ) as HTMLInputElement;
      const closeIcon = document.querySelector(
        `#ItemCloseTrigger-${index}`,
      ) as HTMLInputElement;
      const { itemSlotActions } = getElements();
      const slot = document.querySelector(
        `#SlotContainer-${index}`,
      ) as HTMLInputElement;

      if (!fromFilteredItems || fromSearchTrigger) {
        for (const container of slotContainers) {
          container.classList.remove(block);
          container.classList.add(hidden);
        }
      }

      if (currentTrigger.dataset.open === 'false' && !fromFilteredItems) {
        icon.classList.add(hidden);
        closeIcon.classList.add(block);
        closeIcon.classList.remove(hidden);

        slot.classList.remove(hidden);
        slot.classList.add(block);

        currentTrigger.dataset.open = 'true';
      } else {
        closeIcon.classList.add(hidden);
        closeIcon.classList.remove(block);
        icon.classList.add(block);
        icon.classList.remove(hidden);

        currentTrigger.dataset.open = 'false';
        return;
      }

      const filteredItems = [...itemSlotActions].filter(
        (element) => element.id !== currentTrigger.id,
      );

      for (const element of filteredItems) {
        const elementItem = element as HTMLInputElement;
        elementItem.dataset.open = 'false';
        toggleIcons(elementItem, true);
      }
    };

    const handleClick = (event: Event) => {
      const customEvent = event as CustomEvent;
      const fromFilteredItems = customEvent?.detail?.fromFilteredItems;
      const fromSearchTrigger = customEvent?.detail?.fromSearchTrigger;
      const target = event.target as HTMLInputElement;

      toggleIcons(target, fromFilteredItems, fromSearchTrigger);

      if (searchTrigger?.checked && target?.checked) {
        searchTrigger.checked = false;
        searchTrigger.dispatchEvent(new Event('click', { bubbles: true }));
      }
    };

    for (const container of itemSlotActions) {
      (container as HTMLInputElement).dataset.open = 'false';
      container?.addEventListener('click', handleClick);
    }

    return () => {
      for (const container of itemSlotActions) {
        container?.removeEventListener('click', handleClick);
      }
    };
  }
};
