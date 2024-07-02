import "@govie-react/ds/reset.css";
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
} from "@govie-react/ds";

export function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header />
      <Container>
        <Heading>Heading</Heading>
        <Paragraph>Paragraph</Paragraph>
        <Link href="#">Link</Link>
        <Icon id="thumbs-up" variant="filled" />
      </Container>
      <Footer />
    </div>
  );
}
