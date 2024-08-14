import { createInstance } from './instances';
import { createQuery, Query } from './query';

export abstract class BaseComponent {
  initialised: boolean;
  element: Element;
  query: Query;

  constructor({ element }: { element: Element }) {
    this.element = element;
    this.query = createQuery({ element });

    this.initialised = false;
  }

  init() {
    if (this.initialised) {
      return;
    }

    this.initComponent();

    this.initialised = true;
  }

  destroy() {
    if (!this.initialised) {
      return;
    }

    this.destroyComponent();

    this.initialised = false;
  }

  protected abstract initComponent(): void;

  protected abstract destroyComponent(): void;
}

export function initialiseModule({
  name,
  classType,
}: {
  name: string;
  //initialise: ({ element }: { element: Element }) => void;
  classType: any;
}) {
  return function () {
    const elements = document.querySelectorAll(`[data-module="gieds-${name}"]`);

    for (const element of elements) {
      createInstance(classType, { element });
    }
  };
}
