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
            forceClose: true,
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
    const handleToggleSlot = (index: string, forceClose: boolean) => {
      for (const container of slotContainers) {
        const containerIndex =
          (container as HTMLInputElement).dataset.index || '';

        if (containerIndex === index) {
          if (container.classList.contains(hidden) && !forceClose) {
            container.classList.remove(hidden);
            container.classList.add(block);
          } else {
            container.classList.remove(block);
            container.classList.add(hidden);
          }
        }
      }
    };

    const toggleIcons = (
      currentTrigger: HTMLInputElement,
      forceClose: boolean,
    ) => {
      const index = currentTrigger.dataset.index || '';
      const icon = document.querySelector(
        `#ItemIconActionTrigger-${index}`,
      ) as HTMLInputElement;
      const closeIcon = document.querySelector(
        `#ItemCloseTrigger-${index}`,
      ) as HTMLInputElement;
      const { itemSlotActions } = getElements();

      handleToggleSlot(index, forceClose);

      if (currentTrigger.checked && !forceClose) {
        icon.classList.add(hidden);
        closeIcon.classList.add(block);
        closeIcon.classList.remove(hidden);
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
              forceClose: true,
            },
          }),
        );
      }
    };

    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const forceClose = customEvent?.detail?.forceClose;
      const target = event.target as HTMLInputElement;

      toggleIcons(target, forceClose);

      if (searchTrigger.checked && target?.checked) {
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
