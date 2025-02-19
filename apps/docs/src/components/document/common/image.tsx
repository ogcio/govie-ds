import NextImage, { ImageProps } from 'next/image';

export function Image(props: ImageProps) {
  return <NextImage {...props} />;
}
