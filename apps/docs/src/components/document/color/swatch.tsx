import { Text } from '@/components/typography/text';
import { cn } from '@/lib/cn';

export type SwatchProps = {
  name: number;
  value: string;
  hideValue?: boolean;
};

export function Swatch({ name, value, hideValue = false }: SwatchProps) {
  return (
    <div
      className="flex justify-between items-center px-xl py-lg"
      style={{ backgroundColor: value }}
    >
      <Text
        className={cn(
          'mb-0',
          name <= 400 ? 'text-gray-900' : undefined,
          name > 400 ? 'text-gray-50' : undefined,
        )}
      >
        {name}
      </Text>
      {hideValue ? null : (
        <Text
          className={cn(
            'text-2xs xs:text-2xs md:text-xs xl:text-xs font-tertiary lowercase mb-0',
            name <= 400 ? 'text-gray-900' : undefined,
            name > 400 ? 'text-gray-50' : undefined,
          )}
        >
          {value}
        </Text>
      )}
    </div>
  );
}
