import styles from './link.module.css';

export type LinkProps = {
  as?: React.ElementType;
  href: string;
  children: React.ReactNode;
};

export function Link({ as: Component = 'a', href, children }: LinkProps) {
  return (
    <Component href={href} className={styles.link}>
      {children}
    </Component>
  );
}
