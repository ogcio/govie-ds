import "@govie-ds/react/styles.css";
import "@govie-ds/theme-govie/theme.css";
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
  RadiosGroup,
  Card,
  Button,
  CookieBanner,
} from "@govie-ds/react";
import { CookieBannerProps } from "./props";

export function App() {
  return (
    <>
      <Header
        logo={{ href: "/" }}
        tools={{ search: { action: "/search-page" } }}
        navLinks={[
          {
            href: "#",
            label: "News",
          },
          {
            href: "#",
            label: "Departments",
          },
          {
            href: "#",
            label: "Services",
          },
        ]}
        languages={[
          {
            href: "#",
            label: "Gaeilge",
          },
        ]}
      />
      <CookieBanner {...CookieBannerProps} />
      <Container>
        <Heading>Design System </Heading>
        <Tabs id="tabs">
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
                icon: "send",
                ariaLabel: "send",
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
            <span className="material-icons">face</span>
            <Card
              actions={[
                {
                  href: "#",
                  text: "Link",
                },
              ]}
              content="Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin."
              href="#"
              img="https://placeholderjs.com/300x180"
              title="Vertical Card"
              type="vertical"
            />
          </TabPanel>
          <TabPanel value="tab3">
            <TextInput
              id="text-input-id"
              error={{
                text: "Error: Please correct this issue.",
              }}
              hint={{
                text: "Hint: This is a helpful hint.",
              }}
              label={{
                text: "Label",
                htmlFor: "text-input-id",
              }}
              suffix="KG"
            />
            <TextArea
              error={{
                text: "Error: Please correct this issue.",
              }}
              hint={{
                text: "Hint: This is a helpful hint.",
              }}
              id="textarea-id"
              label={{
                text: "Label",
                htmlFor: "textarea-id",
              }}
            />
            <Select
              id="unique-id"
              label={{ text: "Label" }}
              options={[
                {
                  label: "Option 1",
                  value: "value-1",
                },
                {
                  label: "Option 2",
                  value: "value-2",
                },
                {
                  label: "Option 3",
                  value: "value-3",
                },
              ]}
            />
            <hr />
            <FileUpload
              error={{
                text: "Error: File must be smaller than 5MB.",
              }}
              id="file-upload-id"
              label={{
                text: "Upload File",
                htmlFor: "file-upload-id",
              }}
            />
          </TabPanel>
        </Tabs>
        <RadiosGroup
          title={{
            value: "Where do you live?",
            asHeading: {
              size: "md",
              as: "h2",
            },
          }}
          items={[
            {
              label: "England",
              value: "england",
            },
            {
              label: "Scotland",
              value: "scotland",
            },
            {
              label: "Ireland",
              value: "ireland",
            },
          ]}
          fieldId="uniqueId"
        />
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
      </Container>
      <Footer />
    </>
  );
}
