import { cloneElement } from 'react';

export function IconButton({
  icon,
  onClick,
  href,
  ariaLabel,
  disabled = false,
}: {
  icon: React.ReactElement;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  ariaLabel: string;
  disabled?: boolean;
}) {
  const Component = href ? 'a' : 'button';

  return (
    <Component
      className={`
        gi-p-[var(--gieds-space-2)] 
        gi-rounded-[var(--gieds-border-radius-200)]
        enabled:cursor-pointer
        enabled:hover:bg-gray-50
        `}
      onClick={href ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      href={href}
    >
      {cloneElement(icon, {
        ariaLabel: undefined,
        ariaHidden: true,
        color: disabled ? 'disabled' : undefined,
      })}
    </Component>
  );
}
