import { useMDXComponent } from 'next-contentlayer/hooks';
import { Heading } from '../../typography/heading';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
import { FontFamilyTable } from '../typography/font-family-table';
import { FontSizeTable } from '../typography/font-size-table';
import { FontWeightTable } from '../typography/font-weight-table';
import { LineHeightTable } from '../typography/line-height-table';
import { LetterSpacingTable } from '../typography/letter-spacing-table';
import { Typography } from '../typography/typography';
import { SpaceTable } from '../space/space-table';
import { ScreenSizeTable } from '../screen-size/screen-size-table';

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
        LineHeightTable: () => <LineHeightTable />,
        LetterSpacingTable: () => <LetterSpacingTable />,
        SpaceTable: () => <SpaceTable />,
        ScreenSizeTable: () => <ScreenSizeTable />,
        Typography: () => <Typography />,
      }}
    />
  );
}
