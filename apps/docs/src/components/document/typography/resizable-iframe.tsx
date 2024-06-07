'use client';
import { Resizable } from 're-resizable';
import { IFrame } from './iframe';

export function ResizableIFrame({
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
