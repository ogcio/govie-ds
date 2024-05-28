export type SwatchProps = {
  name: string;
  value: string;
  hideValue?: boolean;
};

export function Swatch({ name, value, hideValue = false }: SwatchProps) {
  return (
    <div className="flex flex-col gap-md">
      <div
        className="w-[20px] h-[40px] rounded sm:w-full"
        style={{ backgroundColor: value }}
      />
      <div className="flex flex-col gap-sm">
        <p className="font-medium text-xs text-gray-900">{name}</p>
        {hideValue ? null : (
          <p className="text-gray-500 text-xs font-mono lowercase">{value}</p>
        )}
      </div>
    </div>
  );
}
