import {
  Alert,
  Blockquote,
  Button,
  Card,
  CheckboxesGroup,
  Chip,
  Combobox,
  CookieBanner,
  FileUpload,
  Footer,
  Header,
  Heading,
  Icon,
  IconButton,
  Label,
  List,
  Modal,
  Pagination,
  Paragraph,
  PhaseBanner,
  RadiosGroup,
  SectionBreak,
  Select,
  Spinner,
  Stack,
  TabItem,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  TextArea,
  TextInput,
} from '@govie-ds/react';
import { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';
import SyntaxHighlighter from 'react-syntax-highlighter';
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
import { BasicPage } from '../patterns/basic-page';
import { ContactDeptOrService } from '../patterns/contact-dept-or-service';
import { PageNotFound } from '../patterns/page-not-found';
import { ServiceUnavailable } from '../patterns/service-not-available';
import { Favicons } from '../resources/favicons';
import { Fonts } from '../resources/fonts';
import { IconGridLayout } from '../resources/icon-grid-layout';
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
import { TwoThirds, TwoThirdsOneThird } from '@/components/layouts/two-thirds';
import { Link } from '@/components/typography/link';
import { cn } from '@/lib/cn';

export type MdxProps = {
  code: string;
};

const standardComponents: MDXComponents = {
  h1: ({ children, id }) => (
    <Heading as="h1" id={id}>
      {children}
    </Heading>
  ),
  h2: ({ children, id }) => (
    <Heading as="h2" id={id}>
      {children}
    </Heading>
  ),
  h3: ({ children, id }) => (
    <Heading as="h3" id={id}>
      {children}
    </Heading>
  ),
  h4: ({ children, id }) => (
    <Heading as="h4" id={id}>
      {children}
    </Heading>
  ),
  h5: ({ children, id }) => (
    <Heading as="h5" id={id}>
      {children}
    </Heading>
  ),
  h6: ({ children, id }) => (
    <Heading as="h6" id={id}>
      {children}
    </Heading>
  ),
  p: ({ children }) => <Paragraph>{children}</Paragraph>,
  span: ({ children }) => <Paragraph as="span">{children}</Paragraph>,
  a: ({ children, href }) =>
    href ? <Link href={href}>{children}</Link> : null,
  ul: ({ children }) => <ul className="gi-list-bullet">{children}</ul>,
  ol: ({ children }) => <ol className="gi-list-number">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  code: ({ children, className }) =>
    className ? (
      <SyntaxHighlighter
        wrapLongLines
        language={className}
        className="max-h-[300px] overflow-scroll gi-font-tertiary text-2xs"
      >
        {children as string | string[]}
      </SyntaxHighlighter>
    ) : (
      <code className="rounded-sm bg-gray-50 border-gray-100 border-xs p-xs text-gray-600 text-center text-2xs gi-font-tertiary">
        {children}
      </code>
    ),
  blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
};

const documentComponents: MDXComponents = {
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
  BasicPage: (props) => <BasicPage {...props} />,
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
  Tag: (props) => <Tag {...props}>{props.children}</Tag>,
  Header: (props) => <Header {...props}>{props.children}</Header>,
  Footer: (props) => <Footer {...props}>{props.children}</Footer>,
  RadiosGroup: (props) => <RadiosGroup {...props} />,
  Card: (props) => <Card {...props}>{props.children}</Card>,
  TextArea: (props) => <TextArea {...props}>{props.children}</TextArea>,
  Modal: (props) => <Modal {...props}>{props.children}</Modal>,
  CookieBanner: (props) => <CookieBanner {...props} />,
  List: (props) => <List {...props} />,
  ComboBox: (props) => <Combobox {...props} />,
  Chip: (props) => <Chip {...props} />,
  IconGridLayout: (props) => <IconGridLayout {...props} />,
  TextInput: (props) => <TextInput {...props} />,
  SectionBreak: (props) => <SectionBreak {...props} />,
  Select: (props) => <Select {...props} />,
  Label: (props) => <Label {...props} />,
  IconButton: (props) => <IconButton {...props} />,
  FileUpload: (props) => <FileUpload {...props} />,
  CheckboxesGroup: (props) => <CheckboxesGroup {...props} />,
  Spinner: (props) => <Spinner {...props} />,
  ButtonWithSpinner: () => (
    <Button disabled={true}>
      Loading... <Spinner inline={true} />
    </Button>
  ),
  Stack: (props) => <Stack {...props} />,
  Pagination: (props) => <Pagination {...props} />,
  PhaseBanner: (props) => <PhaseBanner {...props} />,
  Blockquote: (props) => <Blockquote {...props} />,
  ComponentContainer: (props) => (
    <div {...props} className={cn('my-xl stroke-gray-950', props.className)} />
  ),
  Alert: (props) => <Alert {...props} />,
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{
        ...standardComponents,
        ...documentComponents,
      }}
    />
  );
}
