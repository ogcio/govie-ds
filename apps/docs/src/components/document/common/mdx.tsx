import CookieConsentCheckbox from '@/components/cookies/cookie-consent-checkbox';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
import { TwoThirds, TwoThirdsOneThird } from '@/components/layouts/two-thirds';
import { GovieLink } from '@/components/navigation/custom-link';
import { cn } from '@/lib/cn';
import {
  Accordion,
  AccordionItem,
  Alert,
  Blockquote,
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  Breadcrumbs,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Caption,
  Card,
  Chip,
  Combobox,
  CookieBanner,
  Details,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerWrapper,
  DropdownItem,
  Footer,
  Form,
  FormField,
  Header,
  HeaderSearch,
  Heading,
  Icon,
  IconButton,
  InputCheckbox,
  InputCheckboxGroup,
  InputFile,
  InputPassword,
  InputRadio,
  InputRadioGroup,
  InputText,
  List,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Pagination,
  Paragraph,
  PhaseBanner,
  ProgressBar,
  ProgressStepper,
  SectionBreak,
  Select,
  SelectItem,
  Spinner,
  Stack,
  StepItem,
  SummaryList,
  SummaryListAction,
  SummaryListRow,
  SummaryListValue,
  ScoreSelect,
  TabItem,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  TextArea,
  Tooltip,
} from '@govie-ds/react';
import { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import NextLink from 'next/link';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { BorderRadiusTable } from '../border/border-radius-table';
import { BorderWidthTable } from '../border/border-width-table';
import {
  ComponentStatusBlock,
  ComponentStatusTable,
} from '../components/component-status-table';
import { ModalWrapperSample } from '../components/modal-wrapper-example';
import { Toast } from '../components/toast';
import { DataGridSample } from '../data-grid/data-grid-sample';
import { Faq, Faqs } from '../faqs/faqs';
import { SystemElements } from '../get-started/system-elements';
import { GridPrimitives } from '../grid/grid-primitives';
import { OpacityTable } from '../opacity/opacity-table';
import { Addresses } from '../patterns/addresses';
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
import { Vision } from '../vision/vision';
import { ZIndexTable } from '../z-index/z-index-table';
import { DesignSystemBenefits } from './design-system-benefits';
import { DocumentImage } from './document-image';

export type MdxProps = {
  code: string;
};

const standardComponents: MDXComponents = {
  a: ({ ...props }) =>
    props['data-raw'] ? <a {...props} /> : <GovieLink {...props} />,
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
  Accordion,
  AccordionItem,
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
  Addresses: (props) => <Addresses {...props} />,
  GridPrimitives: (props) => <GridPrimitives {...props} />,
  TwoThirds: (props) => <TwoThirds {...props} />,
  TwoThirdsOneThird: (props) => <TwoThirdsOneThird {...props} />,
  Tabs: (props) => <Tabs {...props}>{props.children}</Tabs>,
  TabList: (props) => <TabList {...props}>{props.children}</TabList>,
  TabItem: (props) => <TabItem {...props}>{props.children}</TabItem>,
  TabPanel: (props) => <TabPanel {...props}>{props.children}</TabPanel>,
  Link: (props) => <GovieLink {...props}>{props.children}</GovieLink>,
  Paragraph: (props) => <Paragraph {...props}>{props.children}</Paragraph>,
  Heading: (props) => <Heading {...props}>{props.children}</Heading>,
  Button: (props) => <Button {...props} />,
  Icon: (props) => <Icon {...props} />,
  Tag: (props) => <Tag {...props}>{props.children}</Tag>,
  Header: (props) => <Header {...props}>{props.children}</Header>,
  Footer: (props) => <Footer {...props}>{props.children}</Footer>,
  Card: (props) => <Card {...props}>{props.children}</Card>,
  TextArea: (props) => <TextArea {...props}>{props.children}</TextArea>,
  ModalWrapper: ModalWrapperSample,
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
  InputText,
  InputRadio,
  SectionBreak: (props) => <SectionBreak {...props} />,
  Select: (props) => <Select {...props} />,
  SelectItem: (props) => <SelectItem {...props} />,
  IconButton: (props) => <IconButton {...props} />,
  InputCheckboxGroup,
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
  SummaryList: (props) => <SummaryList {...props} />,
  SummaryListRow: (props) => <SummaryListRow {...props} />,
  SummaryListAction: (props) => <SummaryListAction {...props} />,
  SummaryListValue: (props) => <SummaryListValue {...props} />,
  ScoreSelect: (props) => <ScoreSelect {...props} />,
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
  HeaderSearch,
  Details,
  StepItem,
  Toast: (props) => <Toast {...props} />,
  NextLink: (props) => <NextLink {...props} />,
  FormField: (props) => <FormField {...props} />,
  DataGridSample: () => (
    <div className="gi-not-prose">
      <DataGridSample />
    </div>
  ),
  InputPassword,
  CookieConsentCheckbox: (props) => <CookieConsentCheckbox {...props} />,
  InputCheckbox,
  InputFile,
  InputRadioGroup,
  ButtonGroup,
  ButtonGroupItem,
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
