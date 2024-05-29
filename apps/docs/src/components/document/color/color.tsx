import convert from "color-convert";
import { TokenName } from "./token-name";

export function Color({
  name,
  description,
  value,
  cssVariable,
}: {
  name: string;
  description?: string;
  value: string;
  cssVariable: string;
}) {
  return (
    <div className="flex border border-gray-200 rounded">
      <div
        className="self-stretch w-[100px]"
        style={{ backgroundColor: value }}
      />
      <div className="grow flex gap-md items-center px-md">
        <div className="grow flex flex-col gap-md py-md">
          <div className="flex flex-col gap-sm">
            <div className="flex">
              <TokenName name={name} />
            </div>
            {description ? (
              <p className="text-gray-500">{description}</p>
            ) : null}
          </div>
          <div className="grid grid-cols-[auto,1fr] gap-x-lg items-center">
            <div>HEX</div>
            <div className="text-sm text-gray-600">{value}</div>
            <div>RGB</div>
            <div className="text-sm text-gray-600">
              {convert.hex.rgb(value).join(", ")}
            </div>
            <div>HSL</div>
            <div className="text-sm text-gray-600">
              {convert.hex.hsl(value).join(", ")}
            </div>
            <div>CMYK</div>
            <div className="text-sm text-gray-600">
              {convert.hex.cmyk(value).join(", ")}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-md text-gray-600">var({cssVariable})</div>
      </div>
    </div>
  );
}
