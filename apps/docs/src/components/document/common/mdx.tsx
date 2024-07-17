import { Heading, Link, Paragraph } from '@govie-react/ds';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { BorderRadiusTable } from '../border/border-radius-table';
import { BorderWidthTable } from '../border/border-width-table';
import { ComponentStatusTable } from '../components/component-status-table';
import { SystemElements } from '../get-started/system-elements';
import { OpacityTable } from '../opacity/opacity-table';
import { Logos } from '../resources/logos';
import { ScreenSizeTable } from '../screen-size/screen-size-table';
import { ShadowTable } from '../shadow/shadow-table';
import { SizeTable } from '../size/size-table';
import { SpaceTable } from '../space/space-table';
import { FontFamilyTable } from '../typography/font-family-table';
import { FontSizeTable } from '../typography/font-size-table';
import { FontWeightTable } from '../typography/font-weight-table';
import { LetterSpacingTable } from '../typography/letter-spacing-table';
import { LineHeightTable } from '../typography/line-height-table';
import {
  HeadingResponsiveSizes,
  TextResponsiveSizes,
} from '../typography/responsive-sizes';
import {
  TypeScaleHeadingTable,
  TypeScaleTextTable,
} from '../typography/type-scale-table';
import { TypographyResponsive } from '../typography/typography-responsive';
import { ZIndexTable } from '../z-index/z-index-table';
import { Image } from './image';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
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
        p: ({ children }) => <Paragraph>{children}</Paragraph>,
        span: ({ children }) => <Paragraph as="span">{children}</Paragraph>,
        a: ({ children, href }) =>
          href ? <Link href={href}>{children}</Link> : null,
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
        Image: (props) => <Image {...props} />,
        ColorPrimitives: () => <ColorPrimitives />,
        FontFamilyTable: () => <FontFamilyTable />,
        FontSizeTable: () => <FontSizeTable />,
        FontWeightTable: () => <FontWeightTable />,
        LineHeightTable: () => <LineHeightTable />,
        LetterSpacingTable: () => <LetterSpacingTable />,
        TypeScaleHeadingTable: () => <TypeScaleHeadingTable />,
        TypeScaleTextTable: () => <TypeScaleTextTable />,
        HeadingResponsiveSizes: () => <HeadingResponsiveSizes />,
        TextResponsiveSizes: () => <TextResponsiveSizes />,
        TypographyResponsive: () => <TypographyResponsive />,
        ScreenSizeTable: () => <ScreenSizeTable />,
        SizeTable: () => <SizeTable />,
        SpaceTable: () => <SpaceTable />,
        BorderWidthTable: () => <BorderWidthTable />,
        BorderRadiusTable: () => <BorderRadiusTable />,
        ShadowTable: () => <ShadowTable />,
        OpacityTable: () => <OpacityTable />,
        ZIndexTable: () => <ZIndexTable />,
        ComponentStatusTable: () => <ComponentStatusTable />,
        SystemElements: () => <SystemElements />,
        Logos: () => <Logos />,
      }}
    />
  );
}
