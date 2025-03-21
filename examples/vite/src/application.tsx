import '@govie-ds/react/styles.css';
import '@govie-ds/theme-govie/theme.css';
import {
  Header,
  Heading,
  Paragraph,
  Link,
  Icon,
  Footer,
  Container,
  IconButton,
  PhaseBanner,
  Select,
  TextInput,
  TextArea,
  Tabs,
  TabItem,
  TabPanel,
  TabList,
  FileUpload,
  Tag,
  Modal,
  RadioGroup,
  Card,
  Button,
  CookieBanner,
  // List,
  // TypeEnum,
  Combobox,
  Radio,
  Alert,
  Pagination,
  Checkbox,
  CheckboxGroup,
  Form,
  DropdownItem,
  HeaderProps,
  HeaderSearch,
  ToastProvider,
  toaster,
  ToastProps,
  FormField,
  SelectItem,
} from '@govie-ds/react';
import { CookieBannerProps, ComboBoxProps } from './props';
import { useState } from 'react';

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

export function App() {
  const [currentPage, setCurrentPage] = useState(5);
  return (
    <>
      <Header
        logo={{ href: '/' }}
        items={headerProps.items}
        addDefaultMobileMenu
        secondaryLinks={headerProps.secondaryLinks}
      />
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
          </TabPanel>
          <TabPanel value="tab2">
            <PhaseBanner level="alpha">
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
            <FormField
              error={{
                text: 'Error: Please correct this issue.',
              }}
              hint={{
                text: 'Hint: This is a helpful hint.',
              }}
              label={{
                text: 'Label',
                htmlFor: 'text-input-id',
              }}
            >
              <TextInput id="text-input-id" suffix="KG" />
            </FormField>
            <FormField
              label={{
                text: 'Label',
                htmlFor: 'textarea-id',
              }}
              error={{
                text: 'Error: Please correct this issue.',
              }}
              hint={{
                text: 'Hint: This is a helpful hint.',
              }}
            >
              <TextArea id="textarea-id" maxChars={50} />
            </FormField>
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
            <FormField label={{ text: 'Label' }}>
              <Select id="unique-id">
                <SelectItem label="Option 1" value={'value-1'} />
                <SelectItem label="Option 2" value={'value-2'} />
                <SelectItem label="Option 3" value={'value-3'} />
              </Select>
            </FormField>
            <hr />
            <FormField
              label={{
                text: 'Upload File',
                htmlFor: 'file-upload-id',
              }}
              error={{
                text: 'Error: File must be smaller than 5MB.',
              }}
            >
              <FileUpload id="file-upload-id" />
            </FormField>
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={10}
            />
          </TabPanel>
        </Tabs>
        <h2>Checkboxes Group</h2>

        <FormField>
          <CheckboxGroup groupId="field-Id">
            <Checkbox
              value={'employment-tribunal'}
              label={'Employment Tribunal'}
              id={'UniqueID-check1'}
            />
            <Checkbox
              value={'ministry-of-defence'}
              label={'Ministry of Defence'}
              id={'UniqueID-check2'}
            />
            <Checkbox
              value={'department-for-transport'}
              label={'Department for Transport'}
              id={'UniqueID-check3'}
            />
            <Checkbox
              value={'others'}
              label={'Others'}
              id={'UniqueID-check4'}
              disabled
            />
          </CheckboxGroup>
        </FormField>
        <br />
        <h2>Checkbox</h2>
        <Checkbox id="checkbox-id" value="value-1" label="Checkbox" />
        <FormField
          label={{ text: 'How do you want to sign in?' }}
          hint={{
            text: "You'll need an account to prove your identity and complete your Self Assessment",
          }}
        >
          <RadioGroup groupId="group">
            <Radio
              value={'val1'}
              label={'Sign in with Username and Password'}
              hint="You'll have a user ID if you've registered for Self Assessment or filed a tax return online before"
            />
            <Radio
              value={'val2'}
              label={'Sign in with MyGovID'}
              hint="If you don't have a MyGovID Login, you can create one"
            />
          </RadioGroup>
        </FormField>
        <Heading size="sm">Single Radio</Heading>
        <Radio value="single-radio" label="Single Radio" />
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
      <Footer />
    </>
  );
}
