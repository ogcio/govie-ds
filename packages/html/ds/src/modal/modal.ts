import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type ModalOptions = BaseComponentOptions;

export class Modal extends BaseComponent<ModalOptions> {
  modal: Element;
  closeIcon: Element | null;
  position: string;
  isOpen: boolean;
  triggerButton: Element | null;

  constructor(options: ModalOptions) {
    super(options);

    this.triggerButtonEventLister = this.triggerButtonEventLister.bind(this);
    this.modalEventListener = this.modalEventListener.bind(this);
    this.closeButtonListener = this.closeButtonListener.bind(this);

    this.triggerButton = this.query.getByElement({
      name: 'trigger-button',
    });
    this.modal = this.query.getByElement({ name: 'modal' });
    this.closeIcon = this.query.getByElement({
      name: 'modal-container',
    }).firstElementChild;

    this.position = (this.modal as HTMLElement).dataset?.position || 'center';
    this.isOpen = (this.modal as HTMLElement).dataset?.open === 'true';

    this.initModalState();
  }

  initModalState() {
    this.toggleModalState(this.isOpen);
  }

  toggleModalState(isOpen: boolean) {
    if (isOpen) {
      this.modal.classList.add('gi-modal-open');
      this.modal.classList.remove('gi-modal-close');
      this.modal.setAttribute('aria-hidden', 'false');
    } else {
      this.modal.classList.add('gi-modal-close');
      this.modal.classList.remove('gi-modal-open');
      this.modal.setAttribute('aria-hidden', 'true');
    }
  }

  triggerButtonEventLister() {
    this.toggleModalState(true);
  }

  modalEventListener(event: any) {
    const targetElement = event.target as HTMLElement;

    if (targetElement.dataset.element === 'modal') {
      this.toggleModalState(false);
    }
  }

  closeButtonListener() {
    this.toggleModalState(false);
  }

  initComponent() {
    this.triggerButton?.addEventListener(
      'click',
      this.triggerButtonEventLister,
    );
    this.modal.addEventListener('click', this.modalEventListener);
    this.closeIcon?.addEventListener('click', this.closeButtonListener);
  }

  destroyComponent(): void {
    this.triggerButton?.removeEventListener(
      'click',
      this.triggerButtonEventLister,
    );
    this.modal.removeEventListener('click', this.modalEventListener);
    this.closeIcon?.removeEventListener('click', this.closeButtonListener);
  }
}

export const initModal = initialiseModule({
  name: 'modal',
  component: 'Modal',
});
