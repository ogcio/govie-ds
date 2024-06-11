import { meta } from '@govie-ds/tokens';
import { objectKeys } from 'ts-extras';

type TypographyScreenSize = {
  size: string;
  value: string;
};

type TypographySize = {
  token: string;
  sizes: TypographyScreenSize[];
};

export function TypographyResponsiveSizes() {
  const screenSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  const foo: TypographySize[] = objectKeys(
    meta.light.resolved.semantic.typography,
  )
    .filter((size) => size !== 'default')
    .map((size) => {
      return {
        token: key,
        sizes: [
          {
            size: 'xs',
            value: 'foo',
          },
        ],
      };
    });

  console.log({ foo });

  // const typographyTokens = screenSizes.map((screenSize) => {
  //   const resolved = Object.hasOwn(
  //     meta.light.resolved.semantic.typography,
  //     screenSize,
  //   )
  //     ? meta.light.resolved.semantic.typography[
  //         screenSize as keyof typeof meta.light.resolved.semantic.typography
  //       ]
  //     : meta.light.resolved.semantic.typography.default;

  //   const unresolved = Object.hasOwn(
  //     meta.light.unresolved.semantic.typography,
  //     screenSize,
  //   )
  //     ? meta.light.unresolved.semantic.typography[
  //         screenSize as keyof typeof meta.light.unresolved.semantic.typography
  //       ]
  //     : meta.light.unresolved.semantic.typography.default;

  //   return {
  //     screenSize,
  //     resolved,
  //     unresolved,
  //   };
  // });

  return (
    <div>
      <table>
        <thead>
          <th></th>
          {screenSizes.map((size) => (
            <th key={size}>screen/{size}</th>
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
