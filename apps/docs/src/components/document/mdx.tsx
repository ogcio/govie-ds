import { useMDXComponent } from 'next-contentlayer/hooks';
import { Heading } from '../typography/heading';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
import { FontSizesTable } from './typography/font-sizes-table';
import { FontWeightsTable } from './typography/font-weights-table';
import { Typography } from './typography/typography';

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
        FontSizesTable: () => <FontSizesTable />,
        FontWeightsTable: () => <FontWeightsTable />,
        Typography: () => <Typography />,
      }}
    />
  );
}
