import { promises as fs } from 'node:fs';
import path from 'node:path';
import { DownloadIconButton } from './download-icon-button';

export async function DownloadSvg({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  const absolutePath = path.join(process.cwd(), 'public', src);
  const svgContent = await fs.readFile(absolutePath, 'utf8');

  return <DownloadIconButton text={svgContent} name={name} />;
}
