import { cn } from '../cn.js';

type ContainerProps = {
  children: React.ReactNode;
  id?: string;
  inset?: boolean;
};

export function Container({ children, id, inset }: ContainerProps) {
  return (
    <div
      data-testid="govie-container"
      className={cn({
        'gi-layout-container-inset': inset,
        'gi-layout-container': !inset,
      })}
      id={id}
    >
      {children}
    </div>
  );
}
