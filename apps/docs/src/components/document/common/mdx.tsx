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
  ScoreSelect,
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
  SideNav,
  SideNavItem,
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
import { Section } from '../components/section';
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
import { ComponentPropertiesTable } from '../components/component-properties-table';
import {
  ComponentPreviewLayout,
  ComponentPreviewItem,
  ComponentPreview,
} from '../components/component-preview';
import { C } from 'vitest/dist/chunks/reporters.d.CfRkRKN2.js';

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
  Card,
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
  ComponentPropertiesTable,
  ComponentStatusBlock,
  ComponentStatusTable,
  ContactDeptOrService,
  CookieBanner,
  CookieConsentCheckbox,
  DataGridSample: () => (
    <div className="gi-not-prose">
      <DataGridSample />
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
  Logos,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalWrapper: ModalWrapperSample,
  NextLink,
  OpacityTable,
  PageNotFound,
  Pagination,
  Paragraph,
  PhaseBanner,
  ProgressBar,
  ProgressStepper,
  RenderPage,
  ScreenSizeTable,
  ScoreSelect,
  Section,
  SectionBreak,
  Select,
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
