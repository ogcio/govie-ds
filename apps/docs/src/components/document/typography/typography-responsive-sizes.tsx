import { meta } from '@govie-ds/tokens';
import { objectKeys } from 'ts-extras';
import { TokenName } from '../common/token-name';
import { groupBy } from 'lodash';
import { TypographyValueComposite } from './typography-value-composite';

type TypographyScreenAlias = {
  name: string;
  value: {
    fontFamily: string[];
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
};

type TypographySize = {
  token: string;
  screenSize: string;
  alias: TypographyScreenAlias;
};

function aliasToTokenName(alias: string) {
  return alias
    .replace('{primitive.', '')
    .replace('{semantic.', '')
    .replace('}', '')
    .replaceAll('.', '/');
}

function getHeadingAlias(
  headingToken: string,
  screenSize: string,
): TypographyScreenAlias {
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

  return {
    name: aliasToTokenName(
      unresolved[headingToken as keyof typeof unresolved].$value,
    ),
    value: resolved[headingToken as keyof typeof resolved].$value,
  };
}

export function TypographyResponsiveSizes() {
  const screenSizes = objectKeys(
    meta.light.resolved.semantic.typography,
  ).filter((size) => size !== 'default');

  const headingTokens = objectKeys(
    meta.light.resolved.semantic.typography.default.heading,
  );

  const typographySizes: TypographySize[] = headingTokens.flatMap(
    (headingToken) => {
      return screenSizes.map((screenSize) => {
        return {
          token: `heading/${headingToken}`,
          screenSize,
          alias: getHeadingAlias(headingToken, screenSize),
        };
      });
    },
  );

  const typographySizesGrouped = groupBy(
    typographySizes,
    (typographySize) => typographySize.token,
  );

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
          {objectKeys(typographySizesGrouped).map((key) => {
            return (
              <tr key={key}>
                <td>
                  <TokenName name={key} />
                </td>
                {screenSizes.map((screenSize) => {
                  const typographySize = typographySizesGrouped[key].find(
                    (typographySize) =>
                      typographySize.screenSize === screenSize,
                  );

                  if (!typographySize) {
                    throw new Error(`There was no typography size found.`);
                  }

                  return (
                    <td key={screenSize}>
                      <TokenName name={typographySize.alias.name} />
                      <TypographyValueComposite
                        fontFamily={typographySize.alias.value.fontFamily}
                        fontSize={typographySize.alias.value.fontSize}
                        fontWeight={typographySize.alias.value.fontWeight}
                        lineHeight={typographySize.alias.value.lineHeight}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
