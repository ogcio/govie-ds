import { Fragment } from 'react';
import { ResizableIFrame } from './resizable-iframe';
import { LatoFont } from './lato-font';

export function Responsive({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <link data-frame rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        data-frame
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        data-frame
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <link data-frame type="text/css" rel="stylesheet" href="/styles.css" />
      <ResizableIFrame
        title={title}
        height={200}
        styleSelector="link[data-frame]"
      >
        <LatoFont>{children}</LatoFont>
      </ResizableIFrame>
    </Fragment>
  );
}
