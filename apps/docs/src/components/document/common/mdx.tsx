import { useMDXComponent } from 'next-contentlayer/hooks';
import { Heading } from '../../typography/heading';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
import { FontFamilyTable } from '../typography/font-family-table';
import { FontSizeTable } from '../typography/font-size-table';
import { FontWeightTable } from '../typography/font-weight-table';
import { LineHeightTable } from '../typography/line-height-table';
import { LetterSpacingTable } from '../typography/letter-spacing-table';
import { TypographyTable } from '../typography/typography-table';
import { HeadingResponsiveSizes } from '../typography/heading-responsive-sizes';
import { TypographyResponsive } from '../typography/typography-responsive';
import { ScreenSizeTable } from '../screen-size/screen-size-table';
import { SpaceTable } from '../space/space-table';
import { BorderWidthTable } from '../border/border-width-table';
import { BorderRadiusTable } from '../border/border-radius-table';
import { ShadowTable } from '../shadow/shadow-table';
import { OpacityTable } from '../opacity/opacity-table';
import { ZIndexTable } from '../z-index/z-index-table';

export type MdxProps = {
  code: string;
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{
        h1: ({ children }) => <Heading as="h1">{children}</Heading>,
        h2: ({ children }) => <Heading as="h2">{children}</Heading>,
        h3: ({ children }) => <Heading as="h3">{children}</Heading>,
        h4: ({ children }) => <Heading as="h4">{children}</Heading>,
        h5: ({ children }) => <Heading as="h5">{children}</Heading>,
        h6: ({ children }) => <Heading as="h6">{children}</Heading>,
        ColorPrimitives: () => <ColorPrimitives />,
        FontFamilyTable: () => <FontFamilyTable />,
        FontSizeTable: () => <FontSizeTable />,
        FontWeightTable: () => <FontWeightTable />,
        LineHeightTable: () => <LineHeightTable />,
        LetterSpacingTable: () => <LetterSpacingTable />,
        TypographyTable: () => <TypographyTable />,
        HeadingResponsiveSizes: () => <HeadingResponsiveSizes />,
        TypographyResponsive: () => <TypographyResponsive />,
        ScreenSizeTable: () => <ScreenSizeTable />,
        SpaceTable: () => <SpaceTable />,
        BorderWidthTable: () => <BorderWidthTable />,
        BorderRadiusTable: () => <BorderRadiusTable />,
        ShadowTable: () => <ShadowTable />,
        OpacityTable: () => <OpacityTable />,
        ZIndexTable: () => <ZIndexTable />,
      }}
    />
  );
}
