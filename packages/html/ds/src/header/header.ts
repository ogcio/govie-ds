import { instances } from './instances';

function createQuery({ element }: { element: Element }) {
  return {
    getByElement: ({ name }: { name: string }) => {
      const elements = element.querySelectorAll(`[data-element="${name}"]`);

      if (elements.length === 0) {
        throw new Error(`No elements with 'data-element="${name}"' found.`);
      }

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

type Query = ReturnType<typeof createQuery>;

function initialiseModule({
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

// const instances = new Map<any, Map<any, any>>();

type InstanceOptions = {
  id?: string;
  element: Element;
};

export function createInstance<T>(classType: string, options: InstanceOptions) {
  instances.addInstance('Header', new Header(options), options.id, true);
}

export function destroyInstance({
  classType,
  id,
}: {
  classType: 'Header';
  id: string;
}) {
  instances.destroyAndRemoveInstance(classType, id);
}

export function destroyAllInstances() {
  instances.destroyAndRemoveAllInstances();
}

export abstract class Component {
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

export class Header extends Component {
  searchIcon: Element;
  searchContainer: Element;

  searchIconHandler: EventListenerOrEventListenerObject;

  constructor({ element }: { element: Element }) {
    super({ element });

    this.searchIcon = this.query.getByElement({ name: 'search' });

    this.searchContainer = this.query.getByElement({
      name: 'container',
    });

    this.searchIconHandler = (event: Event) => {
      event.stopPropagation();

      const classList = this.searchContainer.classList;
      classList.toggle('js:gi-max-height');
      classList.toggle('gi-max-h-0');
      classList.toggle('gi-opacity-0');
    };

    this.init();
  }

  initComponent() {
    this.searchIcon.addEventListener('click', this.searchIconHandler);
  }

  destroyComponent(): void {
    this.searchIcon.removeEventListener('click', this.searchIconHandler);
  }
}

export const initHeader = initialiseModule({
  name: 'header',
  classType: Header,
});
