import { promises as fs } from 'node:fs';

export async function writeJson<TData>({
  outputFolder,
  filename,
  data,
}: {
  outputFolder: string;
  filename: string;
  data: TData;
}) {
  const filePath = `${outputFolder}/${filename}`;
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonData);
}

export async function readJson<TData>(filePath: string) {
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData) as TData;
}
