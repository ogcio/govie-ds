'use client';
import React, { useState, cloneElement } from 'react';
import { ButtonProps } from '../button/types.js';
import { IconButton } from '../icon-button/icon-button.js';

export type ModalProps = {
  children: React.ReactNode;
  triggerButton?: React.ReactElement<ButtonProps>;
};

export const Modal = ({ triggerButton, children }: ModalProps) => {
  const [open, setOpen] = useState(Boolean(!triggerButton));
  const handleOpen = () => setOpen(true);
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.dataset.element === 'modal') {
      setOpen(false);
    }
  };
  const handleIconClose = () => setOpen(false);

  return (
    <div>
      {triggerButton && cloneElement(triggerButton, { onClick: handleOpen })}
      <div
        onClick={handleClose}
        className={`gi-modal ${open ? 'gi-modal-open' : 'gi-modal-close'}`}
        data-element="modal"
        data-testid="modal"
      >
        <div className="gi-modal-container" data-testid="modal-container">
          <IconButton
            size="large"
            className="gi-modal-icon"
            onClick={handleIconClose}
            icon={{ icon: 'close' }}
            variant="flat"
            appearance="dark"
          />
          {children}
        </div>
      </div>
    </div>
  );
};
