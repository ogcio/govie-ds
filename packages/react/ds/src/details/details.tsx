export type DetailsProps = {
  label: string;
  name?: string;
  startsOpen?: boolean;
  children: string;
};

export const Details = ({
  label,
  name,
  children,
  startsOpen,
}: DetailsProps) => {
  return (
    <details
      data-testid="govie-details"
      className="gi-details"
      data-module="gi-details"
      open={startsOpen}
      name={name}
      aria-expanded={startsOpen ? 'true' : 'false'}
      aria-details="details-content"
    >
      <summary
        className="gi-details-summary"
        data-testid="govie-details-summary"
        role="button"
        aria-controls="details-content"
        aria-expanded={startsOpen ? 'true' : 'false'}
      >
        <span className="gi-details-summary-text">{label}</span>
      </summary>
      <div
        id="details-content"
        className="gi-details-text"
        aria-hidden={startsOpen ? 'false' : 'true'}
      >
        {children}
      </div>
    </details>
  );
};
