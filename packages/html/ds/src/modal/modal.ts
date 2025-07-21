import { createFocusTrap, FocusTrap } from 'focus-trap';
import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export const hideAriaOutside = (refNode: HTMLElement) => {
  const documentContext = refNode.ownerDocument || document;
  const bodyChildren = [...documentContext.body.children];

  const elementsToHide = bodyChildren.filter((element) => {
    const isSameElement = element === refNode;
    const alreadyHidden = element.getAttribute('aria-hidden') === 'true';
    return !isSameElement && !alreadyHidden;
  });

  for (const element of elementsToHide) {
    element.setAttribute('aria-hidden', 'true');
  }

  return () => {
    for (const element of elementsToHide) {
      element.removeAttribute('aria-hidden');
    }
  };
};

export type ModalOptions = BaseComponentOptions;

export class Modal extends BaseComponent<ModalOptions> {
  modal: Element;
  closeIcon: Element | null;
  position: string;
  isOpen: boolean;
  triggerButton: Element | null;
  closeOnClick: boolean;
  closeOnOverlayClick: boolean;
  trap: FocusTrap;
  ariaHiderCleanup: (() => void) | null = null;

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
      name: 'modal-close-button',
    });

    this.position = (this.modal as HTMLElement).dataset?.position || 'center';
    this.isOpen = (this.modal as HTMLElement).dataset?.open === 'true';
    this.closeOnClick =
      (this.modal as HTMLElement).dataset?.closeonclick === 'true';
    this.closeOnOverlayClick =
      (this.modal as HTMLElement).dataset?.closeonoverlayclick === 'true';

    this.initModalState();
    this.bindCloseButtons();

    this.trap = createFocusTrap(this.modal as HTMLElement, {
      initialFocus: false,
    });
  }

  initModalState() {
    this.modal.classList.add('gi-modal-close');
    this.modal.classList.remove('gi-modal-open');
    this.modal.setAttribute('aria-hidden', 'true');

    this.toggleModalState(this.isOpen);
  }

  bindCloseButtons() {
    const buttons = this.modal.querySelectorAll(
      'button[data-closeonclick="true"]',
    );
    for (const button of buttons) {
      button.addEventListener('click', (event) => {
        queueMicrotask(() => {
          const buttonText = button.textContent?.trim();
          if (!event.defaultPrevented) {
            this.toggleModalState(false, { forceClose: true });
            if (buttonText) {
              console.log(buttonText.toLowerCase());
            }
          }
        });
      });
    }
  }

  toggleModalState(isOpen: boolean, props?: { forceClose?: boolean }) {
    if (isOpen) {
      this.modal.classList.add('gi-modal-open');
      this.modal.classList.remove('gi-modal-close');
      this.modal.setAttribute('aria-hidden', 'false');
      this.trap?.activate();
      this.ariaHiderCleanup = hideAriaOutside(this.modal as HTMLElement);
    } else if (
      (this.closeOnClick && this.closeOnOverlayClick) ||
      props?.forceClose
    ) {
      this.modal.classList.add('gi-modal-close');
      this.modal.classList.remove('gi-modal-open');
      this.modal.setAttribute('aria-hidden', 'true');
      this.trap?.deactivate();
      this.ariaHiderCleanup?.();
    }
  }

  triggerButtonEventLister() {
    this.toggleModalState(true);
  }

  modalEventListener(event: Event) {
    const targetElement = event.target as HTMLElement;

    if (targetElement.dataset.element === 'modal') {
      this.toggleModalState(false);
    }
  }

  closeButtonListener() {
    this.toggleModalState(false, { forceClose: true });
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
    this.trap?.deactivate();
  }
}

export const initModal = initialiseModule({
  name: 'modal',
  component: 'Modal',
});
