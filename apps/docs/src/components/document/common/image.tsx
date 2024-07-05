import NextImage from 'next/image';
import { config } from '@/lib/config';

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
  const imageSource = config.isGitHubPages() ? `/govie-ds${src}` : src;

  return (
    <div className="bg-gray-50 p-lg flex items-center justify-center">
      <div className="max-w-[60%]">
        <NextImage
          src={imageSource}
          alt={alt}
          width={width}
          height={height}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
    </div>
  );
}
