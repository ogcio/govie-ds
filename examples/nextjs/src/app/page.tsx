"use client";
import { ComboBoxProps, CookieBannerProps } from "@/props";
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
  RadiosGroup,
  TextArea,
  Modal,
  Button,
  CookieBanner,
  TypeEnum,
  List,
  Combobox,
  Chip,
} from "@govie-ds/react";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
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
        <div className="flex flex-col gap-4 my-4">
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
          <Combobox {...ComboBoxProps} />
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
          <RadiosGroup
            title={{
              value: "Where do you live?",
              asHeading: {
                size: 'md',
                as: 'h2',
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
            groupId="uniqueId"
          />
          <TextArea
            hint={{
              text: "Hint: This is a helpful hint.",
            }}
            id="textarea-id"
            maxChars={50}
            label={{
              text: "Textarea text",
              htmlFor: "textarea-id",
            }}
          />

          <span className="material-symbols-outlined">face</span>
          <Modal triggerButton={<Button>Open Modal</Button>}>
            <Heading as='h2'>Title</Heading>
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
          <List items={["Item 1", "Item 2", "Item 3"]} type={TypeEnum.Bullet} />
          <Chip label="Chip" onClose={() => null} />
        </div>
      </Container>

      <Footer />
    </div>
  );
}
