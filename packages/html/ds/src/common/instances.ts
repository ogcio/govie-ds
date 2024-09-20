import { Checkboxes } from '../checkbox/checkbox';
import { Header } from '../header/header';
import { BaseComponent, BaseComponentOptions } from './component';

function generateRandomId() {
  return Math.random().toString(36).slice(2, 11);
}

const componentRegistry = {
  Header,
  Checkboxes,
  // TODO: additional component classes
} as const;

export type ComponentRegistryKey = keyof typeof componentRegistry;

class Instances {
  private _instances: {
    [key: string]: { [id: string]: BaseComponent<BaseComponentOptions> };
  };

  constructor() {
    this._instances = {};

    for (const key of Object.keys(componentRegistry)) {
      this._instances[key] = {};
    }
  }

  addInstance<TOptions extends BaseComponentOptions>({
    component,
    instance,
    options,
  }: {
    component: ComponentRegistryKey;
    instance?: BaseComponent<TOptions>;
    options: TOptions;
  }) {
    if (!this._instances[component]) {
      console.warn(`Gov IE component ${component} does not exist.`);
      return false;
    }

    if (options.id) {
      if (this._instances[component][options.id] && !options.override) {
        console.warn(`Gov IE instance with id '${options.id}' already exists.`);
        return;
      }

      if (options.override && this._instances[component][options.id]) {
        this.destroyAndRemoveInstance({ component, id: options.id });
      }
    }

    if (instance) {
      this._instances[component][options.id ?? generateRandomId()] = instance;
      return;
    }

    const componentType = componentRegistry[component];
    const newInstance = new componentType(options);
    newInstance.init();

    this._instances[component][options.id ?? generateRandomId()] = newInstance;
  }

  getAllInstances() {
    return this._instances;
  }

  getInstances({ component }: { component: ComponentRegistryKey }) {
    if (!this._instances[component]) {
      console.warn(`Gov IE component '${component}' does not exist.`);
      return false;
    }

    return this._instances[component];
  }

  getInstance({
    component,
    id,
  }: {
    component: ComponentRegistryKey;
    id: string;
  }) {
    if (!this.componentAndInstanceCheck({ component, id })) {
      return;
    }

    if (!this._instances[component][id]) {
      console.warn(`Gov IE instance with id ${id} does not exist.`);
      return;
    }

    return this._instances[component][id];
  }

  destroyAndRemoveInstance({
    component,
    id,
  }: {
    component: ComponentRegistryKey;
    id: string;
  }) {
    if (!this.componentAndInstanceCheck({ component, id })) {
      return;
    }

    this.destroyInstanceObject({ component, id });
    this.removeInstance({ component, id });
  }

  destroyAndRemoveAllInstances() {
    for (const component in this._instances) {
      for (const id in this._instances[component]) {
        this.destroyAndRemoveInstance({
          component: component as ComponentRegistryKey,
          id,
        });
      }
    }
  }

  removeInstance({
    component,
    id,
  }: {
    component: ComponentRegistryKey;
    id: string;
  }) {
    if (!this.componentAndInstanceCheck({ component, id })) {
      return;
    }

    delete this._instances[component][id];
  }

  destroyInstanceObject({
    component,
    id,
  }: {
    component: ComponentRegistryKey;
    id: string;
  }) {
    if (!this.componentAndInstanceCheck({ component, id })) {
      return;
    }

    this._instances[component][id].destroy();
  }

  instanceExists({
    component,
    id,
  }: {
    component: ComponentRegistryKey;
    id: string;
  }) {
    if (!this._instances[component]) {
      return false;
    }

    if (!this._instances[component][id]) {
      return false;
    }

    return true;
  }

  private componentAndInstanceCheck({
    component,
    id,
  }: {
    component: ComponentRegistryKey;
    id: string;
  }) {
    if (!this._instances[component]) {
      console.warn(`Gov IE component ${component} does not exist.`);
      return false;
    }

    if (!this._instances[component][id]) {
      console.warn(`Gov IE instance with identifier '${id}' does not exist.`);
      return false;
    }

    return true;
  }
}

export function createInstance({
  component,
  options,
}: {
  component: ComponentRegistryKey;
  options: BaseComponentOptions;
}) {
  const componentType = componentRegistry[component];

  if (!componentType) {
    throw new Error(`Component '${componentType}' not found in registry.`);
  }

  const instance = new componentType(options);
  instance.init();
  instances.addInstance({ component, instance, options });
  return instance;
}

export function destroyInstance({
  component,
  id,
}: {
  component: ComponentRegistryKey;
  id: string;
}) {
  instances.destroyAndRemoveInstance({ component, id });
}

export function destroyAllInstances() {
  instances.destroyAndRemoveAllInstances();
}

export const instances = new Instances();

if (typeof window !== 'undefined') {
  (window as unknown as { GovieInstances: Instances }).GovieInstances =
    instances;
}
