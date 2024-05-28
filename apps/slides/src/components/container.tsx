import { CSSProperties } from "react";

export function Container({
  as: As = "div",
  children,
  style,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <As className="container mx-auto" style={style}>
      {children}
    </As>
  );
}
