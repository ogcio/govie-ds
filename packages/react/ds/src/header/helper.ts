const hidden = 'gi-hidden';
const block = 'gi-block';

const getElements = () => {
  const itemSlotActions = document.querySelectorAll(
    "[id^='ItemActionTrigger-']",
  );
  const slotContainers = document.querySelectorAll("[id^='SlotContainer-']");
  const searchTrigger = document.getElementById(`SearchTrigger`);

  return {
    itemSlotActions,
    slotContainers,
    searchTrigger,
  };
};

export const attachEventsToItemActionTriggers = () => {
  const { itemSlotActions, slotContainers, searchTrigger } = getElements();

  if (itemSlotActions.length) {
    const handleToggleSlot = (index: string, forceClose: boolean) => {
      // we should show the current one and hide the others
      slotContainers.forEach((container) => {
        const containerIndex = container.getAttribute('data-index') || '';

        if (containerIndex === index) {
          if (container.classList.contains(hidden) && !forceClose) {
            container.classList.remove(hidden);
            container.classList.add(block);
          } else {
            container.classList.remove(block);
            container.classList.add(hidden);
          }
        }
      });
    };

    const toggleIcons = (
      currentTrigger: HTMLInputElement,
      forceClose: boolean,
    ) => {
      const index = currentTrigger.getAttribute('data-index') || '';
      const icon = document.getElementById(
        `ItemIconActionTrigger-${index}`,
      ) as HTMLInputElement;
      const closeIcon = document.getElementById(
        `ItemCloseTrigger-${index}`,
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

      const filteredItems = Array.from(itemSlotActions).filter(
        (element) =>
          (element as HTMLInputElement).checked &&
          element.id !== currentTrigger.id,
      );

      filteredItems.forEach((element) => {
        (element as HTMLInputElement).checked = false;
        element?.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              forceClose: true,
            },
          }),
        );
      });
    };

    const onChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const forceClose = customEvent?.detail?.forceClose;
      const target = e.target as HTMLInputElement;

      toggleIcons(target, forceClose);

      if ((searchTrigger as HTMLInputElement).checked && target?.checked) {
        (searchTrigger as HTMLInputElement).checked = false;
        searchTrigger?.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    itemSlotActions.forEach((container) => {
      if (container) {
        container.addEventListener('change', onChange);
      }
    });

    return () => {
      itemSlotActions.forEach((container) => {
        if (container) {
          container.removeEventListener('change', onChange);
        }
      });
    };
  }
};

export const attachEventsToSearchTrigger = () => {
  const closeAllSlotContainers = (searchTarget: HTMLInputElement) => {
    const { itemSlotActions } = getElements();

    if (searchTarget.checked) {
      itemSlotActions.forEach((container) => {
        const item = container as HTMLInputElement;
        item.checked = false;
        item.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              forceClose: true,
            },
          }),
        );
      });
    }
  };

  const handleOnChange = (e: Event) => {
    closeAllSlotContainers(e.target as HTMLInputElement);
  };

  const searchTrigger = document.getElementById(`SearchTrigger`);

  if (searchTrigger) {
    searchTrigger.addEventListener('change', handleOnChange);
  }

  return () => {
    if (searchTrigger) {
      searchTrigger.removeEventListener('change', handleOnChange);
    }
  };
};
