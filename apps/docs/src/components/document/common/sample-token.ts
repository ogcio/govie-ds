import { objectKeys } from 'ts-extras';

export type SampleToken<TValue> = {
  name: string;
  value: TValue;
};

export function toSampleTokens<TValue>(
  tokens: Record<string, { $type: string; $value: TValue }>,
): SampleToken<TValue>[] {
  return objectKeys(tokens).map((key) => ({
    name: key,
    value: tokens[key].$value,
  }));
}
