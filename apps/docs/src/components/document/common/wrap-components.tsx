// TODO: type
const NestedComponents = ({
  component,
  wrappers,
}: {
  component: any;
  wrappers: any[];
}) => {
  return wrappers.reduceRight((accumulator, Component) => {
    return <Component>{accumulator}</Component>;
  }, component);
};
