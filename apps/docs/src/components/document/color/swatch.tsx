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
          'font-medium text-xs',
          name <= 400 ? 'text-gray-900' : undefined,
          name > 400 ? 'text-gray-50' : undefined,
        )}
      >
        {name}
      </Text>
      {hideValue ? null : (
        <Text
          className={cn(
            'text-xs font-mono lowercase',
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
