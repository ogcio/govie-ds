export function TwoThirds({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-gray-400 border-solid border-xs p-4">
      <div className="gi-layout-container-3-column">
        <div className="gi-layout-column-2-3">{children}</div>
      </div>
    </div>
  );
}

export function TwoThirdsOneThird({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="border-gray-400 border-solid border-xs p-4">
      <div className="gi-layout-container-3-column">
        <div className="gi-layout-column-2-3">{left}</div>
        <div className="gi-layout-column-1-3">{right}</div>
      </div>
    </div>
  );
}
