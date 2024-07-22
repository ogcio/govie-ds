import { meta } from '@govie-ds/tokens';
import kebabCase from 'kebab-case';
import { Dictionary, groupBy } from 'lodash';
import { Fragment } from 'react';
import { objectKeys } from 'ts-extras';
import { SampleTable } from '../common/sample-table';
import { SampleToken } from '../common/sample-token';
import { TokenAlias } from '../common/token-alias';
import { TokenName } from '../common/token-name';
import { TypographyValueComposite } from './typography-value-composite';
import { Table, Td, Tr } from '../common/table';
import { TokenValue } from '../common/token-value';
import { Text } from '@/components/typography/text';

type TypographyScreenAliasValue = {
  fontFamily: string[];
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
};

type TypographyScreenAlias = {
  name: string;
  value: TypographyScreenAliasValue;
};

type TypographySize = {
  token: string;
  screenSize: string;
  alias: TypographyScreenAlias;
};

type TypeScaleValue = {
  name: string;
  value: TypographyScreenAliasValue;
};

function aliasToTokenName(alias: string) {
  const parts = alias
    .replace('{primitive.', '')
    .replace('{semantic.', '')
    .replace('regular.', '')
    .replace('}', '')
    .split('.');

  return parts.map((part) => kebabCase(part)).join('/');
}

// TODO: type
function getTypographyValue(
  typography: any,
  screenSize: keyof typeof meta.light.resolved.semantic.typography,
  tokenName: keyof typeof meta.light.resolved.semantic.typography.default,
) {
  if (
    Object.hasOwn(typography, screenSize) &&
    Object.hasOwn(typography[screenSize], tokenName)
  ) {
    return typography[screenSize][tokenName];
  }

  if (Object.hasOwn(typography, 'default')) {
    return typography.default[tokenName];
  }

  throw new Error(
    `There was no typography size found for screen size ${screenSize} and token ${tokenName}.`,
  );
}

function getAlias({
  tokenName,
  token,
  screenSize,
}: {
  tokenName: keyof typeof meta.light.resolved.semantic.typography.default;
  token: string;
  screenSize: keyof typeof meta.light.resolved.semantic.typography;
}): TypographyScreenAlias {
  const resolved = getTypographyValue(
    meta.light.resolved.semantic.typography,
    screenSize,
    tokenName,
  );

  const unresolved = getTypographyValue(
    meta.light.unresolved.semantic.typography,
    screenSize,
    tokenName,
  );

  return {
    name: aliasToTokenName(unresolved[token as keyof typeof unresolved].$value),
    value: resolved[token as keyof typeof resolved].$value,
  };
}

function TypographyResponsiveSizes({
  tokenName,
  size,
}: {
  tokenName: keyof typeof meta.light.resolved.semantic.typography.default;
  size: string;
}) {
  const screenSizes = objectKeys(
    meta.light.resolved.semantic.typography,
  ).filter((size) => size !== 'default');

  const tokens = objectKeys(
    meta.light.resolved.semantic.typography.default[tokenName],
  );

  const typographySizes: TypographySize[] = tokens.flatMap((token) => {
    return screenSizes.map((screenSize) => {
      return {
        token: `${tokenName}/${token}`,
        screenSize,
        alias: getAlias({ tokenName, token, screenSize }),
      };
    });
  });

  const typographySizesGrouped = groupBy(
    typographySizes,
    (typographySize) => typographySize.token,
  );

  const tokenGroup = typographySizesGrouped[`${tokenName}/${size}`];

  const sampleTokens: SampleToken<TypeScaleValue>[] = tokenGroup.map(
    (typographySize) => {
      return {
        name: typographySize.screenSize,
        value: {
          name: typographySize.alias.name,
          value: typographySize.alias.value,
        },
      };
    },
  );

  return (
    <SampleTable<TypeScaleValue>
      name="screen"
      tokenColumnName="Screen"
      tokens={sampleTokens}
      renderValue={({ value }) => {
        return <TokenName name={value.name} />;
      }}
      renderSample={({ value }) => (
        <Text
          className="mb-0"
          style={{
            ...value.value,
            fontFamily: value.value.fontFamily.join(', '),
          }}
        >
          Heading Xl
        </Text>
      )}
    />
  );
}

function TypographySizesDetailed({
  typographySizesGrouped,
  screenSizes,
}: {
  typographySizesGrouped: Dictionary<TypographySize[]>;
  screenSizes: string[];
}) {
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
                  <TokenAlias name={typographySize.alias.name} />
                </div>
              </div>
            );
          })}
        </Fragment>
      </div>
    );
  });
}

export function HeadingResponsiveSizes() {
  return <TypographyResponsiveSizes tokenName="heading" size="xl" />;
}

export function TextResponsiveSizes() {
  return null; // return <TypographyResponsiveSizes tokenName="text" />;
}
