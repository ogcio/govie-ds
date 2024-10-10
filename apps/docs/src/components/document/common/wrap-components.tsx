// TODO: type
export function wrapComponents(
  components: Record<string, any>,
  wrapper: ({ key }: { key: string }) => any[] | undefined, // TODO: update types
) {
  // TODO: type
  return Object.keys(components).reduce((accumulator, key) => {
    const Component = components[key];

    accumulator[key] = (props: Record<string, unknown>) => {
      if (key === 'Header') {
        return (
          <div className="mb-2xl" {...props}>
            <Component {...props} />
          </div>
        );
      }

      const wrappers = wrapper({
        key,
      });

      if (!wrappers || wrappers.length === 0) {
        return <Component {...props} />;
      }

      return (
        <NestedComponents
          component={<Component {...props} />}
          wrappers={wrappers}
        />
      );
    };

    return accumulator;
  }, {} as any);
}

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
