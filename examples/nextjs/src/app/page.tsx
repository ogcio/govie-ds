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
      <Container>
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
          icon={<Icon icon="send" variant="outlined" inline />}
          ariaLabel="Send"
        />
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
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

        <span className="material-icons">face</span>
      </Container>
      <Footer />
    </div>
  );
}
