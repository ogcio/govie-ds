export type DetailsProps = {
  label: string;
} & React.DetailsHTMLAttributes<HTMLDetailsElement>;

export const Details = ({ label, name, children, open }: DetailsProps) => {
  return (
    <details
      data-testid="govie-details"
      className="gi-details"
      data-module="gi-details"
      open={open}
      name={name}
      aria-expanded={open ? 'true' : 'false'}
      aria-details="details-content"
    >
      <summary
        className="gi-details-summary"
        data-testid="govie-details-summary"
        role="button"
        aria-controls="details-content"
        aria-expanded={open ? 'true' : 'false'}
      >
        <span className="gi-details-summary-text">{label}</span>
      </summary>
      <div
        id="details-content"
        className="gi-details-text"
        aria-hidden={open ? 'false' : 'true'}
      >
        {children}
      </div>
    </details>
  );
};
