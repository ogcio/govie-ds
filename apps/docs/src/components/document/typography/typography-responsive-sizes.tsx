import { meta } from '@govie-ds/tokens';
import { objectKeys } from 'ts-extras';

export function TypographyResponsiveSizes() {
  const screenSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  const typographyTokens = screenSizes.map((screenSize) => {
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

    return {
      screenSize,
      resolved,
      unresolved,
    };
  });

  return (
    <div>
      <table>
        <thead>
          <th></th>
          {screenSizes.map((size) => (
            <th>screen/{size}</th>
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
