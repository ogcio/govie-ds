import NextImage, { ImageProps } from 'next/image';

export function Image(props: ImageProps) {
  const imageSource = props.src;

  return <NextImage {...props} src={imageSource} />;
}
