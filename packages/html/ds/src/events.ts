export function createEvents({
  type,
  functions = [],
}: {
  type: string;
  functions: EventListener[];
}) {
  function init() {
    for (const eventFunction of functions) {
      if (typeof window !== 'undefined') {
        window.addEventListener(type, eventFunction);
      }
    }
  }

  return {
    init,
  };
}
