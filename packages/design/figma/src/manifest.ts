import { promises as fs } from "fs";
import { FigmaManifest } from "./figma-types.js";

export async function createManifest({
  outputFolder,
  manifest,
}: {
  outputFolder: string;
  manifest: FigmaManifest;
}) {
  await fs.writeFile(
    `${outputFolder}/manifest.json`,
    JSON.stringify(manifest, null, 2),
  );
}
