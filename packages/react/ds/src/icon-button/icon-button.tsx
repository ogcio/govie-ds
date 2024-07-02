import { cloneElement } from 'react';
import styles from './icon-button.module.css';

export function IconButton({
  icon,
  onClick,
  ariaLabel,
  disabled = false,
}: {
  icon: React.ReactElement;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={styles.iconButton}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {cloneElement(icon, {
        ariaLabel: undefined,
        ariaHidden: true,
        color: disabled ? 'disabled' : undefined,
      })}
    </button>
  );
}
