import {
  Alert,
  Blockquote,
  Breadcrumbs,
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
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
  ModalBody,
  ModalFooter,
  ModalTitle,
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
  Toast,
  SummaryList,
  SummaryListRow,
  SummaryListValue,
  SummaryListAction,
  ProgressBar,
  ProgressStepper,
  Table,
  Caption,
  TableHead,
  TableHeader,
  TableRow,
  TableData,
  TableBody,
  Link,
  Tooltip,
  DropdownItem,
  Form,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerWrapper,
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
import { SystemElements } from '../get-started/system-elements';
import { OpacityTable } from '../opacity/opacity-table';
import { ContactDeptOrService } from '../patterns/contact-dept-or-service';
import { PageNotFound } from '../patterns/page-not-found';
import { RenderPage } from '../patterns/render-page';
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
import { cn } from '@/lib/cn';

export type MdxProps = {
  code: string;
};

const standardComponents: MDXComponents = {
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
  DropdownItem: (props) => (
    <DropdownItem {...props}>{props.children}</DropdownItem>
  ),
  Form: (props) => <Form {...props}>{props.children}</Form>,
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
  PageNotFound: (props) => <PageNotFound {...props} />,
  RenderPage: (props) => <RenderPage {...props} />,
  ServiceUnavailable: (props) => <ServiceUnavailable {...props} />,
  ContactDeptOrService: (props) => <ContactDeptOrService {...props} />,
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
  ModalTitle: (props) => <ModalTitle>{props.children}</ModalTitle>,
  ModalBody: (props) => <ModalBody>{props.children}</ModalBody>,
  ModalFooter: (props) => (
    <ModalFooter {...props}>{props.children}</ModalFooter>
  ),
  CookieBanner: (props) => <CookieBanner {...props} />,
  List: (props) => <List {...props} />,
  ComboBox: (props) => <Combobox {...props}>{props.children}</Combobox>,
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
  Breadcrumbs: (props) => <Breadcrumbs {...props} />,
  BreadcrumbCurrentLink: (props) => <BreadcrumbCurrentLink {...props} />,
  BreadcrumbEllipsis: (props) => <BreadcrumbEllipsis {...props} />,
  BreadcrumbLink: (props) => <BreadcrumbLink {...props} />,
  PhaseBanner: (props) => <PhaseBanner {...props} />,
  Blockquote: (props) => <Blockquote {...props} />,
  ComponentContainer: ({ fullWidth, className, ...props }) => (
    <div
      {...props}
      className={cn(
        'my-xl stroke-gray-950 gi-not-prose',
        fullWidth ? '' : 'max-w-prose',
        className,
      )}
    />
  ),
  Alert: (props) => <Alert {...props} />,
  Toast: (props) => <Toast {...props} />,
  SummaryList: (props) => <SummaryList {...props} />,
  SummaryListRow: (props) => <SummaryListRow {...props} />,
  SummaryListAction: (props) => <SummaryListAction {...props} />,
  SummaryListValue: (props) => <SummaryListValue {...props} />,
  ProgressBar: (props) => <ProgressBar {...props} />,
  ProgressStepper: (props) => <ProgressStepper {...props} />,
  Table: (props) => <Table {...props} />,
  Caption: (props) => <Caption {...props} />,
  TableHead: (props) => <TableHead {...props} />,
  TableHeader: (props) => <TableHeader {...props} />,
  TableRow: (props) => <TableRow {...props} />,
  TableData: (props) => <TableData {...props} />,
  TableBody: (props) => <TableBody {...props} />,
  Tooltip: (props) => <Tooltip {...props} />,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerWrapper,
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
