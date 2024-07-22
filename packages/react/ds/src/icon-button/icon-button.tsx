import { cloneElement } from 'react';
import styles from './icon-button.module.css';

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
      className={styles.iconButton}
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
