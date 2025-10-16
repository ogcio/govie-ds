import CookieConsentCheckbox from '@/components/cookies/cookie-consent-checkbox';
import { ColorPrimitives } from '@/components/document/color/color-primitives';
import { DownloadTheme } from '@/components/document/theme/download-theme';
import { ThemeBuilder } from '@/components/document/theme/theme-builder';
import { TwoThirds, TwoThirdsOneThird } from '@/components/layouts/two-thirds';
import { GovieLink } from '@/components/navigation/custom-link';
import { cn } from '@/lib/cn';
import {
  Autocomplete,
  AutocompleteItem,
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
  CardDescription,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardTag,
  CardContainer,
  CardAction,
  CardMedia,
  Chip,
  Combobox,
  Container,
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
  FormFieldLabel,
  FormFieldError,
  FormFieldHint,
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
  Popover,
  ProgressBar,
  ProgressStepper,
  ScoreSelect,
  SectionBreak,
  Select,
  SelectItem,
  SelectGroupItem,
  SideNav,
  SideNavItem,
  Spinner,
  Stack,
  StepItem,
  SummaryList,
  SummaryListAction,
  SummaryListRow,
  SummaryListValue,
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
} from '@ogcio/design-system-react';
import { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import NextLink from 'next/link';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { BorderRadiusTable } from '../border/border-radius-table';
import { BorderWidthTable } from '../border/border-width-table';
import {
  ComponentPreview,
  ComponentPreviewItem,
  ComponentPreviewLayout,
} from '../components/component-preview';
import { FigmaPreviewButton } from '../components/figma-preview-button';
import { ComponentPropertiesTable } from '../components/component-properties-table';
import {
  ComponentStatusBlock,
  ComponentStatusTable,
} from '../components/component-status-table';
import { PopoverSample } from '../components/popover-wrapper-sample';
import { ModalWrapperSample } from '../components/modal-wrapper-sample';
import { Section } from '../components/section';
import { StorybookFrame } from '../components/storybook-frame';
import { Toast } from '../components/toast';
import { DataTableSample } from '../data-table/data-table-sample';
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
import { LoadingPattern } from '../patterns/loading';
import {
  HeaderComposableSample,
  HeaderComposableLightSample,
  HeaderComposableDontSample,
  HeaderComposableGovieSample,
} from '../components/header-composable-sample';
export type MdxProps = {
  code: string;
};

const standardComponents: MDXComponents = {
  a: ({ ...props }) =>
    props['data-raw'] ? <a {...props} /> : <GovieLink {...props} />,
  ul: ({ children, className }) => (
    <ul className={className || 'gi-list-bullet'}>{children}</ul>
  ),
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
  Addresses,
  Alert,
  Autocomplete,
  AutocompleteItem: (props) => {
    return <AutocompleteItem {...props} __type="AutocompleteItem" />;
  },
  Blockquote,
  BorderRadiusTable,
  BorderWidthTable,
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  Breadcrumbs,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  ButtonWithSpinner: () => (
    <Button disabled={true}>
      Loading... <Spinner inline={true} />
    </Button>
  ),
  Caption,
  Card: (props) => <Card {...props} __type="Card" />,
  CardDescription: (props) => (
    <CardDescription {...props} __type="CardDescription" />
  ),
  CardTitle: (props) => <CardTitle {...props} __type="CardTitle" />,
  CardSubtitle: (props) => <CardSubtitle {...props} __type="CardSubtitle" />,
  CardTag: (props) => <CardTag {...props} __type="CardTag" />,
  CardContainer: (props) => <CardContainer {...props} __type="CardContainer" />,
  CardAction: (props) => <CardAction {...props} __type="CardAction" />,
  CardHeader: (props) => <CardHeader {...props} __type="CardHeader" />,
  CardMedia: (props) => <CardMedia {...props} __type="CardMedia" />,
  Chip,
  ColorPrimitives,
  Combobox,
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
  ComponentPreview,
  ComponentPreviewItem,
  ComponentPreviewLayout,
  Container,
  FigmaPreviewButton,
  ComponentPropertiesTable,
  ComponentStatusBlock,
  ComponentStatusTable,
  ContactDeptOrService,
  CookieBanner,
  CookieConsentCheckbox,
  DownloadTheme,
  ThemeBuilder,
  DataTableSample: () => (
    <div className="gi-not-prose">
      <DataTableSample />
    </div>
  ),
  DesignSystemBenefits,
  Details,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerWrapper,
  DropdownItem,
  Faq,
  Faqs,
  Favicons,
  FontFamilyTable,
  FontSizeTable,
  FontWeightTable,
  Fonts,
  Form,
  FormField,
  FormFieldLabel: (props) => {
    return <FormFieldLabel {...props} __type="FormFieldLabel" />;
  },
  FormFieldError: (props) => {
    return <FormFieldError {...props} __type="FormFieldError" />;
  },
  FormFieldHint: (props) => {
    return <FormFieldHint {...props} __type="FormFieldHint" />;
  },
  Footer,
  GridPrimitives,
  Header,
  HeaderSearch,
  Heading,
  HeadingResponsiveSizes,
  Icon,
  IconButton,
  IconGridLayout,
  Image: (props) => <DocumentImage {...props} />,
  InputCheckbox,
  InputCheckboxGroup,
  InputFile,
  InputPassword,
  InputRadio,
  InputRadioGroup,
  InputText,
  LetterSpacingTable,
  LineHeightTable,
  Link: (props) => <GovieLink {...props}>{props.children}</GovieLink>,
  List,
  LoadingPattern,
  Logos,
  Modal,
  ModalBody,
  ModalFooter: (props) => {
    return <ModalFooter {...props} __type="ModalFooter" />;
  },
  ModalTitle: (props) => {
    return <ModalTitle {...props} __type="ModalTitle" />;
  },
  ModalWrapper: ModalWrapperSample,
  NextLink,
  OpacityTable,
  PageNotFound,
  Pagination,
  Paragraph,
  PhaseBanner,
  Popover,
  ProgressBar,
  ProgressStepper,
  RenderPage,
  ScreenSizeTable,
  ScoreSelect,
  Section,
  SectionBreak,
  Select,
  SelectGroupItem,
  SelectItem,
  ServiceUnavailable,
  ShadowTable,
  SideNav,
  SideNavItem,
  SizeTable,
  SpaceTable,
  Spinner,
  Stack,
  StepItem,
  SummaryList,
  SummaryListAction,
  SummaryListRow,
  SummaryListValue,
  StorybookFrame,
  SystemElements,
  TabItem,
  TabList,
  TabPanel,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Tag,
  TextArea,
  TextResponsiveSizes,
  Toast,
  Tooltip,
  TwoThirds,
  TwoThirdsOneThird,
  TypeScaleHeadingTable,
  TypeScaleTextTable,
  Vision,
  ZIndexTable,
  PopoverSample,
  HeaderComposableLightSample,
  HeaderComposableSample,
  HeaderComposableDontSample,
  HeaderComposableGovieSample,
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
