'use client';

import {
  Button,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalWrapper,
  Paragraph,
} from '@govie-ds/react';
import { useState } from 'react';

export const ModalWrapperSample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Open Modal</Button>
      <ModalWrapper
        dataTestId={'test-id'}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalTitle key="title">Modal Title</ModalTitle>
        <ModalBody key="body">
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            esse magnam quis sit soluta cupiditate at deserunt exercitationem
            voluptas doloribus asperiores.
          </Paragraph>
        </ModalBody>
        <ModalFooter key="footer">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Save</Button>
        </ModalFooter>
      </ModalWrapper>
    </>
  );
};
