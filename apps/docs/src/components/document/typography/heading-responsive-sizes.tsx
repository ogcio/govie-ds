import { meta } from '@govie-ds/tokens';
import { objectKeys } from 'ts-extras';
import { TokenName } from '../common/token-name';
import { groupBy } from 'lodash';
import { TypographyValueComposite } from './typography-value-composite';
import { Fragment } from 'react';

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
    .replace('regular.', '')
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

export function HeadingResponsiveSizes() {
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

  return objectKeys(typographySizesGrouped).map((headingToken, index) => {
    return (
      <div className="grid grid-cols-4 gap-x-md gap-y-xl border-y-xs border-gray-50 py-xl">
        {index === 0 ? (
          <Fragment>
            <div />
            {screenSizes.map((size) => (
              <Fragment key={size}>
                <div className="flex justify-center">
                  <TokenName name={`screen/${size}`} />
                </div>
              </Fragment>
            ))}
          </Fragment>
        ) : null}

        <Fragment key={headingToken}>
          <div className="flex flex-col items-start">
            <TokenName name={headingToken} />
          </div>

          {screenSizes.map((screenSize) => {
            const typographySize = typographySizesGrouped[headingToken].find(
              (typographySize) => typographySize.screenSize === screenSize,
            );

            if (!typographySize) {
              throw new Error(`There was no typography size found.`);
            }

            return (
              <div key={screenSize} className="flex flex-col gap-lg">
                <TypographyValueComposite
                  fontSize={typographySize.alias.value.fontSize}
                  lineHeight={typographySize.alias.value.lineHeight}
                />
                <div className="hidden xl:flex justify-center">
                  <TokenName name={typographySize.alias.name} />
                </div>
              </div>
            );
          })}
        </Fragment>
      </div>
    );
  });
}
