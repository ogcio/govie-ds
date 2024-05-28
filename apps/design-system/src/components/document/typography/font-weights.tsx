import { meta } from "@ogcio-ds/theme-govie";
import { objectKeys } from "ts-extras";
import { TokenName } from "../color/token-name";
import { Table, Td } from "./table";

export function FontWeights() {
  return (
    <Table
      headers={["Token", "Value", "Example"]}
      ids={objectKeys(meta.light.resolved.primitive.font.weight)}
      renderRow={(id) => {
        const { $value: value } = meta.light.resolved.primitive.font.weight[id];

        return (
          <tr key={id}>
            <Td className="whitespace-nowrap w-[1px] text-sm">
              <TokenName name={`font-weight/${id}`} />
            </Td>
            <Td className="text-sm">{value}</Td>
            <Td className="text-lg" style={{ fontWeight: value }}>
              Sample text
            </Td>
          </tr>
        );
      }}
    />
  );
}
