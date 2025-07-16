"use client";
import NextLink from "next/link";
import { ComboBoxProps, CookieBannerProps } from "@/props";
import { useForm, Controller, FormProvider } from "react-hook-form";
import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  Breadcrumbs,
  Button,
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
  SelectItemNext,
  SelectNext,
  Stack,
  StepItem,
  SummaryList,
  SummaryListAction,
  SummaryListRow,
  SummaryListValue,
  TextArea,
  toaster,
  ToastProvider,
  ToastVariant,
} from "@ogcio/design-system-react";

const headerProps: HeaderProps = {
  items: [
    {
      label: "Departments",
      itemType: "link",
      href: "#",
      showItemMode: "desktop-only",
    },
    {
      label: "Services",
      itemType: "link",
      href: "#",
      showItemMode: "desktop-only",
    },
    {
      itemType: "divider",
      showItemMode: "desktop-only",
    },
    {
      label: "Home",
      icon: "home",
      itemType: "link",
      href: "/item1",
      showItemMode: "desktop-only",
    },
    {
      label: "Search",
      icon: "search",
      itemType: "slot",
      component: <HeaderSearch />,
      slotAppearance: "dropdown",
      showItemMode: "desktop-only",
    },
  ],
  secondaryLinks: [
    {
      href: "#",
      label: "English",
    },
    {
      href: "#",
      label: "Gaeilge",
    },
  ],
};

