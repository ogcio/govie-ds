import {
  Container,
  Footer,
  Header,
  Heading,
  Icon,
  IconButton,
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
      </Container>
      <Footer />
    </div>
  );
}
