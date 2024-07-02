import { Header, Heading, Icon, IconButton, Paragraph } from "@govie-react/ds";

export default function Home() {
  return (
    <main>
      <Header serviceName="Service Name" />
      <Heading>Heading</Heading>
      <Paragraph>Paragraph</Paragraph>
      <Icon id="send" />
      <IconButton icon={<Icon id="send" />} ariaLabel="Send" />
    </main>
  );
}
