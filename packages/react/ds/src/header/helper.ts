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

const closeAllSlotContainers = (searchTarget: HTMLInputElement) => {
  const { itemSlotActions } = getElements();

  if (searchTarget.checked) {
    for (const container of itemSlotActions) {
      const item = container as HTMLInputElement;
      item.checked = false;
      item.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            fromSearchTrigger: true,
          },
        }),
      );
    }
  }
};

const handleSearchChange = (event: Event) => {
  closeAllSlotContainers(event.target as HTMLInputElement);
};

export const attachEventsToItemActionTriggers = () => {
  const { itemSlotActions, slotContainers, searchTrigger } = getElements();

  if (itemSlotActions.length > 0) {
    const toggleIcons = (
      currentTrigger: HTMLInputElement,
      fromFilteredItems: boolean,
      fromSearchTrigger: boolean,
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

      if (currentTrigger.checked && !fromFilteredItems) {
        icon.classList.add(hidden);
        closeIcon.classList.add(block);
        closeIcon.classList.remove(hidden);

        slot.classList.remove(hidden);
        slot.classList.add(block);
      } else {
        closeIcon.classList.add(hidden);
        closeIcon.classList.remove(block);
        icon.classList.add(block);
        icon.classList.remove(hidden);
        return;
      }

      const filteredItems = [...itemSlotActions].filter(
        (element) =>
          (element as HTMLInputElement).checked &&
          element.id !== currentTrigger.id,
      );

      for (const element of filteredItems) {
        (element as HTMLInputElement).checked = false;
        element.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              fromFilteredItems: true,
            },
          }),
        );
      }
    };

    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const fromFilteredItems = customEvent?.detail?.fromFilteredItems;
      const fromSearchTrigger = customEvent?.detail?.fromSearchTrigger;
      const target = event.target as HTMLInputElement;

      toggleIcons(target, fromFilteredItems, fromSearchTrigger);

      if (searchTrigger?.checked && target?.checked) {
        searchTrigger.checked = false;
        searchTrigger.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    for (const container of itemSlotActions) {
      container?.addEventListener('change', handleChange);
    }

    return () => {
      for (const container of itemSlotActions) {
        container?.removeEventListener('change', handleChange);
      }
    };
  }
};

export const attachEventsToSearchTrigger = () => {
  const searchTrigger = document.querySelector(`#SearchTrigger`);

  if (searchTrigger) {
    searchTrigger.addEventListener('change', handleSearchChange);
  }

  return () => {
    if (searchTrigger) {
      searchTrigger.removeEventListener('change', handleSearchChange);
    }
  };
};
