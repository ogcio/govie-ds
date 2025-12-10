import { meta } from '@ogcio/design-system-tokens';
import { kebabCase, groupBy } from 'lodash';
import { objectKeys } from 'ts-extras';
import { SampleTable } from '../common/sample-table';
import { SampleToken } from '../common/sample-token';
import { TokenName } from '../common/token-name';

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
  sampleText,
}: {
  tokenName: keyof typeof meta.light.resolved.semantic.typography.default;
  size: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs';
  sampleText: string;
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

  if (!tokenGroup) {
    throw new Error(
      `There was no typography size found for token ${tokenName}/${size}.`,
    );
  }

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
      renderSample={({ value }) =>
        tokenName === 'heading' ? (
          <h1
            className="gi-font-bold"
            style={{
              ...value.value,
              fontFamily: undefined,
            }}
          >
            {sampleText}
          </h1>
        ) : (
          <p
            style={{
              ...value.value,
              fontFamily: undefined,
            }}
          >
            {sampleText}
          </p>
        )
      }
    />
  );
}

export function HeadingResponsiveSizes({
  size,
  sampleText,
}: {
  size: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs';
  sampleText: string;
}) {
  return (
    <TypographyResponsiveSizes
      tokenName="heading"
      size={size}
      sampleText={sampleText}
    />
  );
}

export function TextResponsiveSizes({
  size,
  sampleText,
}: {
  size: 'lg' | 'md' | 'sm';
  sampleText: string;
}) {
  return (
    <TypographyResponsiveSizes
      tokenName="text"
      size={size}
      sampleText={sampleText}
    />
  );
}
