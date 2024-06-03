import { useMDXComponent } from 'next-contentlayer/hooks';
import { Heading } from '../typography/heading';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
import { FontSizes } from './typography/font-sizes';
import { FontWeights } from './typography/font-weights';

export type MdxProps = {
  code: string;
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{
        h2: ({ children }) => <Heading as="h2">{children}</Heading>,
        ColorPrimitives: () => <ColorPrimitives />,
        FontSizes: () => <FontSizes />,
        FontWeights: () => <FontWeights />,
      }}
    />
  );
}
