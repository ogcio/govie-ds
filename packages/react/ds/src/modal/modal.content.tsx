import { ModalClose, ModalTitle, ModalBody, ModalFooter } from './modal.js';

export const HtmlContent = (
  <>
    <ModalClose aria-label="Close modal" />
    <ModalTitle>Modal Title</ModalTitle>
    <ModalBody>
      <p className="gi-paragraph-md">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
        molestias error accusantium non nobis excepturi doloremque dolorem
        possimus corrupti. Nostrum quisquam est voluptate! Iure suscipit,
        commodi cupiditate sit minima veritatis.
      </p>
    </ModalBody>
    <ModalFooter className="gi-flex gi-gap-6 gi-justify-end">
      <>
        <button className="gi-btn gi-btn-secondary gi-btn-secondary-dark gi-btn-regular">
          Cancel
        </button>
        <button className="gi-btn gi-btn-primary gi-btn-regular">
          Primary
        </button>
      </>
    </ModalFooter>
  </>
);

export const TriggerButton = (
  <button
    data-testid="trigger-button-container"
    className="gi-btn gi-btn-primary gi-btn-regular"
  >
    Open Modal
  </button>
);
