import styles from './header-link.module.css';

export function HeaderLink({
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
