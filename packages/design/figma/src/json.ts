import { promises as fs } from "fs";

// TODO: type
export async function writeJson({ outputFolder, filename, data }: any) {
  const filePath = `${outputFolder}/${filename}`;
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonData);
}

export async function readJson(filePath: string) {
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
}