function MyForm() {
  const methods = useForm({
    defaultValues: {
      myText: "",
      inputText: "",
      textArea: "",
      selectOption: "",
    },
  });

  const { handleSubmit, control, reset } = methods;

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const handleClear = () => {
    reset();
  };

  const selectOptions: string[] = [
    "Topic 1",
    "Topic 2",
    "Topic 3",
    "Topic 4",
    "Topic 5",
    "Topic 6",
    "Topic 7",
    "Topic 8",
    "Topic 9",
    "Topic 10",
    "Topic 11",
    "Topic 12",
    "Topic 13",
    "Topic 14",
    "Topic 15",
    "Topic 16",
    "Topic 17",
    "Topic 18",
    "Topic 19",
    "Topic 20",
    "Topic 21",
    "Topic 22",
    "Topic 23",
    "Topic 24",
    "Topic 25",
    "Topic 26",
    "Topic 27",
    "Topic 28",
    "Topic 29",
    "Topic 30",
    "Topic 31",
    "Topic 32",
    "Topic 33",
    "Topic 34",
    "Topic 35",
    "Topic 36",
    "Topic 37",
    "Topic 38",
    "Topic 39",
    "Topic 40",
    "Topic 41",
    "Topic 42",
    "Topic 43",
    "Topic 44",
    "Topic 45",
    "Topic 46",
    "Topic 47",
    "Topic 48",
    "Topic 49",
    "Topic 50",
    "Topic 51",
    "Topic 52",
    "Topic 53",
    "Topic 54",
    "Topic 55",
    "Topic 56",
    "Topic 57",
    "Topic 58",
    "Topic 59",
    "Topic 60",
    "Topic 61",
    "Topic 62",
    "Topic 63",
    "Topic 64",
    "Topic 65",
    "Topic 66",
    "Topic 67",
    "Topic 68",
    "Topic 69",
    "Topic 70",
    "Topic 71",
    "Topic 72",
    "Topic 73",
    "Topic 74",
    "Topic 75",
    "Topic 76",
    "Topic 77",
    "Topic 78",
    "Topic 79",
    "Topic 80",
    "Topic 81",
    "Topic 82",
    "Topic 83",
    "Topic 84",
    "Topic 85",
    "Topic 86",
    "Topic 87",
    "Topic 88",
    "Topic 89",
    "Topic 90",
    "Topic 91",
    "Topic 92",
    "Topic 93",
    "Topic 94",
    "Topic 95",
    "Topic 96",
    "Topic 97",
    "Topic 98",
    "Topic 99",
    "Topic 100",
    "Topic 101",
    "Topic 102",
    "Topic 103",
    "Topic 104",
    "Topic 105",
    "Topic 106",
    "Topic 107",
    "Topic 108",
    "Topic 109",
    "Topic 110",
    "Topic 111",
    "Topic 112",
    "Topic 113",
    "Topic 114",
    "Topic 115",
    "Topic 116",
    "Topic 117",
    "Topic 118",
    "Topic 119",
    "Topic 120",
    "Topic 121",
    "Topic 122",
    "Topic 123",
    "Topic 124",
    "Topic 125",
    "Topic 126",
    "Topic 127",
    "Topic 128",
    "Topic 129",
    "Topic 130",
    "Topic 131",
    "Topic 132",
    "Topic 133",
    "Topic 134",
    "Topic 135",
    "Topic 136",
    "Topic 137",
    "Topic 138",
    "Topic 139",
    "Topic 140",
    "Topic 141",
    "Topic 142",
    "Topic 143",
    "Topic 144",
    "Topic 145",
    "Topic 146",
    "Topic 147",
    "Topic 148",
    "Topic 149",
    "Topic 150",
    "Topic 151",
    "Topic 152",
    "Topic 153",
    "Topic 154",
    "Topic 155",
    "Topic 156",
    "Topic 157",
    "Topic 158",
    "Topic 159",
    "Topic 160",
    "Topic 161",
    "Topic 162",
    "Topic 163",
    "Topic 164",
    "Topic 165",
    "Topic 166",
    "Topic 167",
    "Topic 168",
    "Topic 169",
    "Topic 170",
    "Topic 171",
    "Topic 172",
    "Topic 173",
    "Topic 174",
    "Topic 175",
    "Topic 176",
    "Topic 177",
    "Topic 178",
    "Topic 179",
    "Topic 180",
    "Topic 181",
    "Topic 182",
    "Topic 183",
    "Topic 184",
    "Topic 185",
    "Topic 186",
    "Topic 187",
    "Topic 188",
    "Topic 189",
    "Topic 190",
    "Topic 191",
    "Topic 192",
    "Topic 193",
    "Topic 194",
    "Topic 195",
    "Topic 196",
    "Topic 197",
    "Topic 198",
    "Topic 199",
    "Topic 200",
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container
          className="
            p-0
            w-full
            border
            border-[--gieds-color-gray-200]
            bg-white
            rounded-lg
            shadow-lg
          "
          id="card-container"
        >
          <Container className="px-4 pt-4 pb-0 md:px-8 md:pt-8 md:pb-6">
            <Container className="p-0 pb-2">
              <Heading as="h3" id="heading">
                My Form
              </Heading>
            </Container>

            <Container className="p-0 pb-8">
              <Heading
                as="h5"
                className="font-normal text-[--gieds-color-gray-600]"
                id="subheading"
              >
                Please fill in the fields
              </Heading>
            </Container>

            <Container className="flex flex-col items-center p-0 gap-4 w-full lg:w-[480px] mx-auto">
              <FormField
                className="
                  w-full
                  font-[family-name:var(--gieds-font-family-primary)]
                "
                label={{ text: "Input Text" }}
              >
                <Controller
                  control={control}
                  name="inputText"
                  render={({ field }) => (
                    <InputText
                      {...field}
                      data-testid="input-text-id"
                      id="input-text-id"
                      className="w-full"
                    />
                  )}
                />
              </FormField>
              <FormField
                className="
                  w-full
                  font-[family-name:var(--gieds-font-family-primary)]
                "
                label={{ text: "Text Area" }}
              >
                <Controller
                  control={control}
                  name="textArea"
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      cols={100}
                      rows={4}
                      id="textarea-id-0"
                      data-testid="textarea-id-0"
                      className="w-full"
                      maxChars={100}
                    />
                  )}
                />
              </FormField>
              <FormField
                className="
                  w-full
                  font-[family-name:var(--gieds-font-family-primary)]
                "
                label={{ text: "Select an Option" }}
              >
                <Controller
                  control={control}
                  name="selectOption"
                  render={({ field }) => (
                    <SelectNext
                      {...field}
                      enableSearch
                      id="select-option-id"
                      data-testid="select-option-id"
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
              <Container className="flex gap-2">
                <Button
                  type="submit"
                  data-testid="submit-button"
                  variant="primary"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  data-testid="clear-button"
                  variant="secondary"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </Container>
            </Container>
          </Container>
        </Container>
      </form>
    </FormProvider>
  );
}

const handleCreateToast = (
  title: string,
  variant: ToastVariant,
  slotAction?: any
) =>
  toaster.create({
    title,
    variant,
    description: "This is a toast notification.",
    position: {
      x: "right",
      y: "bottom",
    },
    duration: 3000,
    dismissible: true,
    slotAction,
  });

