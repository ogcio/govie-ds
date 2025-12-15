import { createFocusTrap, FocusTrap } from 'focus-trap';
import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export const hideAriaOutside = (refNode: HTMLElement) => {
  const newDocument = refNode.ownerDocument ?? document;
  const bodyElement = newDocument.body;

  const findTopLevelHost = (node: HTMLElement): Element => {
    let current: Element | null = node;
    while (
      current !== null &&
      current.parentElement !== null &&
      current.parentElement !== bodyElement
    ) {
      current = current.parentElement;
    }
    return current ?? bodyElement;
  };

  const topHost = findTopLevelHost(refNode);

  const applied: Element[] = [];
  let rafId: number | null = null;

  topHost.removeAttribute('aria-hidden');

  rafId = requestAnimationFrame(() => {
    const children = [...bodyElement.children];

    for (const element of children) {
      if (element === topHost) {
        continue;
      }
      if (element.getAttribute('aria-hidden') === 'true') {
        continue;
      }
      element.setAttribute('aria-hidden', 'true');
      applied.push(element);
    }
  });

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    for (const element of applied) {
      element.removeAttribute('aria-hidden');
    }
  };
};

type DetachInfo = {
  parent: ParentNode;
  marker: Comment;
} | null;

export type ModalOptions = BaseComponentOptions;

export class Modal extends BaseComponent<ModalOptions> {
  modal: Element;
  closeIcon: Element | null;
  position: string;
  isOpen: boolean;
  triggerButton: Element | null;
  closeOnClick: boolean;
  closeOnOverlayClick: boolean;
  closeOnEscape: boolean;
  trap: FocusTrap;
  modalControl: Element | null;
  modalBody: Element | null;
  ariaHiderCleanup: (() => void) | null = null;
  handleEscapeKey: (event: KeyboardEvent) => void;
  private _detachInfo: DetachInfo = null;

  constructor(options: ModalOptions) {
    super(options);

    this.triggerButtonEventLister = this.triggerButtonEventLister.bind(this);
    this.modalEventListener = this.modalEventListener.bind(this);
    this.closeButtonListener = this.closeButtonListener.bind(this);

    this.triggerButton = this.query.getByElement({ name: 'trigger-button' });
    this.modal = this.query.getByElement({ name: 'modal' });
    this.closeIcon = this.query.getByElement({ name: 'modal-close-button' });
    this.modalControl = this.query.getByElement({ name: 'modal-container' });
    this.modalBody = this.query.getByElement({ name: 'modal-body' });
    this.handleEscapeKey = this.escapeKeyListener.bind(this);

    this.position = (this.modal as HTMLElement).dataset?.position || 'center';
    this.isOpen = (this.modal as HTMLElement).dataset?.open === 'true';
    this.closeOnClick =
      (this.modal as HTMLElement).dataset?.closeonclick === 'true';
    this.closeOnOverlayClick =
      (this.modal as HTMLElement).dataset?.closeonoverlayclick === 'true';
    this.closeOnEscape =
      (this.modal as HTMLElement).dataset?.closeonescape !== 'false';

    this.initModalState();
    this.bindCloseButtons();

    this.trap = createFocusTrap(this.modal as HTMLElement, {
      initialFocus: this.modalBody as HTMLElement,
      fallbackFocus: () => this.modal as HTMLElement,
      returnFocusOnDeactivate: false,
    });
  }

  private transportToBody(document: Document): void {
    if (!this.modal || this.modal.parentNode === document.body) {
      return;
    }
    const marker = document.createComment('modal-portal-anchor');
    const parent = this.modal.parentNode as ParentNode;

    parent.insertBefore(marker, this.modal);
    this._detachInfo = { parent, marker };

    document.body.append(this.modal);
  }
  private restoreFromBody(): void {
    if (!this.modal || !this._detachInfo) {
      return;
    }

    const { parent, marker } = this._detachInfo;

    if (marker.parentNode) {
      marker.before(this.modal);
      marker.remove();
    } else {
      (parent.isConnected
        ? parent
        : this.modal.ownerDocument && this.modal.ownerDocument.body
      ).append(this.modal);
    }

    this._detachInfo = null;
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
          if (!event.defaultPrevented) {
            this.toggleModalState(false, { forceClose: true });
          }
        });
      });
    }
  }

  toggleModalState(isOpen: boolean, props?: { forceClose?: boolean }) {
    const newDocument = (this.modal as HTMLElement).ownerDocument ?? document;
    this.isOpen = isOpen;
    (this.modal as HTMLElement).dataset.open = String(isOpen);
    if (isOpen) {
      this.transportToBody(newDocument);

      this.modal.classList.add('gi-modal-open');
      this.modal.classList.remove('gi-modal-close');
      this.modal.setAttribute('aria-hidden', 'false');

      this.trap?.activate();
      this.ariaHiderCleanup = hideAriaOutside(this.modal as HTMLElement);
      return;
    }

    if ((this.closeOnClick && this.closeOnOverlayClick) || props?.forceClose) {
      this.modal.classList.add('gi-modal-close');
      this.modal.classList.remove('gi-modal-open');
      this.modal.setAttribute('aria-hidden', 'true');

      this.trap?.deactivate();
      this.ariaHiderCleanup?.();
      this.restoreFromBody();

      const bodyElement = newDocument.body as HTMLElement;
      const hadTabIndex = bodyElement.hasAttribute('tabindex');

      if (!hadTabIndex) {
        bodyElement.setAttribute('tabindex', '-1');
      }
      bodyElement.focus({ preventScroll: true });
      if (!hadTabIndex) {
        bodyElement.removeAttribute('tabindex');
      }
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

  escapeKeyListener(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isOpen && this.closeOnEscape) {
      event.stopPropagation();
      this.toggleModalState(false, { forceClose: true });
    }
  }

  initComponent() {
    this.triggerButton?.addEventListener(
      'click',
      this.triggerButtonEventLister,
    );
    this.modal.addEventListener('click', this.modalEventListener);
    this.closeIcon?.addEventListener('click', this.closeButtonListener);

    if (this.closeOnEscape) {
      document.addEventListener('keydown', this.handleEscapeKey);
    }
  }

  destroyComponent(): void {
    this.triggerButton?.removeEventListener(
      'click',
      this.triggerButtonEventLister,
    );
    this.modal.removeEventListener('click', this.modalEventListener);
    this.closeIcon?.removeEventListener('click', this.closeButtonListener);
    this.trap?.deactivate();

    if (this.closeOnEscape) {
      document.removeEventListener('keydown', this.handleEscapeKey);
    }

    if (this.isOpen) {
      this.toggleModalState(false, { forceClose: true });
    } else {
      this.restoreFromBody();
      this.ariaHiderCleanup?.();
    }
  }
}

export const initModal = initialiseModule({
  name: 'modal',
  component: 'Modal',
});
