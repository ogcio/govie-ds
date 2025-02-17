export function Container({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div data-testid="govie-container" className="gi-layout-container" id={id}>
      {children}
    </div>
  );
}
