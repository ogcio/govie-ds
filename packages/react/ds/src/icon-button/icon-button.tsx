import { cloneElement } from 'react';

export function IconButton({
  icon,
  ariaLabel,
}: {
  icon: React.ReactElement;
  ariaLabel: string;
}) {
  return (
    <button>
      {cloneElement(icon, {
        ariaLabel,
      })}
    </button>
  );
}
