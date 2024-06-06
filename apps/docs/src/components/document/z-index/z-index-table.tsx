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
        const valueIndex = items.findIndex((item) => item.value === value);

        const itemHeight = 32;
        const offset = 4;

        return (
          <div
            className="relative"
            style={{ height: itemHeight + (items.length - 1) * offset }}
          >
            {items.map((item, index) => {
              return (
                <div
                  className={cn(
                    'absolute w-[200px] border-gray-50 border-xs',
                    index === valueIndex ? 'bg-gold-200' : 'bg-gray-50',
                    index > valueIndex ? 'opacity-40' : 'opacity-100',
                  )}
                  style={{
                    height: itemHeight,
                    zIndex: item.value,
                    top: `${index * offset}px`,
                    left: `${index * offset}px`,
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
