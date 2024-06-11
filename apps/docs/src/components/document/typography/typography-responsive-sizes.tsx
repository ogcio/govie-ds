import { meta } from '@govie-ds/tokens';
import { objectKeys } from 'ts-extras';
import { TokenName } from '../common/token-name';
import { get } from 'lodash';

type TypographyScreenSize = {
  token: string;
  value: {
    fontFamily: string[];
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
};

type TypographySize = {
  token: string;
  sizes: TypographyScreenSize[];
};

function aliasToTokenName(alias: string) {
  return alias
    .replace('{primitive.', '')
    .replace('{semantic.', '')
    .replace('}', '')
    .replaceAll('.', '/');
}

function getTypographyTokens(screenSize: string): TypographyScreenSize[] {
  const resolved = Object.hasOwn(
    meta.light.resolved.semantic.typography,
    screenSize,
  )
    ? meta.light.resolved.semantic.typography[
        screenSize as keyof typeof meta.light.resolved.semantic.typography
      ]
    : meta.light.resolved.semantic.typography.default;

  const unresolved = Object.hasOwn(
    meta.light.unresolved.semantic.typography,
    screenSize,
  )
    ? meta.light.unresolved.semantic.typography[
        screenSize as keyof typeof meta.light.unresolved.semantic.typography
      ]
    : meta.light.unresolved.semantic.typography.default;

  return objectKeys(resolved).map((typographyToken) => {
    return {
      token: aliasToTokenName(unresolved[typographyToken].$value),
      value: resolved[typographyToken].$value,
    };
  });
}

export function TypographyResponsiveSizes() {
  const screenSizes = objectKeys(
    meta.light.resolved.semantic.typography,
  ).filter((size) => size !== 'default');

  const typographySizes: TypographySize[] = screenSizes.map((size) => {
    return {
      token: `screen/${size}`,
      sizes: getTypographyTokens(size),
    };
  });

  console.log(JSON.stringify(typographySizes, null, 2));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {screenSizes.map((size) => (
              <th key={size}>
                <TokenName name={`screen/${size}`} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {typographySizes.map((typographySize) => (
            <tr key={typographySize.token}>
              <td>
                <TokenName name={typographySize.token} />
              </td>
              {typographySize.sizes.map((size) => (
                <td key={size.token}>
                  <TokenName name={size.token} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
