import Highlight from "react-highlight";
import "../../node_modules/highlight.js/styles/github.css";

export function Code({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  return (
    <div className="text-sm">
      <Highlight className={`${language} whitespace-pre-wrap`}>
        {children}
      </Highlight>
    </div>
  );
}