export default function Home() {
  return (
    <>
      {/* TODO: Investigate the issue regarding the Header component when running the application */}
      <Header
        logo={{ href: "/" }}
        items={headerProps.items}
        addDefaultMobileMenu
        secondaryLinks={headerProps.secondaryLinks}
      />

      <CookieBanner {...CookieBannerProps} />
      <Container>
        <br />
        Input Text With Reset
        <InputText clearButtonEnabled />
        <br />
        Text Input Password
        <InputPassword />
        <br />
        <Autocomplete>
          <AutocompleteItem value="option1">Option 1</AutocompleteItem>
          <AutocompleteItem value="option2">Option 2</AutocompleteItem>
        </Autocomplete>
        <br />
        <SelectNext>
          <SelectItemNext value="Option1">Option 1</SelectItemNext>
          <SelectItemNext value="Option2">Option 2</SelectItemNext>
        </SelectNext>
        <br />
        <Button onClick={() => handleCreateToast("Success", "success")}>
          Trigger Success Toast via callback
        </Button>
        <br />
        <Button onClick={() => handleCreateToast("Error", "danger")}>
          Trigger Danger Toast via callback
        </Button>
        <br />
        <Button onClick={() => handleCreateToast("Info", "info")}>
          Trigger Info Toast via callback
        </Button>
        <br />
        <Button onClick={() => handleCreateToast("Warning", "warning")}>
          Trigger Warning Toast via callback
        </Button>
        <br />
        <Button
          onClick={() =>
            handleCreateToast(
              "Success",
              "success",
              <NextLink href="#">Custom Nextjs Link</NextLink>
            )
          }
        >
          Trigger with Custom Action link
        </Button>
        <br />
        <div className="flex flex-col gap-4 my-4">
          <Breadcrumbs>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            <BreadcrumbEllipsis />
            <BreadcrumbLink href="/documentation">Documentation</BreadcrumbLink>
            <BreadcrumbCurrentLink href="/travel">Travel</BreadcrumbCurrentLink>
          </Breadcrumbs>

          <h2>Breadcrumbs with NextJs Links</h2>
          <Breadcrumbs>
            <BreadcrumbLink asChild>
              <NextLink href="/home">Home</NextLink>
            </BreadcrumbLink>
            <BreadcrumbEllipsis />
            <BreadcrumbLink asChild>
              <NextLink href="/home">Documentation</NextLink>
            </BreadcrumbLink>
            <BreadcrumbCurrentLink href="/travel">Travel</BreadcrumbCurrentLink>
          </Breadcrumbs>

          <h2>Card</h2>
          <Card
            action={{
              children: "Button",
              type: "button",
              variant: "secondary",
            }}
            content="Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin."
            href="#"
            inset="none"
            media={{
              config: {
                alt: "Card Title",
                aspectRatio: "4 / 3",
                src: "https://placeholderjs.com/400x300",
              },
              type: "image",
            }}
            subTitle="Subheading"
            tag={{
              text: "New",
              type: "info",
            }}
            title="Card Title"
            type="horizontal"
          />
          <h2>Card with Nextjs Link</h2>
          <Card
            action={{
              children: "Learn More",
              href: "#",
              size: "md",
              type: "link",
            }}
            content="Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin."
            title="Vertical Card Without Image"
            type="vertical"
            titleAsChild
          >
            <NextLink href="#">NextJs Link</NextLink>
          </Card>
          <Heading>Heading</Heading>
          <PhaseBanner level="alpha">This is a pre-release version</PhaseBanner>
          <Link
            href="https://www.google.com"
            external={true}
            noUnderline={true}
            noVisited={true}
          >
            Link
          </Link>
          <Icon icon="thumb_up" />
          <IconButton
            icon={{
              icon: "send",
              ariaLabel: "Send",
            }}
          />
          <Form>
            <Combobox>
              <DropdownItem options={ComboBoxProps.organisationOptions}>
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
          <h2>Checkboxes Group</h2>
          <InputCheckboxGroup groupId="field-Id">
            <InputCheckbox value="irish" label="Irish" />
            <InputCheckbox value="british" label="British" />
            <InputCheckbox
              value="citizen-of-another-country"
              label="Citizen of another country"
            />
          </InputCheckboxGroup>
          <br />
          <h2>InputCheckbox</h2>
          <InputCheckbox id="checkbox-id" value="value-1" label="Checkbox" />
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Paragraph>
          <hr />
          <Paragraph as="span">Span paragraph</Paragraph>
          <hr />
          <FormField>
            <FormFieldLabel>Where do you live?</FormFieldLabel>
            <FormFieldError>Error</FormFieldError>
            <FormFieldHint>Hint</FormFieldHint>
            <InputRadioGroup groupId="city">
              <InputRadio value="dublin" label="Dublin" />
              <InputRadio value="cork" label="Cork" />
              <InputRadio value="galway" label="Galway" />
            </InputRadioGroup>
          </FormField>
          <FormField>
            <FormFieldLabel htmlFor="textarea-id">
              Inputs with React Hook Form
            </FormFieldLabel>
            <FormFieldHint>Hint: This is a helpful hint.</FormFieldHint>
            <MyForm />
          </FormField>
          <FormField>
            <FormFieldLabel htmlFor="textarea-id2">
              Textarea Component without React Hook Form
            </FormFieldLabel>
            <FormFieldHint>Hint: This is a helpful hint.</FormFieldHint>
            <TextArea id="textarea-id2" maxChars={50} />
          </FormField>
          <span className="material-symbols-outlined">face</span>
          <div>
            <Modal triggerButton={<Button>Open Modal</Button>}>
              <ModalTitle>Title</ModalTitle>
              <ModalBody>
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt esse magnam quis sit soluta cupiditate at deserunt
                  exercitationem voluptas doloribus asperiores
                </Paragraph>
              </ModalBody>
              <ModalFooter>
                <div className="gi-flex gi-gap-6 gi-justify-end">
                  <Button variant="secondary" appearance="dark">
                    Cancel action
                  </Button>
                  <Button>Primary action</Button>
                </div>
              </ModalFooter>
            </Modal>
          </div>

          <br />
          <div>
            <Drawer triggerButton={<Button>Open Drawer</Button>}>
              <DrawerBody>
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt esse magnam quis sit soluta cupiditate at deserunt
                  exercitationem voluptas doloribus asperiores
                </Paragraph>
              </DrawerBody>
              <DrawerFooter>
                <div className="gi-flex gi-gap-6 gi-justify-end">
                  <Button variant="secondary" appearance="dark">
                    Cancel action
                  </Button>
                  <Button>Primary action</Button>
                </div>
              </DrawerFooter>
            </Drawer>
          </div>

          <List items={["Item 1", "Item 2", "Item 3"]} type={"bullet"} />
          <Chip label="Chip" onClose={() => null} />
          <div className="gi-h-[300px] gi-bg-gray-50 gi-overflow-auto gi-p-2">
            <Stack
              direction={{ sm: "column", base: "row" }}
              itemsAlignment="start"
              itemsDistribution="start"
              gap={5}
              hasDivider
            >
              <div className="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center sm:gi-text-red-500">
                Item 1
              </div>
              <div className="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">
                Item 2
              </div>
              <div className="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">
                Item 3
              </div>
            </Stack>
          </div>
          <Alert title="Info Alert" dismissible>
            <Paragraph>This is the content</Paragraph>
          </Alert>

          <SummaryList>
            <SummaryListRow label="Name">
              <SummaryListValue>John Smith</SummaryListValue>
              <SummaryListAction href="/change-name">
                Change name
              </SummaryListAction>
            </SummaryListRow>
            <SummaryListRow label="Date of Birth">
              <SummaryListValue>8 November 1982</SummaryListValue>
              <SummaryListAction href="/change-dob">
                Change date of birth
              </SummaryListAction>
            </SummaryListRow>
            <SummaryListRow label="Address">
              <SummaryListValue>
                72 Guild Street
                <br />
                London
                <br />
                SE23 6FH
              </SummaryListValue>
              <SummaryListAction asChild>
                <NextLink href="/change-address">
                  Change address Nextjs link
                </NextLink>
              </SummaryListAction>
            </SummaryListRow>
          </SummaryList>

          <ProgressBar value={50} label="Loading..." />

          <ProgressStepper>
            <StepItem label="Step 1">Here is the Step 1</StepItem>
            <StepItem label="Step 2">Here is the Step 2</StepItem>
            <StepItem label="Step 3">Here is the Step 3</StepItem>
            <StepItem label="Step 4">Here is the Step 4</StepItem>
            <StepItem label="Step 5">Here is the Step 5</StepItem>
          </ProgressStepper>

          <br />
          <ProgressStepper indicator="number" currentStepIndex={2}>
            <StepItem label="Step 1" />
            <StepItem label="Step 2" />
            <StepItem label="Step 3" />
            <StepItem label="Step 4" />
          </ProgressStepper>

          <br />

          <ProgressStepper
            indicator="number"
            orientation="vertical"
            currentStepIndex={1}
          >
            <StepItem label="This step is for requesting information, this is the first step the user needs to finish." />
            <StepItem label="This step is for requesting information, this is the first step the user needs to finish." />
            <StepItem label="This step is for requesting information, this is the first step the user needs to finish." />
            <StepItem label="This step is for requesting information, this is the first step the user needs to finish." />
            <StepItem label="This step is for requesting information, this is the first step the user needs to finish." />
          </ProgressStepper>

          <br />
          <Details label="Help with Nationality">
            We need to know your nationality so we can work out which elections
            you’re entitled to vote in. If you cannot provide your nationality,
            you’ll have to send copies of identity documents through the post.
          </Details>
        </div>
        <Pagination currentPage={5} onPageChange={() => {}} totalPages={10} />
      </Container>

      <Footer />
      <ToastProvider />
    </>
  );
}
