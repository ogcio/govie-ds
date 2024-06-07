'use client';
import {
  useState,
  useEffect,
  Fragment,
  MouseEventHandler,
  MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { Resizable } from 're-resizable';

function IFrame({
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
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const mountNode = contentRef?.contentWindow?.document.body;

  useEffect(() => {
    if (!contentRef) {
      return;
    }

    const window = contentRef?.contentWindow;

    if (!window) {
      throw new Error('contentWindow is not available.');
    }

    if (!styleSelector) {
      return;
    }

    const linkEls = window.parent.document.querySelectorAll(styleSelector);

    if (linkEls.length) {
      linkEls.forEach((el) => {
        window.document.head.appendChild(el);
      });
    }
  }, [contentRef, styleSelector]);

  return (
    <iframe
      title={title}
      width={typeof width === 'number' ? `${width}px` : width}
      height={typeof height === 'number' ? `${height}px` : height}
      ref={setContentRef}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}

// function ResizableIFrame({
//   title,
//   width,
//   height,
//   styleSelector,
//   children,
// }: {
//   title: string;
//   width?: string | number;
//   height?: string | number;
//   styleSelector?: string;
//   children: React.ReactNode;
// }) {
//   const [currentWidth, setCurrentWidth] = useState<string | number>(
//     width ?? '100%',
//   );
//   const [isDragging, setIsDragging] = useState(false);

//   const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
//     e.preventDefault();

//     if (isDragging) {
//       setCurrentWidth(e.clientX);
//     }
//   };

//   return (
//     <Fragment>
//       {currentWidth}
//       <p>dragging: {isDragging.toString()}</p>

//       <div
//         className="relative flex items-stretch"
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         <IFrame
//           title={title}
//           width={currentWidth}
//           height={height}
//           styleSelector={styleSelector}
//         >
//           {children}
//         </IFrame>
//         <div
//           className="absolute w-[20px] top-[50%] right-0 cursor-pointer"
//           onMouseDown={handleMouseDown}
//           onMouseUp={handleMouseUp}
//         >
//           |
//         </div>
//       </div>
//     </Fragment>
//   );
// }

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
      maxWidth={width}
      minHeight={height}
      maxHeight={height}
      bounds="parent"
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
