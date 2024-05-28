import { Slide } from "./slide";

export function MarkdownSlide({ children }: { children: React.ReactNode }) {
  return (
    <Slide>
      <div className="markdown">{children}</div>
    </Slide>
  );
}
