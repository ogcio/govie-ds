import express from 'express';
import { join } from 'node:path';

import { CommonEngine } from '@angular/ssr/node';
import bootstrap from './main.server';

import { renderToString } from '@ogcio/govie-component-library/hydrate';

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ogcio-demo/browser');
  const indexHtml = join(distFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.use(express.static(distFolder, { maxAge: '1y', index: false }));

  server.get('*', async (req, res, next) => {
    try {
      const html = await commonEngine.render({
        bootstrap,
        documentFilePath: indexHtml,
        url: req.originalUrl,
        publicPath: distFolder,
        providers: [{ provide: 'REQUEST', useValue: req }],
      });

      //full SSR
      const hydrated = await renderToString(html, {
        prettyHtml: true,
      });

      res.status(200).send(hydrated.html);
    } catch (err) {
      next(err);
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`SSR server listening on http://localhost:${port}`);
  });
}

run();
