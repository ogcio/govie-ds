import { meta } from '@govie-ds/tokens';
import { Fragment } from 'react/jsx-runtime';
import { Svg } from './svg.js';

function Copy() {
  return (
    <Fragment>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </Fragment>
  );
}

function Edit() {
  return (
    <Fragment>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </Fragment>
  );
}

function Mic() {
  return (
    <Fragment>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </Fragment>
  );
}

function Send() {
  return (
    <Fragment>
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </Fragment>
  );
}

function ThumbsDown() {
  return (
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
  );
}

function ThumbsUp() {
  return (
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  );
}

export type IconId =
  | 'copy'
  | 'edit'
  | 'mic'
  | 'send'
  | 'thumbs-down'
  | 'thumbs-up';

const iconMap: Record<IconId, () => React.ReactElement> = {
  ['copy']: Copy,
  ['edit']: Edit,
  ['mic']: Mic,
  ['send']: Send,
  ['thumbs-down']: ThumbsDown,
  ['thumbs-up']: ThumbsUp,
};

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

function toWidthHeight(size: IconSize) {
  switch (size) {
    case 'sm': {
      return {
        width: meta.light.resolved.primitive.size.sm.$value,
        height: meta.light.resolved.primitive.size.sm.$value,
      };
    }
    case 'md': {
      return {
        width: meta.light.resolved.primitive.size.md.$value,
        height: meta.light.resolved.primitive.size.md.$value,
      };
    }
    case 'lg': {
      return {
        width: meta.light.resolved.primitive.size.lg.$value,
        height: meta.light.resolved.primitive.size.lg.$value,
      };
    }
    case 'xl': {
      return {
        width: meta.light.resolved.primitive.size.xl.$value,
        height: meta.light.resolved.primitive.size.xl.$value,
      };
    }
  }
}

export function Icon({ id, size = 'md' }: { id: IconId; size?: IconSize }) {
  const icon = iconMap[id];

  if (!icon) {
    throw new Error(`Icon '${id}' not found.`);
  }

  const { width, height } = toWidthHeight(size);

  return (
    <Svg width={width} height={height}>
      {icon()}
    </Svg>
  );
}
