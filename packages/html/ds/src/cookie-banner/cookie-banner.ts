import {
  BaseComponent,
  BaseComponentOptions,
  initialiseModule,
} from '../common/component';

export type CookieBannerOptions = BaseComponentOptions;

export class CookieBanner extends BaseComponent<CookieBannerOptions> {
  defaultContainer: Element;
  acceptedContainer: Element;
  rejectedContainer: Element;
  mainContainer: Element;
  acceptButton: Element;
  rejectButton: Element;
  dismissButtonAccepted: Element;
  dismissButtonRejected: Element;

  openAcceptedContainer: EventListenerOrEventListenerObject;
  openRejectedContainer: EventListenerOrEventListenerObject;
  closeCookieBanner: EventListenerOrEventListenerObject;

  constructor(options: CookieBannerOptions) {
    super(options);

    this.defaultContainer = this.query.getByElement({
      name: 'default-container',
    });
    this.acceptedContainer = this.query.getByElement({
      name: 'accepted-container',
    });
    this.rejectedContainer = this.query.getByElement({
      name: 'rejected-container',
    });

    this.mainContainer = this.query.getByElement({
      name: 'main-container',
    });

    this.acceptButton = this.query.getByElement({
      name: 'accept-btn',
    });

    this.rejectButton = this.query.getByElement({
      name: 'reject-btn',
    });

    this.dismissButtonAccepted = this.query.getByElement({
      name: 'dismiss-btn-accepted',
    });

    this.dismissButtonRejected = this.query.getByElement({
      name: 'dismiss-btn-rejected',
    });

    this.openAcceptedContainer = () => {
      this.defaultContainer.classList.add('gi-hidden');
      this.rejectedContainer.classList.add('gi-hidden');
      this.acceptedContainer.classList.remove('gi-hidden');
    };

    this.openRejectedContainer = () => {
      this.defaultContainer.classList.add('gi-hidden');
      this.acceptedContainer.classList.add('gi-hidden');
      this.rejectedContainer.classList.remove('gi-hidden');
    };

    this.closeCookieBanner = () => {
      this.mainContainer.classList.add('gi-hidden');
    };
  }

  initComponent() {
    this.acceptButton.addEventListener('click', this.openAcceptedContainer);
    this.rejectButton.addEventListener('click', this.openRejectedContainer);
    this.dismissButtonAccepted.addEventListener(
      'click',
      this.closeCookieBanner,
    );
    this.dismissButtonRejected.addEventListener(
      'click',
      this.closeCookieBanner,
    );
  }

  destroyComponent(): void {
    this.acceptButton.removeEventListener('click', this.openAcceptedContainer);
    this.rejectButton.removeEventListener('click', this.openRejectedContainer);
    this.dismissButtonAccepted.removeEventListener(
      'click',
      this.closeCookieBanner,
    );
    this.dismissButtonRejected.removeEventListener(
      'click',
      this.closeCookieBanner,
    );
  }
}

export const initCookieBanner = initialiseModule({
  name: 'cookie-banner',
  component: 'CookieBanner',
});
