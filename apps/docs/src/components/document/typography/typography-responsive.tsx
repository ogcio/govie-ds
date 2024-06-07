import { Fragment } from 'react';
import { Responsive } from './responsive';

export function TypographyResponsive() {
  return (
    <Fragment>
      <link
        data-frame
        type="text/css"
        rel="stylesheet"
        href="/_next/static/css/app/layout.css"
      />
      <Responsive title="Sample" styleSelector="link[data-frame]">
        <h1 className="bg-gold-200">Hello world</h1>
      </Responsive>
    </Fragment>
  );
}
