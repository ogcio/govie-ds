import NextImage from 'next/image';

export function Image({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return <NextImage src={src} alt={alt} width={width} height={height} />;
}
