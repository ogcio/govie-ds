import { useMDXComponent } from 'next-contentlayer/hooks';
import { Heading } from '../../typography/heading';
import { BorderRadiusTable } from '../border/border-radius-table';
import { BorderWidthTable } from '../border/border-width-table';
import { OpacityTable } from '../opacity/opacity-table';
import { ScreenSizeTable } from '../screen-size/screen-size-table';
import { ShadowTable } from '../shadow/shadow-table';
import { SpaceTable } from '../space/space-table';
import { FontFamilyTable } from '../typography/font-family-table';
import { FontSizeTable } from '../typography/font-size-table';
import { FontWeightTable } from '../typography/font-weight-table';
import { LetterSpacingTable } from '../typography/letter-spacing-table';
import { LineHeightTable } from '../typography/line-height-table';
import {
  HeadingResponsiveSizes,
  DisplayResponsiveSizes,
} from '../typography/responsive-sizes';
import { TypographyResponsive } from '../typography/typography-responsive';
import {
  TypographyHeadingTable,
  TypographyTextTable,
} from '../typography/typography-table';
import { ZIndexTable } from '../z-index/z-index-table';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
import { Text } from '@/components/typography/text';
import { cn } from '@/lib/cn';

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
        p: ({ children }) => <Text>{children}</Text>,
        span: ({ children }) => <Text as="span">{children}</Text>,
        code: ({ children }) => (
          <code
            className={cn(
              'rounded-sm bg-gray-50 border-gray-100 border-xs p-xs',
              'text-gray-600 text-center text-2xs',
            )}
          >
            {children}
          </code>
        ),
        ColorPrimitives: () => <ColorPrimitives />,
        FontFamilyTable: () => <FontFamilyTable />,
        FontSizeTable: () => <FontSizeTable />,
        FontWeightTable: () => <FontWeightTable />,
        LineHeightTable: () => <LineHeightTable />,
        LetterSpacingTable: () => <LetterSpacingTable />,
        TypographyHeadingTable: () => <TypographyHeadingTable />,
        TypographyTextTable: () => <TypographyTextTable />,
        HeadingResponsiveSizes: () => <HeadingResponsiveSizes />,
        DisplayResponsiveSizes: () => <DisplayResponsiveSizes />,
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
