import { useMDXComponent } from 'next-contentlayer/hooks';
import { Heading } from '../typography/heading';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
import { FontFamilyTable } from './typography/font-family-table';
import { FontSizeTable } from './typography/font-size-table';
import { FontWeightTable } from './typography/font-weight-table';
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
        FontFamilyTable: () => <FontFamilyTable />,
        FontSizeTable: () => <FontSizeTable />,
        FontWeightTable: () => <FontWeightTable />,
        Typography: () => <Typography />,
      }}
    />
  );
}
