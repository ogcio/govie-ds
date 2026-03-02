import {
  Alert,
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  Breadcrumbs,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Card,
  CharacterCount,
  Chip,
  Combobox,
  Container,
  CookieBanner,
  DataTableFooter,
  DataTableFooterCenter,
  DataTableFooterStart,
  DataTableHeader,
  DataTableHeaderSearch,
  Details,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DropdownItem,
  Footer,
  Form,
  FormField,
  FormFieldLabel,
  FormFieldWithTag,
  Header,
  HeaderLogo,
  HeaderMenuItemButton,
  HeaderMenuItemLink,
  HeaderMenuItemSeparator,
  HeaderPrimaryMenu,
  HeaderSearch,
  HeaderSecondaryMenu,
  HeaderSlotContainer,
  HeaderTitle,
  Heading,
  Icon,
  IconButton,
  InputCheckbox,
  InputCheckboxGroup,
  InputFile,
  InputRadio,
  InputRadioGroup,
  InputText,
  Link,
  Modal,
  ModalTitle,
  Pagination,
  Paragraph,
  PhaseBanner,
  Popover,
  ProgressStepper,
  Select,
  SelectItem,
  SelectItemNext,
  SelectNext,
  StepItem,
  TabItem,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  TextArea,
  toaster,
  ToastProps,
  ToastProvider,
} from '@ogcio/design-system-react';
import '@ogcio/design-system-react/styles.css';
import '@ogcio/theme-govie/theme.css';
import { useRef, useState } from 'react';
import { ComboBoxProps, CookieBannerProps } from './props';

const toastProps: ToastProps = {
  title: 'Default',
  description: 'This is some content',
  animation: 'fadeinup',
  variant: 'info',
  duration: 5000,
  position: {
    x: 'right',
    y: 'bottom',
  },
};

const PopoverSection = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="gi-h-20">
      <Button ref={triggerRef} onClick={() => setOpen(!open)}>
        Open Popover
      </Button>
      <Popover triggerRef={triggerRef} open={open} onOpenChange={setOpen}>
        <div className="gi-text-sm gi-text-gray-800 gi-p-6">
          This is popover content. Click outside to close.
        </div>
      </Popover>
    </div>
  );
};

const HeaderComposable = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Header variant="default" aria-label="Site header" id="GovieHeader">
        <HeaderLogo>
          <img
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

