import styles from './phase-banner.module.css';

export function PhaseBanner({
  level,
  children,
}: {
  level: 'alpha' | 'beta';
  children: React.ReactNode;
}) {
  return (
    <div className={styles.phaseBanner}>
      <div className={styles.pill}>{level}</div>
      <div>{children}</div>
    </div>
  );
}
