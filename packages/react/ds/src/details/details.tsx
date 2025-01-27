export type DetailsProps = {
  label: string;
  name?: string;
  startsOpen?: boolean;
  children: string;
};

const Details = ({ label, name, children, startsOpen }: DetailsProps) => {
  return (
    <details
      data-testid="govie-details"
      className="gi-details"
      data-module="gi-details"
      open={startsOpen}
      name={name}
    >
      <summary
        className="gi-details-summary"
        data-testid="govie-details-summary"
      >
        <span className="gi-details-summary-text">{label}</span>
      </summary>
      <div className="gi-details-text">{children}</div>
    </details>
  );
};

export { Details };
