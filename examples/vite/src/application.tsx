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
} from "@govie-ds/react";

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
              icon={<Icon icon="send" variant="outlined" />}
              ariaLabel="Send"
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
          </TabPanel>
          <TabPanel value="tab2">
            <PhaseBanner level="alpha">
              This is a pre-release version
            </PhaseBanner>

            <span className="material-icons">face</span>
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
          </TabPanel>
        </Tabs>
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
        <hr />
        <Tag text="Completed" type="info" />
      </Container>
      <Footer />
    </>
  );
}
