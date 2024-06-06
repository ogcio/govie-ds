import { meta } from '@govie-ds/theme-govie';
import { SampleList, toSampleTokens } from '../common/sample-list';
import { TokenValue } from '../common/token-value';

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
        return <TokenValue value={toShadowString(value)} />;
      }}
      renderExample={(value) => {
        console.log(value);
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
