'use client';

import { Button, Popover } from '@ogcio/design-system-react';
import { useRef, useState } from 'react';

export const PopoverSample = () => {
  const triggerRef = useRef<HTMLButtonElement>(null!);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        Open Popover
      </Button>
      <Popover triggerRef={triggerRef} open={open} onOpenChange={setOpen}>
        <div className="gi-text-sm gi-text-gray-800 gi-p-6">
          Popover Content
        </div>
      </Popover>
    </div>
  );
};
