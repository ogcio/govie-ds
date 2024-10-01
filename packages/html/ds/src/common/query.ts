export function createQuery({ element }: { element: Element }) {
  return {
    getByElement: ({ name }: { name: string }) => {
      const elements = element.querySelectorAll(`[data-element="${name}"]`);

      if (elements.length > 1) {
        throw new Error(
          `More than one element with 'data-element="${name}"' found.`,
        );
      }

      return elements[0];
    },
    getByData: ({ data }: { data: string }) => {
      const elements = element.querySelectorAll(`[data-${data}]`);

      if (elements.length === 0) {
        throw new Error(`No elements with 'data-${data}' found.`);
      }

      if (elements.length > 1) {
        throw new Error(`More than one element with 'data-${data}' found.`);
      }

      return elements[0];
    },
  };
}

export type Query = ReturnType<typeof createQuery>;
