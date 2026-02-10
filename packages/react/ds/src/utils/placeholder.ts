export const generateSvgPlaceholder = (
  width: number = 300,
  height: number = 400,
): string => {
  const text = `${width}x${height}`;
  const minSide = Math.min(width, height);
  const fontSize = Math.max(12, Math.min(18, Math.round(minSide / 8)));

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect fill="#BABEC4" width="100%" height="100%"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        font-size="${fontSize}" 
        fill="#0B0C0C"
      >${text}</text>
    </svg>
  `.trim();
};

export const generateSvgPlaceholderDataUrl = (
  width: number = 300,
  height: number = 400,
): string => {
  const svg = generateSvgPlaceholder(width, height);
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