export function App() {
  const [currentPage, setCurrentPage] = useState(5);
  const [charCountValue, setCharCountValue] = useState('');
  return (
    <>
      <HeaderComposable />
      <CookieBanner {...CookieBannerProps} />
      <Container>
        <Heading>Design System </Heading>
        <Tabs id="tabs" ariaLabelledBy="">
          <TabList>
            <TabItem value="tab1" checked>
              Typography
            </TabItem>
            <TabItem value="tab2">Components</TabItem>
            <TabItem value="tab3">Form</TabItem>
          </TabList>
          <TabPanel value="tab1">
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
                icon: 'send',
                ariaLabel: 'send',
              }}
              variant="flat"
            />
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph>
            <hr />
            <Paragraph as="span">Span paragraph</Paragraph>
            <hr />
            <Tag text="Completed" type="info" />
            <FormFieldWithTag
              label={{
                text: 'Label',
              }}
              hint={{
                text: 'Description',
              }}
              tag={{
                text: 'Error',
                type: 'error',
              }}
            >
              <TextArea halfFluid id="textarea-id" maxChars={50} />
            </FormFieldWithTag>
          </TabPanel>
          <TabPanel value="tab2">
            <PhaseBanner level="Alpha">
              This is a pre-release version
            </PhaseBanner>
            <span className="material-symbols-outlined">face</span>
            <Card
              action={{
                children: 'Button',
                type: 'button',
                variant: 'secondary',
              }}
              content="Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin."
              media={{
                type: 'image',
                config: {
                  src: 'https://placeholderjs.com/400x300',
                },
              }}
              subTitle="Subheading"
              tag={{
                text: 'New',
                type: 'info',
              }}
              title="Card Title"
              type="vertical"
            />
          </TabPanel>
          <TabPanel value="tab3">
            <InputText id="text-input-id" suffix="KG" />
            <TextArea id="textarea-id" maxChars={50} />
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
            <ToastProvider />
            <Button onClick={() => toaster.create(toastProps)}>
              Trigger Toast
            </Button>
            <Select id="unique-id">
              <SelectItem>Option 1</SelectItem>
              <SelectItem>Option 2</SelectItem>
            </Select>
            <hr />
            <InputFile id="file-upload-id" />
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={10}
            />
          </TabPanel>
        </Tabs>
        <h2>Checkboxes Group</h2>
        <InputCheckboxGroup groupId="field-Id">
          <InputCheckbox id="checkbox-id" value="value-1" label="Checkbox" />
          <InputCheckbox id="checkbox-id-2" value="value-1" label="Checkbox2" />
        </InputCheckboxGroup>
        <br />
        <br />
        <h2>Progress Stepper</h2>
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
        <h2>Checkbox</h2>
        <InputCheckbox id="checkbox-id" value="value-1" label="Checkbox" />
        <InputRadioGroup groupId="uniqueId1">
          <InputRadio value="single-radio" label="Radio 1" />
          <InputRadio value="single-radio" label="Radio 2" />
        </InputRadioGroup>
        <Heading size="sm">Single Radio</Heading>
        <InputRadio value="single-radio" label="Single Radio" />
        <Modal triggerButton={<Button>Open Modal</Button>}>
          <Heading as="h2">Title</Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            esse magnam quis sit soluta cupiditate at deserunt exercitationem
            voluptas doloribus asperiores
          </Paragraph>
          <div className="gi-flex gi-gap-6 gi-justify-end">
            <Button variant="secondary" appearance="dark">
              Cancel action
            </Button>
            <Button>Primary action</Button>
          </div>
        </Modal>
        <Alert title="Info Alert" dismissible>
          <Paragraph>This is the content</Paragraph>
        </Alert>

        <hr />
        <h2>CharacterCount</h2>
        <FormFieldWithTag label={{ text: 'With character count' }}>
          <TextArea
            id="char-count-demo"
            maxChars={100}
            value={charCountValue}
            onChange={(event) => setCharCountValue(event.target.value)}
          />
          <CharacterCount maxChars={100} value={charCountValue} />
        </FormFieldWithTag>

        <hr />
        <h2>Details</h2>
        <Details label="Help with nationality">
          <Paragraph>
            If you&apos;re not sure about your nationality, try to find it on
            your passport or national ID card.
          </Paragraph>
        </Details>

        <hr />
        <h2>InputFile</h2>
        <InputFile id="file-upload-demo" />

        <hr />
        <h2>Popover</h2>
        <PopoverSection />

        <hr />
        <h2>Chip</h2>
        <div className="gi-flex gi-gap-2 gi-flex-wrap">
          <Chip label="Chip one" onClose={() => null} />
          <Chip label="Chip two" onClose={() => null} />
        </div>

        <hr />
        <h2>Combobox</h2>
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

        <hr />
        <h2>Breadcrumbs</h2>
        <Breadcrumbs>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
          <BreadcrumbLink href="#">Section</BreadcrumbLink>
          <BreadcrumbCurrentLink href="#">Current page</BreadcrumbCurrentLink>
        </Breadcrumbs>

        <hr />
        <h2>SelectNext</h2>
        <FormField>
          <FormFieldLabel text="Select an option" />
          <SelectNext id="select-next-demo" placeholder="Choose...">
            <SelectItemNext value="a">Option A</SelectItemNext>
            <SelectItemNext value="b">Option B</SelectItemNext>
            <SelectItemNext value="c">Option C</SelectItemNext>
          </SelectNext>
        </FormField>

        <hr />
        <h2>DataTableHeader &amp; DataTableFooter</h2>
        <div className="gi-flex gi-flex-col gi-gap-4">
          <DataTableHeader>
            <DataTableHeaderSearch className="gi-max-w-52">
              <InputText
                id="data-table-search-demo"
                placeholder="Search..."
              />
            </DataTableHeaderSearch>
          </DataTableHeader>
          <DataTableFooter standalone>
            <DataTableFooterStart>
              <Paragraph className="gi-text-sm">Showing 1–10 of 50</Paragraph>
            </DataTableFooterStart>
            <DataTableFooterCenter>
              <Pagination
                currentPage={1}
                onPageChange={() => null}
                totalPages={5}
              />
            </DataTableFooterCenter>
          </DataTableFooter>
        </div>

        <hr />
        <h2>ButtonGroup</h2>
        <ButtonGroup
          name="alignment"
          defaultValue="left"
          onChange={(v) => console.log(v)}
        >
          <ButtonGroupItem value="left">Left</ButtonGroupItem>
          <ButtonGroupItem value="center">Center</ButtonGroupItem>
          <ButtonGroupItem value="right">Right</ButtonGroupItem>
        </ButtonGroup>

        <hr />
        <h2>Drawer</h2>
        <Drawer triggerButton={<Button>Open Drawer</Button>} position="right">
          <ModalTitle>Drawer Title</ModalTitle>
          <DrawerBody>
            <Paragraph>
              Drawer content goes here. Use for side panels and navigation.
            </Paragraph>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="secondary">Cancel</Button>
            <Button>Confirm</Button>
          </DrawerFooter>
        </Drawer>
      </Container>
      <Footer
        utilitySlot={
          <div className="gi-flex gi-flex-row gi-gap-y-2 gi-gap-4 gi-justify-center gi-flex-wrap">
            <Link aria-label="Privacy Policy" href="/privacy-policy" noColor>
              Privacy Policy
            </Link>
            <Link aria-label="Accessibility" href="/accessibility" noColor>
              Accessibility
            </Link>
            <div className="gi-text-sm">© 2025 Government of Ireland.</div>
          </div>
        }
      />
    </>
  );
}
