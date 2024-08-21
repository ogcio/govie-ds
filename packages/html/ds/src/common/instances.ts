import { Header } from '../header/header';
import { BaseComponent, BaseComponentOptions } from './component';

function generateRandomId() {
  return Math.random().toString(36).slice(2, 11);
}

type BaseComponentConstructor = {
  new (options: BaseComponentOptions): BaseComponent<BaseComponentOptions>;
};

const classRegistry: Record<string, BaseComponentConstructor> = {
  Header,
  // TODO: additional component classes
};

class Instances {
  private _instances: {
    [key: string]: { [id: string]: BaseComponent<BaseComponentOptions> };
  };

  constructor() {
    this._instances = {};

    for (const key of Object.keys(classRegistry)) {
      this._instances[key] = {};
    }
  }

  addInstance<TOptions extends BaseComponentOptions>(
    component: keyof Instances['_instances'],
    options: TOptions,
    instance?: BaseComponent<TOptions>,
  ) {
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
        this.destroyAndRemoveInstance(component, options.id);
      }
    }

    if (instance) {
      this._instances[component][options.id ?? generateRandomId()] = instance;
    }

    const classType = classRegistry[component];
    this._instances[component][options.id ?? generateRandomId()] =
      new classType(options);
  }

  getAllInstances() {
    return this._instances;
  }

  getInstances(component: keyof Instances['_instances']) {
    if (!this._instances[component]) {
      console.warn(`Gov IE component '${component}' does not exist.`);
      return false;
    }
    return this._instances[component];
  }

  getInstance(component: keyof Instances['_instances'], id: string) {
    if (!this._componentAndInstanceCheck(component, id)) {
      return;
    }

    if (!this._instances[component][id]) {
      console.warn(`Gov IE instance with id ${id} does not exist.`);
      return;
    }

    return this._instances[component][id];
  }

  destroyAndRemoveInstance(
    component: keyof Instances['_instances'],
    id: string,
  ) {
    if (!this._componentAndInstanceCheck(component, id)) {
      return;
    }

    this.destroyInstanceObject(component, id);
    this.removeInstance(component, id);
  }

  destroyAndRemoveAllInstances() {
    for (const component in this._instances) {
      for (const id in this._instances[component]) {
        this.destroyAndRemoveInstance(component, id);
      }
    }
  }

  removeInstance(component: keyof Instances['_instances'], id: string) {
    if (!this._componentAndInstanceCheck(component, id)) {
      return;
    }

    delete this._instances[component][id];
  }

  destroyInstanceObject(component: keyof Instances['_instances'], id: string) {
    if (!this._componentAndInstanceCheck(component, id)) {
      return;
    }

    this._instances[component][id].destroy();
  }

  instanceExists(component: keyof Instances['_instances'], id: string) {
    if (!this._instances[component]) {
      return false;
    }

    if (!this._instances[component][id]) {
      return false;
    }

    return true;
  }

  private _componentAndInstanceCheck(
    component: keyof Instances['_instances'],
    id: string,
  ) {
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

export function initialiseModule({
  name,
  classType,
}: {
  name: string;
  classType: keyof Instances['_instances'];
}) {
  return function () {
    const elements = document.querySelectorAll(`[data-module="gieds-${name}"]`);

    for (const element of elements) {
      createInstance(classType, { element });
    }
  };
}

// export function createInstance<T extends BaseComponentConstructor>(
//   classType: T,
//   options: BaseComponentOptions,
// ) {
//   const instance = new classType(options);
//   instance.init();
//   instances.addInstance(classType.name, options, instance);
// }

export function createInstance(
  className: keyof Instances['_instances'],
  options: BaseComponentOptions,
) {
  const classType = classRegistry[className];

  if (!classType) {
    throw new Error(`Component '${classType}' not found in registry.`);
  }

  const instance = new classType(options);
  instance.init();
  instances.addInstance(className, options);
}

export function destroyInstance({
  classType,
  id,
}: {
  classType: keyof Instances['_instances'];
  id: string;
}) {
  instances.destroyAndRemoveInstance(classType, id);
}

export function destroyAllInstances() {
  instances.destroyAndRemoveAllInstances();
}

export const instances = new Instances();

if (typeof window !== 'undefined') {
  (window as unknown as { GovieInstances: Instances }).GovieInstances =
    instances;
}
