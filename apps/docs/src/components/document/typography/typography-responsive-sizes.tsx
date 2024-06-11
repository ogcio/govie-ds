import { meta } from '@govie-ds/tokens';
import { objectKeys } from 'ts-extras';
import { TokenName } from '../common/token-name';

type TypographyScreenSize = {
  screenSize: string;
  alias: string;
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

function getHeadingTokens(screenSize: string): TypographyScreenSize[] {
  const resolved = Object.hasOwn(
    meta.light.resolved.semantic.typography,
    screenSize,
  )
    ? meta.light.resolved.semantic.typography[
        screenSize as keyof typeof meta.light.resolved.semantic.typography
      ]?.heading
    : meta.light.resolved.semantic.typography.default.heading;

  const unresolved = Object.hasOwn(
    meta.light.unresolved.semantic.typography,
    screenSize,
  )
    ? meta.light.unresolved.semantic.typography[
        screenSize as keyof typeof meta.light.unresolved.semantic.typography
      ]?.heading
    : meta.light.unresolved.semantic.typography.default.heading;

  return objectKeys(resolved).map((typographyToken) => {
    return {
      screenSize,
      alias: aliasToTokenName(unresolved[typographyToken].$value),
      value: resolved[typographyToken].$value,
    };
  });
}

export function TypographyResponsiveSizes() {
  const screenSizes = objectKeys(
    meta.light.resolved.semantic.typography,
  ).filter((size) => size !== 'default');

  const headingTokens = objectKeys(
    meta.light.resolved.semantic.typography.default.heading,
  );

  const typographySizes: TypographySize[] = screenSizes.flatMap(
    (screenSize) => {
      return headingTokens.map((headingToken) => {
        return {
          token: `heading/${headingToken}`,
          sizes: getHeadingTokens(screenSize),
        };
      });
    },
  );

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
                <td key={size.screenSize}>
                  <TokenName name={size.alias} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
