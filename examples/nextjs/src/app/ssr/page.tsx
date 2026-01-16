import React from 'react';
import { renderToString } from '@ogcio/govie-component-library/hydrate';

export const runtime = 'nodejs';

export default async function Page() {
  const ssrHtml = await renderToString(`
    <govie-button aria-label="Save changes">Save</govie-button>
    <govie-paragraph aria-label="Save changes">Paragraph</govie-paragraph>
  `);

  return (
    <main style={{ padding: 24 }}>
      <h1>Stencil components (SSR)</h1>
      <div dangerouslySetInnerHTML={{ __html: ssrHtml.html || '' }} />
    </main>
  );
}
