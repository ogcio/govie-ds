export function createEvents({
  type,
  functions = [],
}: {
  type: string;
  functions: EventListener[];
}) {
  function init() {
    for (const eventFunction of functions) {
      if (globalThis.window !== undefined) {
        globalThis.window.addEventListener(type, eventFunction);
      }
    }
  }

  return {
    init,
  };
}
