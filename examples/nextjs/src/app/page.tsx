'use client';
import NextLink from 'next/link';
import { ComboBoxProps, CookieBannerProps } from '@/props';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { GovieParagraph, GovieButton } from '@ogcio/govie-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  Breadcrumbs,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Card,
  Chip,
  Combobox,
  Container,
  CookieBanner,
  Details,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DropdownItem,
  Footer,
  Form,
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
  Header,
  HeaderProps,
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
  Link,
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
  Select,
  SelectItem,
  SelectItemNext,
  SelectNext,
  Stack,
  StepItem,
  SummaryList,
  SummaryListAction,
  SummaryListRow,
  SummaryListValue,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabList,
  TabItem,
  TabPanel,
  TextArea,
  toaster,
  ToastProvider,
  ToastVariant,
  StepFillLevel,
  StepStatus,
  SummaryListHeader,
  HeaderLogo,
  HeaderSlotContainer,
  HeaderTitle,
  HeaderSecondaryMenu,
  HeaderMenuItemLink,
  HeaderPrimaryMenu,
  HeaderMenuItemSeparator,
  HeaderMenuItemButton,
} from '@ogcio/design-system-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const HeaderComposable = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Header variant="default" aria-label="Site header" id="GovieHeader">
        <HeaderLogo>
          <HeaderLogo>
            <Image
              src="https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov.ie/harp-gold-text-white.svg"
              alt="govie logo"
              decoding="async"
              loading="eager"
              fetchPriority="high"
              width={136}
              height={48}
            />
            <span className="gi-sr-only">Gov.ie logo</span>
          </HeaderLogo>
        </HeaderLogo>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderSecondaryMenu>
          <HeaderMenuItemLink href="#" aria-label="Switch to English">
            English
          </HeaderMenuItemLink>
          <HeaderMenuItemLink href="#" aria-label="Switch to Gaeilge">
            Gaeilge
          </HeaderMenuItemLink>
        </HeaderSecondaryMenu>
        <HeaderPrimaryMenu>
          <HeaderMenuItemLink href="#" showItemMode="desktop-only">
            Departments
          </HeaderMenuItemLink>
          <HeaderMenuItemLink href="#" showItemMode="desktop-only">
            Services
          </HeaderMenuItemLink>
          <HeaderMenuItemSeparator />
          <HeaderMenuItemLink href="/" showItemMode="desktop-only">
            Home
          </HeaderMenuItemLink>
          <HeaderMenuItemButton
            showItemMode="desktop-only"
            icon={searchOpen ? 'close' : 'search'}
            aria-label="Toggle site search"
            aria-expanded={searchOpen}
            aria-controls="HeaderSearchDropdown"
            onClick={() => setSearchOpen((v) => !v)}
          >
            Search
          </HeaderMenuItemButton>
        </HeaderPrimaryMenu>
      </Header>
      {searchOpen ? (
        <HeaderSlotContainer
          id="HeaderSearchDropdown"
          variant="default"
          role="region"
          aria-label="Site search"
          aria-live="polite"
          className="gi-mt-0"
        >
          <HeaderSearch />
        </HeaderSlotContainer>
      ) : null}
    </>
  );
};

// StepStates for ProgressStepper
const stepStates = [
  { status: StepStatus.Active, fill: StepFillLevel.Full },
  { status: StepStatus.Active, fill: StepFillLevel.Empty },
  { status: StepStatus.Active, fill: StepFillLevel.Half },
  { status: StepStatus.Disabled, fill: StepFillLevel.Full },
  { status: StepStatus.Disabled, fill: StepFillLevel.Full },
  { status: StepStatus.Active, fill: StepFillLevel.Empty },
  { status: StepStatus.Active, fill: StepFillLevel.Empty },
  { status: StepStatus.Completed, fill: StepFillLevel.Empty },
];

// Toast Handler
const handleCreateToast = (
  title: string,
  variant: ToastVariant,
  slotAction?: any,
) =>
  toaster.create({
    title,
    variant,
    description: 'This is a toast notification.',
    position: {
      x: 'right',
      y: 'bottom',
    },
    duration: 3000,
    dismissible: true,
    slotAction,
  });

