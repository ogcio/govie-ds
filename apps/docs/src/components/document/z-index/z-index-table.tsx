import { meta } from '@govie-ds/theme-govie';
import { SampleList, toSampleTokens } from '../common/sample-list';
import { TokenValue } from '../common/token-value';
import { cn } from '@/lib/cn';

export function ZIndexTable() {
  return (
    <SampleList<number>
      name="z-index"
      tokens={toSampleTokens(meta.light.resolved.primitive.zIndex)}
      renderValue={(value) => {
        return <TokenValue value={value.toString()} />;
      }}
      renderExample={(value) => {
        const items = toSampleTokens(meta.light.resolved.primitive.zIndex);

        return (
          <div className="relative">
            {items.map((item, index) => {
              return (
                <div
                  className={cn(
                    'absolute w-[200px] h-[32px]',
                    item.value === value ? 'bg-gold-200' : 'bg-gray-50',
                  )}
                  style={{
                    zIndex: item.value,
                    top: `${index * 4}px`,
                    left: `${index * 4}px`,
                  }}
                />
              );
            })}
          </div>
        );
      }}
    />
  );
}
