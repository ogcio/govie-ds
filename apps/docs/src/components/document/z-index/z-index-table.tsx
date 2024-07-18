import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { toSampleTokens } from '../common/sample-token';
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

        const itemWidth = 200;
        const itemHeight = 32;
        const offset = 4;

        return (
          <div>
            <div
              className="relative"
              style={{
                width: itemWidth + (items.length - 1) * offset,
                height: itemHeight + (items.length - 1) * offset,
              }}
            >
              {items.map((item, index) => {
                return (
                  <div
                    className={cn(
                      'absolute border-gray-50 border-xs',
                      index === valueIndex ? 'bg-gold-200' : 'bg-gray-50',
                      index > valueIndex ? 'opacity-40' : 'opacity-100',
                    )}
                    style={{
                      width: itemWidth,
                      height: itemHeight,
                      zIndex: item.value,
                      top: `${index * offset}px`,
                      left: `${index * offset}px`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      }}
    />
  );
}
