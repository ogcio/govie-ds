import { take } from 'lodash';
import { Chip } from '@/chip/chip';
import { Stack, type StackProps } from '@/stack/stack';
import { Text } from './atoms';

export type ChipGroupProps = Omit<StackProps, 'direction' | 'gap' | 'wrap' | 'align' | 'role' | 'children'> & {
  items: { label: string; value: string }[];
  onRemove: (value: string) => void;
} & (
    | { maxVisible: number; formatOverflow: (count: number) => string }
    | { maxVisible?: never; formatOverflow?: never }
  );

export const ChipGroup = ({ items, onRemove, maxVisible, formatOverflow, ...props }: ChipGroupProps) => {
  if (items.length === 0) {
    return null;
  }

  const visibleItems = take(items, maxVisible ?? items.length);
  const hiddenCount = items.length - visibleItems.length;

  return (
    <Stack {...props} direction="row" gap={3} wrap align="center" role="group">
      {visibleItems.map((item) => (
        <Chip key={item.value} label={item.label} onClose={() => onRemove(item.value)} />
      ))}
      {hiddenCount > 0 && formatOverflow && (
        <Text className="gi-text-xs gi-font-bold gi-py-0.5 gi-px-1.5">{formatOverflow(hiddenCount)}</Text>
      )}
    </Stack>
  );
};
