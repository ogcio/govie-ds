import Color from "color";

export type ShadowObject = {
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  color: string;
};

export function toShadowString(value: ShadowObject): string {
  const color = Color(value.color);
  const rgb = color.rgb();

  return `${value.offsetX} ${value.offsetY} ${value.blur} ${value.spread} rgb(${rgb.red()}, ${rgb.green()}, ${rgb.blue()} / ${rgb.alpha().toFixed(2)})`;
}
