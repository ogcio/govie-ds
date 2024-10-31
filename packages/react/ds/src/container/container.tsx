export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div data-testid="govie-container" className="gi-layout-container">
      {children}
    </div>
  );
}
