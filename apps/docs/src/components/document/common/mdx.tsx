import { Heading, Paragraph } from '@govie-react/ds';
import { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { BorderRadiusTable } from '../border/border-radius-table';
import { BorderWidthTable } from '../border/border-width-table';
import { ComponentStatusTable } from '../components/component-status-table';
import { Faq, Faqs } from '../faqs/faqs';
import { SystemElements } from '../get-started/system-elements';
import { OpacityTable } from '../opacity/opacity-table';
import { Favicons } from '../resources/favicons';
import { Fonts } from '../resources/fonts';
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
import { Vision } from '../vision/vision';
import { ZIndexTable } from '../z-index/z-index-table';
import { DesignSystemBenefits } from './design-system-benefits';
import { DocumentImage } from './document-image';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
import { Highlight } from '@/components/typography/highlight';
import { Link } from '@/components/typography/link';
import { cn } from '@/lib/cn';

export type MdxProps = {
  code: string;
};

const standardComponents: MDXComponents = {
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
  ul: ({ children }) => <ul className="list-disc ml-xl">{children}</ul>,
  li: ({ children }) => <li className="text-md mb-sm">{children}</li>,
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
  blockquote: ({ children }) => <Highlight>{children}</Highlight>,
};

const documentComponents: MDXComponents = {
  Highlight: ({ children }) => <Highlight>{children}</Highlight>,
  Image: (props) => <DocumentImage {...props} />,
  ColorPrimitives: () => <ColorPrimitives />,
  FontFamilyTable: () => <FontFamilyTable />,
  FontSizeTable: () => <FontSizeTable />,
  FontWeightTable: () => <FontWeightTable />,
  LineHeightTable: () => <LineHeightTable />,
  LetterSpacingTable: () => <LetterSpacingTable />,
  TypeScaleHeadingTable: () => <TypeScaleHeadingTable />,
  TypeScaleTextTable: () => <TypeScaleTextTable />,
  HeadingResponsiveSizes: (props) => <HeadingResponsiveSizes {...props} />,
  TextResponsiveSizes: (props) => <TextResponsiveSizes {...props} />,
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
  Fonts: () => <Fonts />,
  Favicons: () => <Favicons />,
  Faqs: (props) => <Faqs {...props} />,
  Faq: (props) => <Faq {...props} />,
  DesignSystemBenefits: () => <DesignSystemBenefits />,
  Vision: () => <Vision />,
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{
        ...standardComponents,
        ...wrapComponents(documentComponents, () => {
          return [MarginBottom];
        }),
      }}
    />
  );
}

// TODO: type
function wrapComponents(
  components: Record<string, any>,
  wrapper: ({ key }: { key: string }) => any[] | undefined, // TODO: update types
) {
  // TODO: type
  return Object.keys(components).reduce((accumulator, key) => {
    const Component = components[key];

    accumulator[key] = (props: Record<string, unknown>) => {
      const wrappers = wrapper({
        key,
      });

      if (!wrappers || wrappers.length === 0) {
        return <Component {...props} />;
      }

      return (
        <NestedComponents
          component={<Component {...props} />}
          wrappers={wrappers}
        />
      );
    };

    return accumulator;
  }, {} as any);
}

// TODO: type
const NestedComponents = ({
  component,
  wrappers,
}: {
  component: any;
  wrappers: any[];
}) => {
  const nestedComponents = wrappers.reduceRight((accumulator, Component) => {
    return <Component>{accumulator}</Component>;
  }, component);

  return nestedComponents;
};

function MarginBottom({ children }: { children: React.ReactNode }) {
  return <div className="mb-2xl">{children}</div>;
}
