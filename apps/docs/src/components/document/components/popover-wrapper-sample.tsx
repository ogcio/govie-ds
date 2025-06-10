'use client';

import { Button, Popover } from '@govie-ds/react';
import { useRef, useState } from 'react';

export const PopoverSample = () => {
  const triggerRef = useRef<HTMLButtonElement>(null!);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        Open Popover
      </Button>
      <Popover triggerRef={triggerRef} open={open} onOpenChange={setOpen}>
        <div className="gi-text-sm gi-text-gray-800">Popover Content</div>
      </Popover>
    </>
  );
};
