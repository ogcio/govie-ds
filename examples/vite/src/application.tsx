import "@govie-react/ds/styles.css";
import "@govie-ds/theme-govie/theme.css";
import "@fontsource/lato";
import {
  Header,
  Heading,
  Paragraph,
  Link,
  Icon,
  Footer,
  Container,
  IconButton,
} from "@govie-react/ds";

export function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header />
      <Container>
        <Heading>Heading</Heading>
        <Link
          href="https://www.google.com"
          external={true}
          noUnderline={true}
          noVisited={true}
        >
          Link
        </Link>
        <Icon id="thumbs-up" variant="filled" />
        <IconButton icon={<Icon id="send" />} ariaLabel="Send" />

        <Paragraph as="span">Span paragraph</Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Paragraph>
      </Container>
      <Footer />
    </div>
  );
}
