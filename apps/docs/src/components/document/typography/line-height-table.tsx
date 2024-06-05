import { meta } from '@govie-ds/theme-govie';
import { FontTable } from './font-table';
import { sampleText } from './sample-text';

export function LineHeightTable() {
  return (
    <FontTable<number>
      name="line-height"
      tokens={meta.light.resolved.primitive.font.lineHeight}
      renderValue={(value) => value}
      renderExample={(value) => (
        <span style={{ lineHeight: value }}>{sampleText}</span>
      )}
    />
  );
}
