import { Container } from "./container.js";
import { Logo } from "./logo.js";

export function Header({ title }: { title?: string }) {
  return (
    <div className="bg-emerald-800 border-b-lg border-gold-500">
      <Container>
        <div className="flex items-center py-lg text-white">
          <Logo />
          {title ? (
            <div className="flex justify-end items-center grow">
              <h1 className="text-xl">{title}</h1>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
