import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import type { TargetContext, OutputFiles } from '@builder.io/mitosis';

interface GeneratedFiles {
  componentFiles?: OutputFiles[];
  nonComponentFiles?: OutputFiles[];
}

type Transform = (
  code: string,
  info: {
    /** Absolute path to the emitted file. */
    path: string;
    /** File path relative to its output dir (e.g. `atoms/Box.tsx`, `atoms/storybook/Grid.meta.ts`). */
    filePath: string;
    /** `true` when the file source is a `.lite.tsx`. */
    lite: boolean;
    /** The Mitosis `TargetContext` passed to `build.post`. */
    context: unknown;
  },
) => string;

/**
 * Higher-order helper for Mitosis `build.post` plugins.
 *
 * Iterates over every emitted file (component + non-component), applies the
 * `transform` to its contents, and writes the result back only when it changed.
 *
 * Usage:
 * ```ts
 * build: {
 *   post: postProcess((code, { path, filePath, lite, context }) => transformed),
 * }
 * ```
 */
export function postProcess(transform: Transform) {
  return (context: TargetContext, files?: GeneratedFiles) => {
    const all = [
      ...(files?.componentFiles ?? []).map((f) => ({ ...f, lite: true })),
      ...(files?.nonComponentFiles ?? []).map((f) => ({ ...f, lite: false })),
    ];
    for (const { outputDir, outputFilePath, lite } of all) {
      const absolutePath = path.join(outputDir, outputFilePath);
      const code = readFileSync(absolutePath, 'utf8');
      const next = transform(code, {
        path: absolutePath,
        filePath: outputFilePath,
        lite,
        context,
      });
      if (next !== code) {
        writeFileSync(absolutePath, next);
      }
    }
  };
}
