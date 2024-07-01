import styles from './link.module.css';

export function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={styles.link}>
      {children}
    </a>
  );
}
