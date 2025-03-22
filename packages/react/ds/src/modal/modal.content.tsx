import { Button } from '../button/button.js';
import { ModalTitle, ModalBody, ModalFooter } from './modal.js';

export const HtmlContent = (
  <>
    <ModalTitle>Modal Title</ModalTitle>
    <ModalBody>
      <p className="gi-paragraph-md">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
        molestias error accusantium non nobis excepturi doloremque dolorem
        possimus corrupti. Nostrum quisquam est voluptate! Iure suscipit,
        commodi cupiditate sit minima veritatis.
      </p>
    </ModalBody>
    <ModalFooter>
      <Button>Primary</Button>
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
