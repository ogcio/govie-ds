import { promises as fs } from 'node:fs';
import path from 'node:path';
import { CopyToClipboardButton } from './copy-to-clipboard-button';

export async function CopySvg({ src }: { src: string }) {
  const absolutePath = path.join(process.cwd(), 'public', src);
  const svgContent = await fs.readFile(absolutePath, 'utf8');

  return <CopyToClipboardButton text={svgContent} />;
}
