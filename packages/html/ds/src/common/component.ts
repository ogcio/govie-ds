import { createQuery, Query } from './query';

export type BaseComponentOptions = {
  element: Element;
  id?: string;
  override?: boolean;
};

export abstract class BaseComponent<TOptions extends BaseComponentOptions> {
  initialised: boolean;
  options: TOptions;
  query: Query;

  constructor(options: TOptions) {
    this.options = options;
    this.query = createQuery({ element: options.element });

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
