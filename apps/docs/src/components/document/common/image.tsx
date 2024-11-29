import NextImage, { ImageProps } from 'next/image';
import { config } from '@/lib/config';

export function Image(props: ImageProps) {
  const imageSource = config.isGitHubPages()
    ? `/govie-ds${props.src}`
    : props.src;

  return <NextImage {...props} src={imageSource} />;
}
