import { Header } from './header';

class Instances {
  private _instances: {
    Header: { [id: string]: Header };
  };

  constructor() {
    this._instances = {
      Header: {},
    };
  }

  addInstance(
    component: keyof Instances['_instances'],
    instance: any,
    id?: string,
    override = false,
  ) {
    if (!this._instances[component]) {
      console.warn(`GovIe: Component ${component} does not exist.`);
      return false;
    }

    if (this._instances[component][id] && !override) {
      console.warn(`GovIe: Instance with ID ${id} already exists.`);
      return;
    }

    if (override && this._instances[component][id]) {
      this._instances[component][id].destroyAndRemoveInstance();
    }

    this._instances[component][id ?? this._generateRandomId()] = instance;
  }

  getAllInstances() {
    return this._instances;
  }

  getInstances(component: keyof Instances['_instances']) {
    if (!this._instances[component]) {
      console.warn(`GovIe: Component ${component} does not exist.`);
      return false;
    }
    return this._instances[component];
  }

  getInstance(component: keyof Instances['_instances'], id: string) {
    if (!this._componentAndInstanceCheck(component, id)) {
      return;
    }

    if (!this._instances[component][id]) {
      console.warn(`GovIe: Instance with ID ${id} does not exist.`);
      return;
    }
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
    return Math.random().toString(36).slice(2, 11); // TODO: replace
  }

  private _componentAndInstanceCheck(
    component: keyof Instances['_instances'],
    id: string,
  ) {
    if (!this._instances[component]) {
      console.warn(`GovIe: Component ${component} does not exist.`);
      return false;
    }

    if (!this._instances[component][id]) {
      console.warn(`GovIe: Instance with ID ${id} does not exist.`);
      return false;
    }

    return true;
  }
}

export const instances = new Instances();

if (typeof window !== 'undefined') {
  window.GovIeInstances = instances;
}
