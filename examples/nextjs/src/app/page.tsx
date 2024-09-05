import {
  Container,
  Footer,
  Header,
  Heading,
  Icon,
  IconButton,
  Link,
  Paragraph,
} from "@govie-react/ds";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <Header serviceName="Service Name" />
      <Container>
        <Heading>Heading</Heading>
        <Paragraph>Paragraph</Paragraph>
        <Icon id="send" />
        <IconButton icon={<Icon id="send" />} ariaLabel="Send" />

        <Link href={"/"}>This is a link</Link>
      </Container>
      <Footer />
    </div>
  );
}