// Form Components
const BasicFormExample = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h4" className="mb-4">
          With React Hook Form (Register Method)
        </Heading>
        <div className="space-y-4">
          <TextArea
            {...register('description')}
            maxChars={200}
            clearButtonEnabled
          />
          <InputText
            {...register('inputtext')}
            className="w-full"
            inputActionButton={{
              icon: 'info',
              onClick: () => alert('Action button clicked'),
            }}
            type="text"
            placeholder="Placeholder"
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Container>
  );
};

const ComprehensiveFormExample = () => {
  const methods = useForm({
    defaultValues: {
      myText: '',
      inputText: '',
      textArea: '',
      selectOption: '',
      legacySelect: 'select-option',
      password: '',
      radioGroup: '',
      buttonGroup: '',
      checkboxGroup: [],
      autocomplete: '',
    },
  });

  const { handleSubmit, control, reset } = methods;

  const onSubmit = (data: any) => {
    console.log('Form submitted successfully');
    console.log('Form Data:', data);
  };

  const handleClear = () => {
    reset();
    console.log('Form cleared');
  };

  const selectOptions: string[] = [
    'Topic 1',
    'Topic 2',
    'Topic 3',
    'Topic 4',
    'Topic 5',
  ];

  const autocompleteOptions = [
    { value: 'frontend_dev', label: 'Frontend Dev.' },
    { value: 'backend_dev', label: 'Backend Dev.' },
    { value: 'fullstack_dev', label: 'Full Stack Dev.' },
    { value: 'devops_engineer', label: 'DevOps Engineer' },
    { value: 'qa_engineer', label: 'QA Engineer' },
    { value: 'ui_ux_designer', label: 'UI/UX Designer' },
    { value: 'product_manager', label: 'Product Manager' },
    { value: 'data_scientist', label: 'Data Scientist' },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
          <Heading as="h4" className="mb-2">
            With React Hook Form (Controller Method)
          </Heading>
          <Heading as="h6" className="font-normal text-gray-600 mb-6">
            Please fill in the fields
          </Heading>

          <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
            <FormField label={{ text: 'Input Text' }} className="w-full">
              <Controller
                control={control}
                name="inputText"
                render={({ field }) => (
                  <InputText {...field} className="w-full" />
                )}
              />
            </FormField>

            <FormField label={{ text: 'Text Area' }} className="w-full">
              <Controller
                control={control}
                name="textArea"
                render={({ field }) => (
                  <TextArea
                    {...field}
                    cols={100}
                    rows={4}
                    className="w-full"
                    maxChars={100}
                    clearButtonEnabled
                  />
                )}
              />
            </FormField>

            <FormField label={{ text: 'Select (New)' }} className="w-full">
              <Controller
                control={control}
                name="selectOption"
                render={({ field }) => (
                  <SelectNext
                    {...field}
                    enableSearch
                    className="w-full"
                    onChange={(value: any) => field.onChange(value)}
                  >
                    <SelectItemNext value="">Please select</SelectItemNext>
                    {selectOptions.map((opt) => (
                      <SelectItemNext key={opt} value={opt}>
                        {opt}
                      </SelectItemNext>
                    ))}
                  </SelectNext>
                )}
              />
            </FormField>

            <FormField label={{ text: 'Select (Legacy)' }} className="w-full">
              <Controller
                control={control}
                name="legacySelect"
                render={({ field }) => (
                  <Select {...field} aria-label="Select">
                    <SelectItem value="select-option" hidden>
                      Select Option
                    </SelectItem>
                    <SelectItem value="value-1">Option 1</SelectItem>
                    <SelectItem value="value-2">Option 2</SelectItem>
                    <SelectItem value="value-3">Option 3</SelectItem>
                  </Select>
                )}
              />
            </FormField>

            <FormField label={{ text: 'Radio Group' }} className="w-full">
              <Controller
                name="radioGroup"
                control={control}
                render={({ field }) => (
                  <InputRadioGroup
                    groupId="my-radio-group"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputRadio value="option1" label="Option 1" />
                    <InputRadio value="option2" label="Option 2" />
                    <InputRadio value="option3" label="Option 3" />
                  </InputRadioGroup>
                )}
              />
            </FormField>

            <FormField label={{ text: 'Button Group' }} className="w-full">
              <FormFieldLabel>Are you currently a customer?</FormFieldLabel>
              <Controller
                name="buttonGroup"
                control={control}
                render={({ field }) => (
                  <ButtonGroup
                    value={field.value}
                    name="customer-status"
                    size="medium"
                    onChange={field.onChange}
                  >
                    <ButtonGroupItem value="yes">Yes</ButtonGroupItem>
                    <ButtonGroupItem value="no">No</ButtonGroupItem>
                  </ButtonGroup>
                )}
              />
            </FormField>

            <FormField>
              <FormFieldLabel>Organisation</FormFieldLabel>
              <Controller
                name="checkboxGroup"
                control={control}
                render={({ field }) => (
                  <InputCheckboxGroup
                    groupId="UniqueID"
                    values={field.value}
                    onChange={field.onChange}
                  >
                    <InputCheckbox
                      id="UniqueID-check1"
                      label="Employment Tribunal"
                      value="employment-tribunal"
                    />
                    <InputCheckbox
                      id="UniqueID-check2"
                      label="Ministry of Defence"
                      value="ministry-of-defence"
                    />
                    <InputCheckbox
                      id="UniqueID-check3"
                      label="Department for Transport"
                      value="department-for-transport"
                    />
                    <InputCheckbox
                      disabled
                      id="UniqueID-check4"
                      label="Others"
                      value="others"
                    />
                  </InputCheckboxGroup>
                )}
              />
            </FormField>

            <FormField label={{ text: 'Password' }} className="w-full">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <InputPassword {...field} placeholder="Placeholder" />
                )}
              />
            </FormField>

            <FormField className="w-56">
              <FormFieldLabel>Autocomplete</FormFieldLabel>
              <Controller
                control={control}
                name="autocomplete"
                render={({ field }) => (
                  <Autocomplete {...field}>
                    {autocompleteOptions.map(({ value, label }) => (
                      <AutocompleteItem value={value} key={`${label}-${value}`}>
                        {label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                )}
              />
            </FormField>

            <div className="flex gap-2 pt-4">
              <Button type="submit" variant="primary">
                Submit
              </Button>
              <Button type="button" variant="secondary" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
        </Container>
      </form>
    </FormProvider>
  );
};

const ValidationFormExample = () => {
  const customerTypes: string[] = [
    'Customer type 1',
    'Customer type 2',
    'Customer type 3',
  ];
  const categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  const relatedTopics: string[] = [
    'Related topic 1',
    'Related topic 2',
    'Related topic 3',
  ];

  const schema = z.object({
    customerType: z.string().nonempty('Customer type is required'),
    category: z.string().nonempty('Category is required'),
    relatedTopic: z.string().nonempty('Related topic'),
  });

  const defaultValues = {
    customerType: '',
    category: '',
    relatedTopic: '',
  };

  const [formData, setFormData] = useState('');

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data: any) => {
    setFormData(JSON.stringify(data));
  };

  return (
    <Container className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h4" className="mb-4">
            With Select Next and Validation Using React Hook Form
          </Heading>

          <div className="space-y-4">
            <FormField>
              <FormFieldLabel htmlFor="customerType">
                Customer Type
              </FormFieldLabel>
              {errors.customerType?.message && (
                <FormFieldError>{errors.customerType.message}</FormFieldError>
              )}
              <Controller
                control={control}
                name="customerType"
                render={({ field }) => (
                  <SelectNext
                    id="customerType"
                    name={field.name}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref as any}
                  >
                    <SelectItemNext value="">
                      Select a customer type
                    </SelectItemNext>
                    {customerTypes.map((option) => (
                      <SelectItemNext key={option} value={option}>
                        {option}
                      </SelectItemNext>
                    ))}
                  </SelectNext>
                )}
              />
            </FormField>

            <FormField>
              <FormFieldLabel htmlFor="category">Category</FormFieldLabel>
              {errors.category?.message && (
                <FormFieldError>{errors.category.message}</FormFieldError>
              )}
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <SelectNext
                    id="category"
                    name={field.name}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref as any}
                  >
                    <SelectItemNext value="">Select a category</SelectItemNext>
                    {categories.map((option) => (
                      <SelectItemNext key={option} value={option}>
                        {option}
                      </SelectItemNext>
                    ))}
                  </SelectNext>
                )}
              />
            </FormField>

            <FormField>
              <FormFieldLabel htmlFor="relatedTopic">
                Related topic
              </FormFieldLabel>
              {errors.relatedTopic?.message && (
                <FormFieldError>{errors.relatedTopic.message}</FormFieldError>
              )}
              <Controller
                control={control}
                name="relatedTopic"
                render={({ field }) => (
                  <SelectNext
                    enableSearch={true}
                    id="relatedTopic"
                    name={field.name}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref as any}
                  >
                    <SelectItemNext value="">
                      Select a related topic
                    </SelectItemNext>
                    {relatedTopics.map((option) => (
                      <SelectItemNext key={option} value={option}>
                        {option}
                      </SelectItemNext>
                    ))}
                  </SelectNext>
                )}
              />
            </FormField>

            <div className="flex gap-2 pt-4">
              <Button type="submit">Submit</Button>
              <Button type="button" onClick={() => reset(defaultValues)}>
                Reset
              </Button>
            </div>

            {formData && (
              <div className="mt-4 p-2 bg-gray-50 rounded">
                <strong>Form data:</strong>
                <pre className="mt-1 text-sm">{formData}</pre>
              </div>
            )}
          </div>
        </Form>
      </FormProvider>
    </Container>
  );
};

