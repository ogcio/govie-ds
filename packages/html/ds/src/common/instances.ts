import { Header } from '../header/header';

class Instances {
  private _instances: {
    Header: { [id: string]: Header };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };

  constructor() {
    this._instances = {
      Header: {},
    };
  }

  addInstance(
    component: keyof Instances['_instances'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instance: any,
    id?: string,
    override = false,
  ) {
    if (!this._instances[component]) {
      console.warn(`govie component ${component} does not exist.`);
      return false;
    }

    if (id) {
      if (this._instances[component][id] && !override) {
        console.warn(`govie instance with id ${id} already exists.`);
        return;
      }

      if (override && this._instances[component][id]) {
        this.destroyAndRemoveInstance(component, id);
      }
    }

    this._instances[component][id ?? this._generateRandomId()] = instance;
  }

  getAllInstances() {
    return this._instances;
  }

  getInstances(component: keyof Instances['_instances']) {
    if (!this._instances[component]) {
      console.warn(`govie component ${component} does not exist.`);
      return false;
    }
    return this._instances[component];
  }

  getInstance(component: keyof Instances['_instances'], id: string) {
    if (!this._componentAndInstanceCheck(component, id)) {
      return;
    }

    if (!this._instances[component][id]) {
      console.warn(`govie instance with id ${id} does not exist.`);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this._instances[component][id] as any;
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.destroyAndRemoveInstance(component as any, id);
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

  _generateRandomId() {
    return Math.random().toString(36).slice(2, 11);
  }

  private _componentAndInstanceCheck(
    component: keyof Instances['_instances'],
    id: string,
  ) {
    if (!this._instances[component]) {
      console.warn(`govie Component ${component} does not exist.`);
      return false;
    }

    if (!this._instances[component][id]) {
      console.warn(`govie Instance with ID ${id} does not exist.`);
      return false;
    }

    return true;
  }
}

export type InstanceOptions = {
  id?: string;
  element: Element;
};

export function createInstance(classType: string, options: InstanceOptions) {
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

export const instances = new Instances();

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).govieInstances = instances;
}
