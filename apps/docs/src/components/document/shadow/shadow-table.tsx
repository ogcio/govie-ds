import { meta } from '@govie-ds/theme-govie';
import { SampleList } from '../common/sample-list';
import { toSampleTokens } from '../common/sample-token';
import { TokenValueComposite } from '../common/token-value';

type Shadow = {
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  color: string;
};

function toShadowString(shadow: Shadow) {
  return `${shadow.offsetX} ${shadow.offsetY} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
}

export function ShadowTable() {
  return (
    <SampleList<Shadow>
      name="shadow"
      tokens={toSampleTokens(meta.light.resolved.primitive.shadow)}
      renderValue={(value) => {
        return (
          <TokenValueComposite
            tokens={[
              { name: 'Offset X', value: value.offsetX },
              { name: 'Offset Y', value: value.offsetY },
              { name: 'Blur', value: value.blur },
              { name: 'Spread', value: value.spread },
              { name: 'Color', value: value.color },
            ]}
          />
        );
      }}
      renderExample={(value) => {
        return (
          <div
            className="w-[200px] h-[32px]"
            style={{ boxShadow: toShadowString(value) }}
          />
        );
      }}
    />
  );
}
