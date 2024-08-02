import { meta } from '@govie-ds/tokens';
import { cloneElement } from 'react';
import { Svg } from './svg.js';

function CopyDefault() {
  return (
    <Svg width={24} height={24} fill="none" stroke="currentColor">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </Svg>
  );
}

function OpenInNewDefault() {
  return (
    <Svg width={24} height={24}>
      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"></path>
    </Svg>
  );
}

function EditDefault() {
  return (
    <Svg width={24} height={24} fill="none" stroke="currentColor">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </Svg>
  );
}

function MicDefault() {
  return (
    <Svg width={24} height={24} fill="none" stroke="currentColor">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </Svg>
  );
}

function SendDefault() {
  return (
    <Svg width={24} height={24}>
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </Svg>
  );
}

function ThumbsDownDefault() {
  return (
    <Svg width={24} height={24}>
      <path d="M24 24H0V0h24v24z" fill="none" />
      <path d="M10.89 18.28l.57-2.89c.12-.59-.04-1.2-.42-1.66-.38-.46-.94-.73-1.54-.73H4v-1.08L6.57 6h8.09c.18 0 .34.16.34.34v7.84l-4.11 4.1M10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97l-2.67 6.15c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22zm10-7h2V4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1z" />
    </Svg>
  );
}

function ThumbsDownFilled() {
  return (
    <Svg width={24} height={24}>
      <path d="M24 24H0V0h24v24z" fill="none" />
      <path d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97l-2.67 6.15z" />
    </Svg>
  );
}

function ThumbsUpDefault() {
  return (
    <Svg width={24} height={24}>
      <path d="M13.11 5.72l-.57 2.89c-.12.59.04 1.2.42 1.66.38.46.94.73 1.54.73H20v1.08L17.43 18H9.34c-.18 0-.34-.16-.34-.34V9.82l4.11-4.1M14 2L7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.83C7 18.95 8.05 20 9.34 20h8.1c.71 0 1.36-.37 1.72-.97l2.67-6.15c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2zM4 9H2v11h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1z" />
    </Svg>
  );
}

function ThumbsUpFilled() {
  return (
    <Svg width={24} height={24}>
      <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z" />
    </Svg>
  );
}

export type IconId =
  | 'copy'
  | 'edit'
  | 'mic'
  | 'send'
  | 'thumbs-down'
  | 'thumbs-up'
  | 'open-in-new';

const iconMap: Record<string, () => React.ReactElement> = {
  ['copy']: CopyDefault,
  ['edit']: EditDefault,
  ['mic']: MicDefault,
  ['send']: SendDefault,
  ['thumbs-down']: ThumbsDownDefault,
  ['thumbs-down-filled']: ThumbsDownFilled,
  ['thumbs-up']: ThumbsUpDefault,
  ['thumbs-up-filled']: ThumbsUpFilled,
  ['open-in-new']: OpenInNewDefault,
};

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconColor = 'default' | 'disabled';

export type IconVariant = 'default' | 'filled';

function toWidthHeight(size: IconSize) {
  return {
    width: meta.light.resolved.primitive.size[size].$value,
    height: meta.light.resolved.primitive.size[size].$value,
  };
}

export function Icon({
  id,
  size = 'md',
  variant = 'default',
  color = 'default',
  ariaHidden,
  ariaLabel,
}: {
  id: IconId;
  size?: IconSize;
  variant?: IconVariant;
  color?: IconColor;
  ariaHidden?: boolean;
  ariaLabel?: string;
}) {
  const iconId = [id, variant === 'filled' ? '-filled' : undefined]
    .filter(Boolean)
    .join('');

  const icon = iconMap[iconId];

  if (!icon) {
    throw new Error(`Icon '${iconId}' not found.`);
  }

  const { width, height } = toWidthHeight(size);

  return cloneElement(icon(), {
    width,
    height,
    'aria-hidden': ariaHidden || undefined,
    'aria-label': ariaLabel,
    role: ariaLabel ? 'img' : 'presentation',
    color: color === 'default' ? 'currentColor' : 'var(--gieds-color-gray-300)',
  });
}
