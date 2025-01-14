import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type ModalOptions = BaseComponentOptions;

export class Modal extends BaseComponent<ModalOptions> {
  triggerButtonContainer: Element;
  modal: Element;
  closeIcon: Element | null;

  openModal: EventListenerOrEventListenerObject;
  closeModal: EventListenerOrEventListenerObject;
  closeModalWithIcon: EventListenerOrEventListenerObject;

  constructor(options: ModalOptions) {
    super(options);

    this.triggerButtonContainer = this.query.getByElement({
      name: 'trigger-button-container',
    });
    this.modal = this.query.getByElement({ name: 'modal' });
    this.closeIcon = this.query.getByElement({
      name: 'modal-container',
    }).firstElementChild;

    this.openModal = () => {
      this.modal.classList.add('gi-modal-open');
      this.modal.classList.remove('gi-modal-close');
      this.modal.setAttribute('aria-hidden', 'false');
    };

    this.closeModal = (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.dataset.element === 'modal') {
        this.modal.classList.remove('gi-modal-open');
        this.modal.classList.add('gi-modal-close');
        this.modal.setAttribute('aria-hidden', 'true');
      }
    };

    this.closeModalWithIcon = () => {
      this.modal.classList.remove('gi-modal-open');
      this.modal.classList.add('gi-modal-close');
      this.modal.setAttribute('aria-hidden', 'true');
    };
  }

  initComponent() {
    if (this.triggerButtonContainer) {
      this.triggerButtonContainer.addEventListener('click', this.openModal);
    }
    this.modal.addEventListener('click', this.closeModal);
    this.closeIcon?.addEventListener('click', this.closeModalWithIcon);
  }

  destroyComponent(): void {
    if (this.triggerButtonContainer) {
      this.triggerButtonContainer.removeEventListener('click', this.openModal);
    }
    this.modal.removeEventListener('click', this.closeModal);
    this.closeIcon?.removeEventListener('click', this.closeModalWithIcon);
  }
}

export const initModal = initialiseModule({
  name: 'modal',
  component: 'Modal',
});
