import dynamic from 'next/dynamic';

export function DynamicSvg({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  const SvgComponent = dynamic(() => import(`../public/images/${src}.svg`), {
    ssr: false,
  });

  return <SvgComponent width={width} height={height} />;
}
