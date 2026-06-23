'use client';
import { translate as t } from '@/i18n/utility.js';
import { Chip } from '@/chip/chip.js';
import { Stack } from '@/stack/stack.js';
import { Text } from './atoms';

export const ChipGroupOverflow = {
  Collapse: 'collapse',
  Wrap: 'wrap',
} as const;

export type ChipGroupProps = {
  items: { label: string; value: string }[];
  onRemove: (value: string) => void;
  overflow?: (typeof ChipGroupOverflow)[keyof typeof ChipGroupOverflow];
  /** Maximum number of visible chips before showing "+N more" in collapse mode. Defaults to 4 to balance visibility and space in dense layouts. */
  visibleCount?: number;
  className?: string;
};

export const ChipGroup = ({
  items,
  onRemove,
  overflow = ChipGroupOverflow.Collapse,
  visibleCount = 4,
  className,
}: ChipGroupProps) => {
  if (items.length === 0) {
    return null;
  }

  const shouldCollapse = overflow === ChipGroupOverflow.Collapse && items.length > visibleCount;
  const visibleItems = shouldCollapse ? items.slice(0, visibleCount) : items;
  const hiddenCount = items.length - visibleCount;

  return (
    <Stack
      direction="row"
      gap={3}
      wrap
      align="center"
      role="group"
      ariaLabel={t('chipGroup.label', { defaultValue: 'Selected items' })}
      className={className}
    >
      {visibleItems.map((item) => (
        <Chip key={item.value} label={item.label} onClose={() => onRemove(item.value)} />
      ))}
      {shouldCollapse && (
        <Text className="gi-text-xs gi-font-bold gi-py-0.5 gi-px-1.5">
          {t('chipGroup.moreItems', { count: hiddenCount, defaultValue: `+${hiddenCount} more` })}
        </Text>
      )}
    </Stack>
  );
};

ChipGroup.displayName = 'ChipGroup';
