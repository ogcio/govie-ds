export function TypographyResponsiveSizes() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Screen</th>
            <th className="px-4 py-2">Font Size</th>
            <th className="px-4 py-2">Line Height</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">xs</td>
            <td className="border px-4 py-2">sm</td>
            <td className="border px-4 py-2">12px</td>
            <td className="border px-4 py-2">16px</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">sm</td>
            <td className="border px-4 py-2">sm</td>
            <td className="border px-4 py-2">14px</td>
            <td className="border px-4 py-2">20px</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">base</td>
            <td className="border px-4 py-2">sm</td>
            <td className="border px-4 py-2">16px</td>
            <td className="border px-4 py-2">24px</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">lg</td>
            <td className="border px-4 py-2">md</td>
            <td className="border px-4 py-2">18px</td>
            <td className="border px-4 py-2">28px</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">xl</td>
            <td className="border px-4 py-2">lg</td>
            <td className="border px-4 py-2">20px</td>
            <td className="border px-4 py-2">32px</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
