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
  Box,
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  Breadcrumbs,
  BrowserSupport,
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
  Divider,
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
  Grid,
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
  InsetText,
  LinkButton,
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
  SideNavHeading,
  Spinner,
  Stack,
  StepItem,
  SummaryList,
  SummaryListAction,
  SummaryListRow,
  SummaryListValue,
  SummaryListHeader,
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
  Text,
  TextArea,
  Tooltip,
  generateSvgPlaceholderDataUrl,
} from '@ogcio/design-system-react';

import { AccessibilityIcon } from '@ogcio/design-system-react/icons';
import { AddCircleIcon } from '@ogcio/design-system-react/icons';
import { AppsIcon } from '@ogcio/design-system-react/icons';
import { ArrowBackwardIcon } from '@ogcio/design-system-react/icons';
import { ArrowDownwardIcon } from '@ogcio/design-system-react/icons';
import { ArrowDropDownIcon } from '@ogcio/design-system-react/icons';
import { ArrowDropUpIcon } from '@ogcio/design-system-react/icons';
import { ArrowForwardIcon } from '@ogcio/design-system-react/icons';
import { ArrowLeftIcon } from '@ogcio/design-system-react/icons';
import { ArrowOutwardIcon } from '@ogcio/design-system-react/icons';
import { ArrowRightIcon } from '@ogcio/design-system-react/icons';
import { ArrowUpwardIcon } from '@ogcio/design-system-react/icons';
import { AttachFileIcon } from '@ogcio/design-system-react/icons';
import { BlockIcon } from '@ogcio/design-system-react/icons';
import { CallIcon } from '@ogcio/design-system-react/icons';
import { CancelIcon } from '@ogcio/design-system-react/icons';
import { CandlestickChartIcon } from '@ogcio/design-system-react/icons';
import { ChatBubbleIcon } from '@ogcio/design-system-react/icons';
import { CheckIcon } from '@ogcio/design-system-react/icons';
import { CheckCircleIcon } from '@ogcio/design-system-react/icons';
import { CloseIcon } from '@ogcio/design-system-react/icons';
import { KeyboardArrowLeftIcon } from '@ogcio/design-system-react/icons';
import { KeyboardArrowRightIcon } from '@ogcio/design-system-react/icons';
import { ChildCareIcon } from '@ogcio/design-system-react/icons';
import { ContentCopyIcon } from '@ogcio/design-system-react/icons';
import { CreditCardIcon } from '@ogcio/design-system-react/icons';
import { DeleteIcon } from '@ogcio/design-system-react/icons';
import { DirectionsCarIcon } from '@ogcio/design-system-react/icons';
import { DoNotDisturbOnIcon } from '@ogcio/design-system-react/icons';
import { DownloadIcon } from '@ogcio/design-system-react/icons';
import { EditIcon } from '@ogcio/design-system-react/icons';
import { ErrorIcon } from '@ogcio/design-system-react/icons';
import { EventIcon } from '@ogcio/design-system-react/icons';
import { FilterListIcon } from '@ogcio/design-system-react/icons';
import { FirstPageIcon } from '@ogcio/design-system-react/icons';
import { HealthAndSafetyIcon } from '@ogcio/design-system-react/icons';
import { HomeIcon } from '@ogcio/design-system-react/icons';
import { InfoIcon } from '@ogcio/design-system-react/icons';
import { KeyboardArrowDownIcon } from '@ogcio/design-system-react/icons';
import { KeyboardArrowUpIcon } from '@ogcio/design-system-react/icons';
import { LastPageIcon } from '@ogcio/design-system-react/icons';
import { LinkIcon } from '@ogcio/design-system-react/icons';
import { LocationOnIcon } from '@ogcio/design-system-react/icons';
import { LoginIcon } from '@ogcio/design-system-react/icons';
import { LogoutIcon } from '@ogcio/design-system-react/icons';
import { MailIcon } from '@ogcio/design-system-react/icons';
import { MenuIcon } from '@ogcio/design-system-react/icons';
import { MicIcon } from '@ogcio/design-system-react/icons';
import { MoreHorizontalIcon } from '@ogcio/design-system-react/icons';
import { MoreVerticalIcon } from '@ogcio/design-system-react/icons';
import { OpenInNewIcon } from '@ogcio/design-system-react/icons';
import { PersonIcon } from '@ogcio/design-system-react/icons';
import { PersonCancelIcon } from '@ogcio/design-system-react/icons';
import { PersonCheckIcon } from '@ogcio/design-system-react/icons';
import { RefreshIcon } from '@ogcio/design-system-react/icons';
import { SearchIcon } from '@ogcio/design-system-react/icons';
import { SendIcon } from '@ogcio/design-system-react/icons';
import { SettingsIcon } from '@ogcio/design-system-react/icons';
import { SortIcon } from '@ogcio/design-system-react/icons';
import { SpaceDashboardIcon } from '@ogcio/design-system-react/icons';
import { SyncIcon } from '@ogcio/design-system-react/icons';
import { SwapVerticalIcon } from '@ogcio/design-system-react/icons';
import { ThumbDownIcon } from '@ogcio/design-system-react/icons';
import { ThumbUpIcon } from '@ogcio/design-system-react/icons';
import { UnfoldMoreIcon } from '@ogcio/design-system-react/icons';
import { UploadIcon } from '@ogcio/design-system-react/icons';
import { VisibilityIcon } from '@ogcio/design-system-react/icons';
import { VisibilityOffIcon } from '@ogcio/design-system-react/icons';
import { WarningIcon } from '@ogcio/design-system-react/icons';
import { WorkIcon } from '@ogcio/design-system-react/icons';
import { BlueskyIcon } from '@ogcio/design-system-react/icons';
import { FacebookIcon } from '@ogcio/design-system-react/icons';
import { InstagramIcon } from '@ogcio/design-system-react/icons';
import { LinkedinIcon } from '@ogcio/design-system-react/icons';
import { ThreadsIcon } from '@ogcio/design-system-react/icons';
import { TiktokIcon } from '@ogcio/design-system-react/icons';
import { XIcon } from '@ogcio/design-system-react/icons';
import { YoutubeIcon } from '@ogcio/design-system-react/icons';
import { PlaceholderIcon } from '@ogcio/design-system-react/icons';

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
  Box,
  BorderRadiusTable,
  BorderWidthTable,
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  Breadcrumbs,
  BrowserSupport,
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
  CardPlaceholder: ({ width, height, ...props }) => (
    <CardMedia
      {...props}
      media={{
        type: 'image',
        config: {
          src: generateSvgPlaceholderDataUrl(width, height),
        },
      }}
      __type="CardMedia"
    />
  ),
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
  Divider,
  DownloadTheme,
  ThemeBuilder,
  DataTableSample: () => (
    <div className="gi-not-prose">
      <DataTableSample />
    </div>
  ),
  DesignSystemBenefits,
  Details,
  Drawer: (props) => <Drawer {...props} __type="Drawer" />,
  DrawerBody: (props) => <DrawerBody {...props} __type="DrawerBody" />,
  DrawerFooter: (props) => <DrawerFooter {...props} __type="DrawerFooter" />,
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
  Grid,
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
  SideNavHeading,
  SizeTable,
  SpaceTable,
  Spinner,
  Stack,
  StepItem,
  SummaryList: (props) => {
    return (
      <SummaryList {...props} className="gi-not-prose" __type="SummaryList" />
    );
  },
  SummaryListAction: (props) => {
    return (
      <SummaryListAction
        {...props}
        className="gi-not-prose"
        __type="SummaryListAction"
      />
    );
  },
  SummaryListRow: (props) => {
    return (
      <SummaryListRow
        {...props}
        className="gi-not-prose"
        __type="SummaryListRow"
      />
    );
  },
  SummaryListValue: (props) => {
    return (
      <SummaryListValue
        {...props}
        className="gi-not-prose"
        __type="SummaryListValue"
      />
    );
  },
  SummaryListHeader: (props) => {
    return (
      <SummaryListHeader
        {...props}
        className="gi-not-prose"
        __type="SummaryListHeader"
      />
    );
  },
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
  Text,
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
  InsetText,
  LinkButton,
  // icons
  AccessibilityIcon,
  AddCircleIcon,
  AppsIcon,
  ArrowBackwardIcon,
  ArrowDownwardIcon,
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowOutwardIcon,
  ArrowRightIcon,
  ArrowUpwardIcon,
  AttachFileIcon,
  BlockIcon,
  CallIcon,
  CancelIcon,
  CandlestickChartIcon,
  ChatBubbleIcon,
  CheckIcon,
  CheckCircleIcon,
  ChildCareIcon,
  CloseIcon,
  ContentCopyIcon,
  CreditCardIcon,
  DeleteIcon,
  DirectionsCarIcon,
  DoNotDisturbOnIcon,
  DownloadIcon,
  EditIcon,
  ErrorIcon,
  EventIcon,
  FilterListIcon,
  HealthAndSafetyIcon,
  HomeIcon,
  InfoIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
  KeyboardArrowUpIcon,
  LinkIcon,
  LocationOnIcon,
  LoginIcon,
  LogoutIcon,
  MailIcon,
  MenuIcon,
  MicIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  OpenInNewIcon,
  PersonIcon,
  PersonCancelIcon,
  PersonCheckIcon,
  RefreshIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  SortIcon,
  SpaceDashboardIcon,
  SyncIcon,
  SwapVerticalIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  UnfoldMoreIcon,
  UploadIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  WarningIcon,
  WorkIcon,
  BlueskyIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  ThreadsIcon,
  TiktokIcon,
  XIcon,
  YoutubeIcon,
  PlaceholderIcon,
  FirstPageIcon,
  LastPageIcon,
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
