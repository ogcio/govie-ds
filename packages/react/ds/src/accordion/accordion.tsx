type Props = {
  children: React.ReactNode;
};

export const Accordion = ({ children }: Props) => {
  return <div className="gi-max-w-[700px]">{children}</div>;
};
