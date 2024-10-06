import {
  Heading,
  Paragraph,
  TabItem,
  TabList,
  TabPanel,
  Tabs,
  Button,
  Icon,
} from '@govie-ds/react';
import { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { BorderRadiusTable } from '../border/border-radius-table';
import { BorderWidthTable } from '../border/border-width-table';
import {
  ComponentStatusBlock,
  ComponentStatusTable,
} from '../components/component-status-table';
import { Faq, Faqs } from '../faqs/faqs';
import {
  DeveloperRecommendation,
  DevelopersAdvice,
} from '../get-started/developers-advice';
import { SystemElements } from '../get-started/system-elements';
import { OpacityTable } from '../opacity/opacity-table';
import { ContactDeptOrService } from '../patterns/contact-dept-or-service';
import { PageNotFound } from '../patterns/page-not-found';
import { ServiceUnavailable } from '../patterns/service-not-available';
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
import { wrapComponents } from './wrap-components';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
import { TwoThirds, TwoThirdsOneThird } from '@/components/layouts/two-thirds';
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
  code: ({ children, className }) => (
    <code
      className={cn(
        className
          ? 'rounded-xs bg-gray-50 border-gray-100 border-xs p-3 text-gray-600 text-xs block mb-2xl'
          : 'rounded-sm bg-gray-50 border-gray-100 border-xs p-xs text-gray-600 text-center text-2xs',
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
  ComponentStatusBlock: (props) => <ComponentStatusBlock {...props} />,
  SystemElements: () => <SystemElements />,
  Logos: () => <Logos />,
  Fonts: () => <Fonts />,
  Favicons: () => <Favicons />,
  Faqs: (props) => <Faqs {...props} />,
  Faq: (props) => <Faq {...props} />,
  DesignSystemBenefits: () => <DesignSystemBenefits />,
  Vision: () => <Vision />,
  DevelopersAdvice: (props) => <DevelopersAdvice {...props} />,
  PageNotFound: (props) => <PageNotFound {...props} />,
  ServiceUnavailable: (props) => <ServiceUnavailable {...props} />,
  ContactDeptOrService: (props) => <ContactDeptOrService {...props} />,
  DeveloperRecommendation: (props) => <DeveloperRecommendation {...props} />,
  TwoThirds: (props) => <TwoThirds {...props} />,
  TwoThirdsOneThird: (props) => <TwoThirdsOneThird {...props} />,
  Tabs: (props) => <Tabs {...props}>{props.children}</Tabs>,
  TabList: (props) => <TabList {...props}>{props.children}</TabList>,
  TabItem: (props) => <TabItem {...props}>{props.children}</TabItem>,
  TabPanel: (props) => <TabPanel {...props}>{props.children}</TabPanel>,
  Link: (props) => <Link {...props}>{props.children}</Link>,
  Paragraph: (props) => <Paragraph {...props}>{props.children}</Paragraph>,
  Heading: (props) => <Heading {...props}>{props.children}</Heading>,
  Button: (props) => <Button {...props} />,
  Icon: (props) => <Icon {...props} />,
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{
        ...standardComponents,
        ...wrapComponents(documentComponents, ({ key }) => {
          if (key === 'Tabs') {
            return [MarginBottom];
          }
          if (
            key === 'DeveloperRecommendation' ||
            key.includes('Tab') ||
            key === 'Link' ||
            key === 'Heading' ||
            key === 'Icon'
          ) {
            return;
          }

          return [MarginBottom];
        }),
      }}
    />
  );
}

function MarginBottom({ children }: { children: React.ReactNode }) {
  return <div className="mb-2xl">{children}</div>;
}
