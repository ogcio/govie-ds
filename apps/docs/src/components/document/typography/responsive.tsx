'use client';
import { Fragment } from 'react';
import { Resizable } from 're-resizable';
import { IFrame } from './iframe';

function ResizableIFrame({
  title,
  width,
  height,
  styleSelector,
  children,
}: {
  title: string;
  width?: string | number;
  height?: string | number;
  styleSelector?: string;
  children: React.ReactNode;
}) {
  return (
    <Resizable
      style={{
        border: '1px solid #eee',
        borderRadius: '4px',
      }}
      minWidth={200}
      maxWidth={800}
      minHeight={height}
      maxHeight={height}
      handleStyles={{
        left: {
          display: 'none',
        },
        topLeft: {
          display: 'none',
        },
        top: {
          display: 'none',
        },
        topRight: {
          display: 'none',
        },
        bottomRight: {
          display: 'none',
        },
        bottom: {
          display: 'none',
        },
        bottomLeft: {
          display: 'none',
        },
      }}
      //   bounds="parent"
    >
      <IFrame
        title={title}
        width="100%"
        height="100%"
        styleSelector={styleSelector}
      >
        {children}
      </IFrame>
    </Resizable>
  );
}

export function Responsive({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <link data-frame type="text/css" rel="stylesheet" href="/styles.css" />
      <ResizableIFrame
        title={title}
        height={200}
        styleSelector="link[data-frame]"
      >
        {children}
      </ResizableIFrame>
    </Fragment>
  );
}
