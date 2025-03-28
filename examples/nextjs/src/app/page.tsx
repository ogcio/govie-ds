'use client';
import { ComboBoxProps, CookieBannerProps } from '@/props';
import {
  Container,
  Footer,
  Header,
  Heading,
  Icon,
  IconButton,
  Link,
  Paragraph,
  PhaseBanner,
  RadioGroup,
  TextArea,
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Button,
  CookieBanner,
  List,
  Combobox,
  Chip,
  Stack,
  Alert,
  Breadcrumbs,
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  SummaryListRow,
  SummaryList,
  SummaryListAction,
  SummaryListValue,
  ProgressBar,
  ProgressStepper,
  StepItem,
  InputCheckbox,
  CheckboxGroup,
  DropdownItem,
  Form,
  Drawer,
  DrawerBody,
  DrawerFooter,
  HeaderSearch,
  HeaderProps,
  Details,
  toaster,
  ToastVariant,
  ToastProvider,
  InputPassword,
  InputText,
  FormField,
  InputRadio,
} from '@govie-ds/react';
import { useState } from 'react';

const headerProps: HeaderProps = {
  items: [
    {
      label: 'Departments',
      itemType: 'link',
      href: '#',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Services',
      itemType: 'link',
      href: '#',
      showItemMode: 'desktop-only',
    },
    {
      itemType: 'divider',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Home',
      icon: 'home',
      itemType: 'link',
      href: '/item1',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Search',
      icon: 'search',
      itemType: 'slot',
      component: <HeaderSearch />,
      slotAppearance: 'dropdown',
      showItemMode: 'desktop-only',
    },
  ],
  secondaryLinks: [
    {
      href: '#',
      label: 'English',
    },
    {
      href: '#',
      label: 'Gaeilge',
    },
  ],
};

export default function Home() {
  const handleCreateToast = (title: string, variant: ToastVariant) =>
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
    });

  return (
    <>
      {/* TODO: Investigate the issue regarding the Header component when running the application */}
      <Header
        logo={{ href: '/' }}
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
        <Button onClick={() => handleCreateToast('Success', 'success')}>
          Trigger Success Toast via callback
        </Button>
        <br />
        <Button onClick={() => handleCreateToast('Error', 'danger')}>
          Trigger Danger Toast via callback
        </Button>
        <br />
        <Button onClick={() => handleCreateToast('Info', 'info')}>
          Trigger Info Toast via callback
        </Button>
        <br />
        <Button onClick={() => handleCreateToast('Warning', 'warning')}>
          Trigger Warning Toast via callback
        </Button>
        <br />
        <div className="flex flex-col gap-4 my-4">
          <Breadcrumbs>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            <BreadcrumbEllipsis />
            <BreadcrumbLink href="/documentation">Documentation</BreadcrumbLink>
            <BreadcrumbCurrentLink href="/travel">Travel</BreadcrumbCurrentLink>
          </Breadcrumbs>
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
              icon: 'send',
              ariaLabel: 'Send',
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
          <CheckboxGroup groupId="field-Id">
            <InputCheckbox value="irish" label="Irish" />
            <InputCheckbox value="british" label="British" />
            <InputCheckbox
              value="citizen-of-another-country"
              label="Citizen of another country"
            />
          </CheckboxGroup>
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
          <FormField label={{ text: 'Where do you live?' }}>
            <RadioGroup groupId={'city'}>
              <InputRadio value={'dublin'} label={'Dublin'} />
              <InputRadio value={'cork'} label={'Cork'} />
              <InputRadio value={'galway'} label={'Galway'} />
            </RadioGroup>
          </FormField>
          <FormField
            hint={{
              text: 'Hint: This is a helpful hint.',
            }}
            label={{
              text: 'Textarea text',
              htmlFor: 'textarea-id',
            }}
          >
            <TextArea id="textarea-id" maxChars={50} />
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

          <List items={['Item 1', 'Item 2', 'Item 3']} type={'bullet'} />
          <Chip label="Chip" onClose={() => null} />
          <div className="gi-h-[300px] gi-bg-gray-50 gi-overflow-auto gi-p-2">
            <Stack
              direction={{ sm: 'column', base: 'row' }}
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
              <SummaryListAction href="/change-address">
                Change address
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
          <Details label="Help with Nationality">
            We need to know your nationality so we can work out which elections
            you’re entitled to vote in. If you cannot provide your nationality,
            you’ll have to send copies of identity documents through the post.
          </Details>
        </div>
      </Container>

      <Footer />
      <ToastProvider />
    </>
  );
}
