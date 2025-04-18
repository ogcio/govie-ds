import { cn } from '@/lib/cn';

export type SwatchProps = {
  name: number | string;
  value: string;
  hideValue?: boolean;
};

export function Swatch({ name, value, hideValue = false }: SwatchProps) {
  const whiteNames = [
    'emerald',
    'gold',
    'gray',
    'blue',
    'red',
    'green',
    'purple',
    'black',
  ];
  const blackNames = ['yellow', 'white'];
  const isString = typeof name === 'string';
  const textClasses = {
    'text-gray-900':
      (!isString && name <= 400) ||
      (isString && blackNames.includes(name.toString())),
    'text-gray-50':
      (!isString && name > 400) ||
      (isString && whiteNames.includes(name.toString())),
  };
  return (
    <div
      className="flex justify-between items-center px-xl py-lg"
      style={{ backgroundColor: value }}
    >
      <p className={cn('mb-0', textClasses)}>{name}</p>
      {hideValue ? null : (
        <p
          className={cn(
            'text-2xs xs:text-2xs md:text-xs xl:text-xs font-tertiary lowercase mb-0',
            textClasses,
          )}
        >
          {value}
        </p>
      )}
    </div>
  );
}
