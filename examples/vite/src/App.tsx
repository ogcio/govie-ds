import "@govie-react/ds/reset.css";
import "@govie-ds/theme-govie/theme.css";
import "@fontsource/lato";
import { Header, Heading, Paragraph } from "@govie-react/ds";

export function App() {
  return (
    <div>
      <Header />
      <div>
        <Heading>Heading</Heading>
        <Paragraph>Paragraph</Paragraph>
      </div>
    </div>
  );
}
