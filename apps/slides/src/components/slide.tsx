import { Container } from "./container.js";
import { Header } from "./header.js";

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section
      style={{ textAlign: "initial" }}
      data-transition="none"
      className="h-full"
    >
      {children}
    </section>
  );
}

export function SlideVertical({ children }: { children: React.ReactNode }) {
  return <Section>{children}</Section>;
}

export function Slide({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Section>
      <div className="flex flex-col h-full">
        {title ? <Header title={title} /> : null}
        <div className="flex items-center bg-white grow">
          <Container>{children}</Container>
        </div>
      </div>
    </Section>
  );
}
