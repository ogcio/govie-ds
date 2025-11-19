import {
  Alert,
  Button,
  Card,
  Combobox,
  Container,
  CookieBanner,
  DropdownItem,
  Footer,
  Form,
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
  Pagination,
  Paragraph,
  PhaseBanner,
  ProgressStepper,
  Select,
  SelectItem,
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
import { useState } from 'react';
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
  return (
    <>
      <HeaderComposable />
      <CookieBanner {...CookieBannerProps} />
      <span className="material-symbols-outlined">123</span>
      <span className="material-symbols-outlined">add</span>
      <span className="material-symbols-outlined">face</span>
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
        {/* <List items={['Item 1', 'Item 2', 'Item 3']} type={TypeEnum.Bullet} /> */}
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
