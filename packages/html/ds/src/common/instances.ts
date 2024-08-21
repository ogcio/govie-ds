import { Header } from '../header/header';
import { BaseComponent } from './component';

function generateRandomId() {
  return Math.random().toString(36).slice(2, 11);
}

class Instances {
  private _instances: {
    Header: { [id: string]: Header };
    [key: string]: { [id: string]: BaseComponent };
  };

  constructor() {
    this._instances = {
      Header: {},
    };
  }

  addInstance(
    component: keyof Instances['_instances'],
    instance: BaseComponent,
    id?: string,
    override = false,
  ) {
    if (!this._instances[component]) {
      console.warn(`Gov IE component ${component} does not exist.`);
      return false;
    }

    if (id) {
      if (this._instances[component][id] && !override) {
        console.warn(`Gov IE instance with id '${id}' already exists.`);
        return;
      }

      if (override && this._instances[component][id]) {
        this.destroyAndRemoveInstance(component, id);
      }
    }

    this._instances[component][id ?? generateRandomId()] = instance;
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

export type InstanceOptions = {
  id?: string;
  element: Element;
};

export function createInstance<
  T extends { new (options: InstanceOptions): BaseComponent },
>(classType: T, options: InstanceOptions) {
  const instance = new classType(options);
  instance.init();
  instances.addInstance(classType.name, instance, options.id, true);
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
