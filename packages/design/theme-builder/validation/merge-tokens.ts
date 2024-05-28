import { promises as fs } from "fs";
import { glob } from "glob";
import { deepmerge } from "@govie-ds/deepmerge";

export async function mergeDesignTokens({
  source,
  tokens,
}: {
  source: string[];
  tokens: unknown;
}) {
  let mergedTokens = {};

  for await (const sourceGlob of source) {
    const files = await glob(sourceGlob);

    for await (const file of files) {
      const fileContent = await fs.readFile(file, "utf8");
      const fileTokens = JSON.parse(fileContent);
      mergedTokens = deepmerge(mergedTokens, fileTokens);
    }
  }

  return deepmerge(mergedTokens, tokens);
}