// Main Component
export default function Home() {
  return (
    <>
      <HeaderComposable />
      <CookieBanner {...CookieBannerProps} />

      <Container className="py-8">
        <Heading as="h1" className="mb-8">
          Design System Showcase
        </Heading>

        <Tabs ariaLabelledBy="next-tabs-example" id="tab-example" size="md">
          <TabList>
            <TabItem value="forms">Forms</TabItem>
            <TabItem value="inputs">Inputs</TabItem>
            <TabItem value="navigation">Navigation</TabItem>
            <TabItem value="layout">Layout</TabItem>
            <TabItem value="feedback">Feedback</TabItem>
            <TabItem value="data">Data Display</TabItem>
          </TabList>

          {/* Forms Tab */}
          <TabPanel value="forms">
            <div className="space-y-8">
              <Container className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
                <Heading as="h4" className="mb-4">
                  Standalone Form Elements
                </Heading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-2">Radio Group</h5>
                    <FormField>
                      <FormFieldLabel>Where do you live?</FormFieldLabel>
                      <FormFieldHint>Select your city</FormFieldHint>
                      <InputRadioGroup groupId="city">
                        <InputRadio value="dublin" label="Dublin" />
                        <InputRadio value="cork" label="Cork" />
                        <InputRadio value="galway" label="Galway" />
                      </InputRadioGroup>
                    </FormField>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Checkbox Group</h5>
                    <InputCheckboxGroup groupId="nationality">
                      <InputCheckbox value="irish" label="Irish" />
                      <InputCheckbox value="british" label="British" />
                      <InputCheckbox
                        value="citizen-of-another-country"
                        label="Citizen of another country"
                      />
                    </InputCheckboxGroup>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Combobox</h5>
                    <Form>
                      <Combobox>
                        <DropdownItem
                          options={ComboBoxProps.organisationOptions}
                        >
                          Organisations
                        </DropdownItem>
                        <DropdownItem options={ComboBoxProps.categoryOptions}>
                          Category
                        </DropdownItem>
                        <DropdownItem options={ComboBoxProps.topicOptions}>
                          Topic
                        </DropdownItem>
                      </Combobox>
                    </Form>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Text Area</h5>
                    <FormField>
                      <FormFieldLabel htmlFor="textarea-standalone">
                        Comments
                      </FormFieldLabel>
                      <FormFieldHint>This is a helpful hint.</FormFieldHint>
                      <TextArea id="textarea-standalone" maxChars={50} />
                    </FormField>
                  </div>
                </div>
              </Container>

              <BasicFormExample />
              <ComprehensiveFormExample />
              <ValidationFormExample />
            </div>
          </TabPanel>

          {/* Inputs Tab */}
          <TabPanel value="inputs">
            <div className="space-y-6">
              <Container className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
                <Heading as="h4" className="mb-4">
                  Input Components
                </Heading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-2">
                      Text Input with Clear Button
                    </h5>
                    <InputText
                      clearButtonEnabled
                      placeholder="Type something..."
                    />
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Password Input</h5>
                    <InputPassword placeholder="Enter password" />
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Autocomplete</h5>
                    <Autocomplete>
                      <AutocompleteItem value="option1">
                        Option 1
                      </AutocompleteItem>
                      <AutocompleteItem value="option2">
                        Option 2
                      </AutocompleteItem>
                      <AutocompleteItem value="option3">
                        Option 3
                      </AutocompleteItem>
                    </Autocomplete>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Select (New)</h5>
                    <SelectNext>
                      <SelectItemNext value="">Choose an option</SelectItemNext>
                      <SelectItemNext value="option1">Option 1</SelectItemNext>
                      <SelectItemNext value="option2">Option 2</SelectItemNext>
                      <SelectItemNext value="option3">Option 3</SelectItemNext>
                    </SelectNext>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Single Checkbox</h5>
                    <InputCheckbox
                      id="single-checkbox"
                      value="agree"
                      label="I agree to the terms"
                    />
                  </div>
                </div>
              </Container>
            </div>
          </TabPanel>

          {/* Navigation Tab */}
          <TabPanel value="navigation">
            <div className="space-y-6">
              <Container className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
                <Heading as="h4" className="mb-4">
                  Navigation Components
                </Heading>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold mb-2">Breadcrumbs</h5>
                    <Breadcrumbs>
                      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                      <BreadcrumbEllipsis />
                      <BreadcrumbLink href="/documentation">
                        Documentation
                      </BreadcrumbLink>
                      <BreadcrumbCurrentLink href="/travel">
                        Travel
                      </BreadcrumbCurrentLink>
                    </Breadcrumbs>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">
                      Breadcrumbs with Next.js Links
                    </h5>
                    <Breadcrumbs>
                      <BreadcrumbLink asChild>
                        <NextLink href="/home">Home</NextLink>
                      </BreadcrumbLink>
                      <BreadcrumbEllipsis />
                      <BreadcrumbLink asChild>
                        <NextLink href="/documentation">Documentation</NextLink>
                      </BreadcrumbLink>
                      <BreadcrumbCurrentLink href="/travel">
                        Travel
                      </BreadcrumbCurrentLink>
                    </Breadcrumbs>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Links</h5>
                    <div className="space-x-4">
                      <Link href="https://www.google.com" external={true}>
                        External Link
                      </Link>
                      <Link href="#" noUnderline={true}>
                        Link without underline
                      </Link>
                      <Link href="#" noVisited={true}>
                        Link without visited state
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Pagination</h5>
                    <Pagination
                      currentPage={5}
                      onPageChange={() => {}}
                      totalPages={10}
                    />
                  </div>
                </div>
              </Container>
            </div>
          </TabPanel>

          {/* Layout Tab */}
          <TabPanel value="layout">
            <div className="space-y-6">
              <Container className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
                <Heading as="h4" className="mb-4">
                  Layout Components
                </Heading>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold mb-2">Cards</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card
                        action={{
                          children: 'Button',
                          type: 'button',
                          variant: 'secondary',
                        }}
                        content="Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin."
                        href="#"
                        inset="none"
                        media={{
                          config: {
                            alt: 'Card Title',
                            aspectRatio: '4 / 3',
                            src: 'https://placeholderjs.com/400x300',
                          },
                          type: 'image',
                        }}
                        subTitle="Subheading"
                        tag={{
                          text: 'New',
                          type: 'info',
                        }}
                        title="Horizontal Card"
                        type="horizontal"
                      />

                      <Card
                        action={{
                          children: 'Learn More',
                          href: '#',
                          size: 'md',
                          type: 'link',
                        }}
                        content="Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin."
                        title="Vertical Card"
                        type="vertical"
                        titleAsChild
                      >
                        <NextLink href="#">Next.js Link Title</NextLink>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Stack Layout</h5>
                    <div className="h-[200px] bg-gray-50 overflow-auto p-2">
                      <Stack
                        direction={{ sm: 'column', base: 'row' }}
                        itemsAlignment="start"
                        itemsDistribution="start"
                        gap={5}
                        hasDivider
                      >
                        <div className="bg-gray-300 p-2 h-[50px] w-[100px] flex items-center justify-center">
                          Item 1
                        </div>
                        <div className="bg-gray-300 p-2 h-[50px] w-[100px] flex items-center justify-center">
                          Item 2
                        </div>
                        <div className="bg-gray-300 p-2 h-[50px] w-[100px] flex items-center justify-center">
                          Item 3
                        </div>
                      </Stack>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Lists</h5>
                    <List
                      items={['Item 1', 'Item 2', 'Item 3']}
                      type="bullet"
                    />
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Typography</h5>
                    <div className="space-y-2">
                      <Heading as="h2">Heading H2</Heading>
                      <Heading as="h3">Heading H3</Heading>
                      <Heading as="h4">Heading H4</Heading>
                      <Paragraph>
                        This is a regular paragraph with some sample text to
                        demonstrate typography styles.
                      </Paragraph>
                      <Paragraph as="span">This is a span paragraph</Paragraph>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </TabPanel>

          {/* Feedback Tab */}
          <TabPanel value="feedback">
            <div className="space-y-6">
              <Container className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
                <Heading as="h4" className="mb-4">
                  Feedback Components
                </Heading>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold mb-2">Alerts</h5>
                    <Alert title="Info Alert" dismissible>
                      <Paragraph>
                        This is an informational alert message.
                      </Paragraph>
                    </Alert>
                    <br />

                    <Alert title="Info Alert" showIcon={false}>
                      <Paragraph>
                        This is an alert message without icon.
                      </Paragraph>
                    </Alert>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Toast Notifications</h5>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => handleCreateToast('Success', 'success')}
                      >
                        Success Toast
                      </Button>
                      <Button
                        onClick={() => handleCreateToast('Error', 'danger')}
                      >
                        Error Toast
                      </Button>
                      <Button onClick={() => handleCreateToast('Info', 'info')}>
                        Info Toast
                      </Button>
                      <Button
                        onClick={() => handleCreateToast('Warning', 'warning')}
                      >
                        Warning Toast
                      </Button>
                      <Button
                        onClick={() =>
                          handleCreateToast(
                            'Success',
                            'success',
                            <NextLink href="#">Custom Action</NextLink>,
                          )
                        }
                      >
                        Toast with Action
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Progress Indicators</h5>
                    <div className="space-y-4">
                      <div>
                        <h6 className="text-sm font-medium mb-2">
                          Progress Bar
                        </h6>
                        <ProgressBar value={50} label="Loading..." />
                      </div>

                      <div>
                        <h6 className="text-sm font-medium mb-2">
                          Progress Stepper (Horizontal)
                        </h6>
                        <ProgressStepper>
                          <StepItem label="Step 1">Step 1 Content</StepItem>
                          <StepItem label="Step 2">Step 2 Content</StepItem>
                          <StepItem label="Step 3">Step 3 Content</StepItem>
                          <StepItem label="Step 4">Step 4 Content</StepItem>
                        </ProgressStepper>
                      </div>

                      <div>
                        <h6 className="text-sm font-medium mb-2">
                          Progress Stepper (Numbers)
                        </h6>
                        <ProgressStepper
                          indicator="number"
                          currentStepIndex={2}
                        >
                          <StepItem label="Step 1" />
                          <StepItem label="Step 2" />
                          <StepItem label="Step 3" />
                          <StepItem label="Step 4" />
                        </ProgressStepper>
                      </div>

                      <div>
                        <h6 className="text-sm font-medium mb-2">
                          Progress Stepper (Vertical)
                        </h6>
                        <ProgressStepper
                          indicator="number"
                          orientation="vertical"
                          currentStepIndex={1}
                        >
                          <StepItem label="Complete your application" />
                          <StepItem label="Review your information" />
                          <StepItem label="Submit for approval" />
                          <StepItem label="Await confirmation" />
                        </ProgressStepper>
                      </div>

                      <div>
                        <h6 className="text-sm font-medium mb-2">
                          Progress Stepper With `stepStates`
                        </h6>

                        <ProgressStepper
                          stepStates={stepStates}
                          orientation="vertical"
                          data-testid="progress-stepper-states"
                        >
                          <StepItem
                            key="with-step-states-step-1"
                            label="Step 1"
                          />
                          <StepItem
                            key="with-step-states-step-2"
                            label="Step 2"
                          />
                          <StepItem
                            key="with-step-states-step-3"
                            label="Step 3"
                          />
                          <StepItem
                            key="with-step-states-step-4"
                            label="Step 4"
                          />
                          <StepItem
                            key="with-step-states-step-5"
                            label="Step 5"
                          />
                          <StepItem
                            key="with-step-states-step-6"
                            label="Step 6"
                          />
                          <StepItem
                            key="with-step-states-step-7"
                            label="Step 7"
                          />
                          <StepItem
                            key="with-step-states-step-8"
                            label="Step 8"
                          />
                        </ProgressStepper>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Phase Banner </h5>
                    <PhaseBanner level="Alpha">
                      This is a pre-release version
                    </PhaseBanner>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Modals and Drawers</h5>
                    <div className="flex gap-4">
                      <Modal
                        triggerButton={<Button>Open Modal</Button>}
                        aria-describedby="Modal example"
                      >
                        <ModalTitle>Modal Title</ModalTitle>
                        <ModalBody>
                          <Paragraph>
                            This is the modal content. It can contain any
                            components and information.
                          </Paragraph>
                        </ModalBody>
                        <ModalFooter>
                          <Button variant="secondary">Cancel</Button>
                          <Button variant="primary">Confirm</Button>
                        </ModalFooter>
                      </Modal>

                      <Drawer triggerButton={<Button>Open Drawer</Button>}>
                        <DrawerBody>
                          <Paragraph>
                            This is the drawer content. Drawers slide in from
                            the side and are great for forms or additional
                            information.
                          </Paragraph>
                        </DrawerBody>
                        <DrawerFooter>
                          <div className="flex gap-6 justify-end">
                            <Button variant="secondary" appearance="dark">
                              Cancel
                            </Button>
                            <Button>Save</Button>
                          </div>
                        </DrawerFooter>
                      </Drawer>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </TabPanel>

          {/* Data Display Tab */}
          <TabPanel value="data">
            <div className="space-y-6">
              <Container className="p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
                <Heading as="h4" className="mb-4">
                  Data Display Components
                </Heading>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold mb-2">Table</h5>
                    <div className="w-full overflow-x-auto">
                      <Table className="min-w-full table-auto">
                        <TableHead>
                          <TableRow>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Role</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Actions</TableHeader>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableData>1</TableData>
                            <TableData>Alice Johnson</TableData>
                            <TableData>alice@example.com</TableData>
                            <TableData>Admin</TableData>
                            <TableData>
                              <Chip
                                label="Active"
                                onClose={() => console.log('Chip closed')}
                              />
                            </TableData>
                            <TableData>
                              <div className="flex gap-2">
                                <Button size="small" variant="secondary">
                                  Edit
                                </Button>
                                <Button size="small" variant="secondary">
                                  Delete
                                </Button>
                              </div>
                            </TableData>
                          </TableRow>
                          <TableRow>
                            <TableData>2</TableData>
                            <TableData>Bob Smith</TableData>
                            <TableData>bob@example.com</TableData>
                            <TableData>User</TableData>
                            <TableData>
                              <Chip
                                label="Inactive"
                                onClose={() => console.log('Chip closed')}
                              />
                            </TableData>
                            <TableData>
                              <div className="flex gap-2">
                                <Button size="small" variant="secondary">
                                  Edit
                                </Button>
                                <Button size="small" variant="secondary">
                                  Delete
                                </Button>
                              </div>
                            </TableData>
                          </TableRow>
                          <TableRow>
                            <TableData>3</TableData>
                            <TableData>Carol Davis</TableData>
                            <TableData>carol@example.com</TableData>
                            <TableData>Manager</TableData>
                            <TableData>
                              <Chip
                                label="Active"
                                onClose={() => console.log('Chip closed')}
                              />
                            </TableData>
                            <TableData>
                              <div className="flex gap-2">
                                <Button size="small" variant="secondary">
                                  Edit
                                </Button>
                                <Button size="small" variant="secondary">
                                  Delete
                                </Button>
                              </div>
                            </TableData>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Summary List</h5>
                    <SummaryList withBorder>
                      <SummaryListHeader label="Summary card heading">
                        <SummaryListAction href="/action">
                          Action 1
                        </SummaryListAction>
                      </SummaryListHeader>
                      <SummaryListRow label="Name" withBorder>
                        <SummaryListValue>John Smith</SummaryListValue>
                        <SummaryListAction href="/change-name">
                          Change name
                        </SummaryListAction>
                      </SummaryListRow>
                      <SummaryListRow label="Date of Birth" withBorder>
                        <SummaryListValue>8 November 1982</SummaryListValue>
                        <SummaryListAction href="/change-dob">
                          Change date of birth
                        </SummaryListAction>
                      </SummaryListRow>
                      <SummaryListRow label="Address" withBorder>
                        <SummaryListValue>
                          72 Guild Street
                          <br />
                          London
                          <br />
                          SE23 6FH
                        </SummaryListValue>
                        <SummaryListAction asChild>
                          <NextLink href="/change-address">
                            Change address
                          </NextLink>
                        </SummaryListAction>
                      </SummaryListRow>
                      <SummaryListRow label="Contact Number" withBorder>
                        <SummaryListValue>07700 900457</SummaryListValue>
                        <SummaryListAction href="/change-phone">
                          Change phone
                        </SummaryListAction>
                      </SummaryListRow>
                    </SummaryList>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Chips and Tags</h5>
                    <div className="flex flex-wrap gap-2">
                      <Chip
                        label="Default Chip"
                        onClose={() => console.log('Chip closed')}
                      />
                      <Chip
                        label="Closable Chip"
                        onClose={() => console.log('Chip closed')}
                      />
                      <Chip
                        label="Another Tag"
                        onClose={() => console.log('Chip closed')}
                      />
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">
                      Details (Collapsible)
                    </h5>
                    <Details label="Help with Nationality">
                      We need to know your nationality so we can work out which
                      elections you&apos;re entitled to vote in. If you cannot
                      provide your nationality, you&apos;ll have to send copies
                      of identity documents through the post.
                    </Details>
                  </div>
                </div>
              </Container>
            </div>
          </TabPanel>
        </Tabs>

        {/* Additional UI Elements */}
        <Container className="mt-8 p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
          <Heading as="h4" className="mb-4">
            Buttons and Icons
          </Heading>

          <div className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">Button Variants</h5>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Button Sizes</h5>
              <div className="flex items-center gap-2">
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Icons and Icon Buttons</h5>
              <div className="flex items-center gap-4">
                <Icon icon="thumb_up" />
                <Icon icon="home" />
                <Icon icon="search" />
                <IconButton
                  icon={{
                    icon: 'send',
                    ariaLabel: 'Send',
                  }}
                />
                <IconButton
                  icon={{
                    icon: 'delete',
                    ariaLabel: 'Delete',
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
        <Container className="mt-8 p-4 border border-gray-200 bg-white rounded-lg shadow-sm">
          <Heading as="h3" className="mb-8">
            The following components are auto-generated by Stencil.
          </Heading>
          Paragraph:
          <GovieParagraph>Here is a paragraph</GovieParagraph>
          Button:
          <GovieButton>Button</GovieButton>
          <GovieButton variant="flat">Button</GovieButton>
          <GovieButton variant="secondary">Button</GovieButton>
        </Container>
      </Container>

      <Footer />
      <ToastProvider />
    </>
  );
}
