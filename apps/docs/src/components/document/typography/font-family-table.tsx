import { meta } from '@ogcio/theme-govie';
import { SampleTable } from '../common/sample-table';
import { sampleTextShort } from '../common/sample-text';
import { toSampleTokens } from '../common/sample-token';

export function FontFamilyTable() {
  return (
    <SampleTable<string[]>
      name="font-family"
      tokens={toSampleTokens(meta.light.resolved.primitive.font.family)}
      renderValue={({ value }) => <p>{value.join(', ')}</p>}
      renderSample={({ id, value }) => (
        <p
          className="text-xl"
          style={{
            fontFamily: id === 'primary' ? undefined : value.join(', '),
          }}
        >
          {sampleTextShort}
        </p>
      )}
    />
  );
}
