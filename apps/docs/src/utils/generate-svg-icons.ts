import fs from 'fs';

const ICON_IN = new URL(
  '../../../../packages/core/atoms/icons/',
  import.meta.url,
);

const ICON_OUT = new URL('../../public/icons/', import.meta.url);

const generateFiles = (icons: string[], directory: URL) => {
  for (const icon of icons) {
    const rawText = getRawText(new URL(icon, directory));
    const rawSvg = parseSvg(icon, rawText);
    writeToFile(icon, rawSvg);
  }
};

const filterFiles = (files: string[]) => {
  return files.filter((file) => file.endsWith('.lite.tsx'));
};

const main = () => {
  clearDirectory(ICON_OUT);

  const socialIconsDir = new URL('./socials/', ICON_IN);
  const regularIcons = filterFiles(fs.readdirSync(ICON_IN));
  const socialIcons = filterFiles(fs.readdirSync(socialIconsDir));
  generateFiles(regularIcons, ICON_IN);
  generateFiles(socialIcons, socialIconsDir);
};

const clearDirectory = (dir: URL) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    fs.unlinkSync(new URL(file, dir));
  }
};

const getRawText = (path: URL): string => {
  const text = fs.readFileSync(path, { encoding: 'utf-8' });
  return text.replaceAll('\n', '');
};

const getFileName = (tsxFileName: string) => {
  return tsxFileName.split('.')[0] + '.svg';
};

const writeToFile = (tsx: string, content: string) => {
  const file = getFileName(tsx);
  fs.writeFileSync(new URL(file, ICON_OUT), content);
};

const parseSvg = (icon: string, rawText: string) => {
  try {
    const svgContent = new RegExp('<svg\(.*\)</svg>').exec(rawText)![0];
    // removes attributes based on props. keep xmln and viewBox.
    const cleanSvg = svgContent
      .replace(/(\w+={\w+.+}) /gm, 'width="48" height="48"')
      .replaceAll(/\s+/g, ' ');
    return cleanSvg;
  } catch (err) {
    console.log('Error for icon: ', icon);
    console.error(`Icon: ${icon}\n${err}`);
    throw err;
  }
};

main();
