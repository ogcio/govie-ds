import "@govie-react/ds/styles.css";
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
} from "@govie-react/ds";

export function App() {
  return (
    <>
      <Header
        serviceName="Example"
        homeHref="www.gov.ie"
        serviceHref="#"
        homeAriaLabel="aria label"
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
          icon={<Icon icon="send" variant="filled" />}
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

        <span className="material-icons">face</span>
      </Container>
      <Footer />
    </>
  );
}
