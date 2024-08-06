type Selector = (element: Element) => NodeListOf<Element>;

function createQuery({ element }: { element: Element }) {
  function getElement({
    selector,
    noElements,
    multipleElements,
  }: {
    selector: Selector;
    noElements: () => never;
    multipleElements: () => never;
  }) {
    const elements = selector(element);

    if (elements.length === 0) {
      noElements();
    }

    if (elements.length > 1) {
      multipleElements();
    }

    return elements[0];
  }

  return {
    getByElement: ({ name }: { name: string }) => {
      return getElement({
        selector: (element) =>
          element.querySelectorAll(`[data-element="${name}"]`),
        noElements: () => {
          throw new Error(`No elements with 'data-element="${name}"' found.`);
        },
        multipleElements: () => {
          throw new Error(
            `More than one element with 'data-element="${name}"' found.`,
          );
        },
      });
    },
    getByData: ({ data }: { data: string }) => {
      return getElement({
        selector: (element) => element.querySelectorAll(`[data-${data}]`),
        noElements: () => {
          throw new Error(`No elements with 'data-${data}' found.`);
        },
        multipleElements: () => {
          throw new Error(`More than one element with 'data-${data}' found.`);
        },
      });
    },
  };
}

export function initHeader() {
  const headerElements = document.querySelectorAll(
    '[data-module="gieds-header"]',
  );

  for (const headerElement of headerElements) {
    const query = createQuery({ element: headerElement });

    const searchIcon = query.getByElement({ name: 'search' });
    const searchContainer = query.getByElement({
      name: 'container',
    });

    searchIcon.addEventListener('click', () => {
      const isExpanded = !searchContainer.classList.contains('js:gi-hidden');

      if (isExpanded) {
        searchContainer.classList.add('js:gi-hidden');
        return;
      }

      searchContainer.classList.remove('js:gi-hidden');
    });
  }
}
