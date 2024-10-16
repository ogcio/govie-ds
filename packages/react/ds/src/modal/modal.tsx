'use client';
import React, { useState, cloneElement } from 'react';
import { ButtonProps } from '../button/types.js';
import { Icon } from '../icon/icon.js';

type ModalProps = {
  children: React.ReactNode;
  triggerButton?: React.ReactElement<ButtonProps>;
};

export const Modal = ({ triggerButton, children }: ModalProps) => {
  const [open, setOpen] = useState(Boolean(!triggerButton));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {triggerButton && cloneElement(triggerButton, { onClick: handleOpen })}
      <div
        onClick={handleClose}
        className={`gi-modal ${open ? 'gi-modal-open' : 'gi-modal-close'}`}
      >
        <div className="gi-modal-container">
          <Icon size='lg' className='gi-modal-icon' onClick={handleClose} icon="close" />
          {children}
        </div>
      </div>
    </div>
  );
};
