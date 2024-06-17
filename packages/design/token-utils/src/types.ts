export type Token = {
  $type: string;
  $value: unknown;
};

export type CompositeToken = {
  $type: string;
  $value: Record<string, unknown>;
};

export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

export function isToken(value: unknown): value is Token {
  return isObject(value) && '$type' in value && '$value' in value;
}

export function isCompositeToken(value: unknown): value is CompositeToken {
  return isToken(value) && isObject(value.$value);
}
