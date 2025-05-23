'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { ClientOnly } from '../common/client-only';
import { DownloadTheme } from './download-theme';
import { Paragraph } from '@govie-ds/react';

const COLOR_GROUPS = [
  {
    label: 'Brand',
    keys: ['primary', 'secondary', 'neutral'],
  },
  {
    label: 'Support',
    keys: [
      'support-info',
      'support-success',
      'support-warning',
      'support-error',
    ],
  },
  {
    label: 'Utility',
    keys: ['utility-convention', 'utility-convention-alt'],
  },
] as const;

const COLOR_KEYS = COLOR_GROUPS.flatMap((group) => group.keys);

type ColorKey = (typeof COLOR_KEYS)[number];

type State = Record<ColorKey, string>;

type Action = {
  type: 'UPDATE_COLOR';
  key: ColorKey;
  value: string;
};

const initialState = Object.fromEntries(
  COLOR_KEYS.map((key) => [key, `var(--gieds-color-${key}-800)`]),
) as State;

const resolveColor = (isMounted: boolean, color: string): string => {
  if (!isMounted) {
    return '#ffffff';
  }
  if (!color.startsWith('var(')) {
    return color;
  }

  const cssVar = color.slice(4, -1).trim();
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(cssVar)
      .trim() || '#ffffff'
  );
};

const formatKeyLabel = (key: string): string => {
  const parts = key
    .replace(/^support-/, '')
    .replace(/^utility-/, '')
    .split('-');
  const label = parts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return label === 'Convention Alt' ? 'Alt' : label;
};

function colorReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_COLOR':
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
}

export const ThemeBuilder = () => {
  const [state, dispatch] = useReducer<any, any>(colorReducer, initialState);
  const [active, setActive] = useState<ColorKey | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setActive(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <ClientOnly>
      <div className="flex flex-col">
        <div className="flex gap-4 flex-col gi-not-prose">
          {COLOR_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="text-lg mb-2 font-bold text-black">
                {group.label}
              </div>
              <div className="flex flex-wrap gap-4">
                {group.keys.map((key) => (
                  <div
                    key={key}
                    className="relative w-[100px] h-[100px] border rounded shadow-md flex flex-col items-center cursor-pointer"
                    onClick={() => setActive(key)}
                  >
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: state[key] }}
                    />
                    <div className="text-sm text-black cur">
                      {formatKeyLabel(key)}
                    </div>
                    {active === key && (
                      <div
                        ref={pickerRef}
                        className="absolute top-full mt-2 z-[1000]"
                      >
                        <ChromePicker
                          color={resolveColor(isMounted, state[key])}
                          onChange={(color) =>
                            dispatch({
                              type: 'UPDATE_COLOR',
                              key,
                              value: color.hex,
                            })
                          }
                          disableAlpha
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Paragraph className="gi-not-prose my-8">
          Once you are done, click the <b>Download</b> button to export the
          complete theme as a CSS file, ready to use in your project.
        </Paragraph>
        <DownloadTheme
          colors={Reflect.ownKeys(state).reduce(
            (prevKey: any, currentKey: any) => {
              return {
                ...prevKey,
                [currentKey]: resolveColor(isMounted, state[currentKey]),
              };
            },
            {},
          )}
        />
      </div>
    </ClientOnly>
  );
};
