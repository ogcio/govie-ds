import { Image } from './image';

export function DocumentImage({
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
  return (
    <div className="bg-gray-50 p-xl flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}
