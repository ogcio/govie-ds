'use client';

import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { ClientOnly } from '../common/client-only';
import { DownloadTheme } from './download-theme';
import { Blockquote, Heading, Paragraph } from '@ogcio/design-system-react';
import { ThemePreview } from './theme-preview';
import {
  COLOR_GROUPS,
  COLOR_KEYS,
  generateShades,
  resolveColor,
} from '@/lib/theme-utils';

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

function colorReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_COLOR':
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
}

const SCALES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function extractShadesForKey(key: string, shades: any) {
  const map: any = {};
  const activeKey = shades[key];
  if (activeKey) {
    for (const scale of SCALES) {
      map[scale] = activeKey[scale];
    }
    return map;
  }
  return {};
}

function ColorRamp({ shades }: { shades: any }) {
  const data = useMemo(() => extractShadesForKey('primary', shades), [shades]);

  const hasAny = SCALES.some((scale) => data?.[scale]);

  if (!hasAny) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between">
        <Heading as="h4" className="m-0">
          Shades
        </Heading>
      </div>
      <div
        className="
          mt-3 grid
          grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12
          gap-3
        "
      >
        {SCALES.map((scale) => {
          const hex = data[scale];
          if (!hex) return null;
          return (
            <div
              key={scale}
              className="
                relative flex flex-col items-start rounded-lg border
                shadow-sm overflow-hidden
              "
            >
              <div className="h-16 w-full" style={{ backgroundColor: hex }} />
              <div className="w-full px-2 py-1 flex items-center justify-center">
                <span className="text-xs font-medium">{scale}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const ThemeBuilder = () => {
  const [state, dispatch] = useReducer(colorReducer, initialState);
  const [active, setActive] = useState<ColorKey | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const colorShades = useMemo(
    () =>
      Object.entries(state).reduce(
        (acc, [key, value]) => ({
          ...acc,
          ...generateShades(key, resolveColor(isMounted, value as any)),
        }),
        {},
      ),
    [state, isMounted],
  );

  useEffect(() => {
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
    <ClientOnly onClientReady={setIsMounted}>
      <div className="flex gap-7 flex-col gi-not-prose text-black">
        <Blockquote cite="https://example.com/source">
          <b>How color shades work. </b> <br />
          <Paragraph>
            Your selected color is used as a brand seed to generate a full color
            ramp (50 (lightest) to 950 (darkest). Component tokens pull from
            defined steps in the generated ramp (e.g., primary-500 or
            primary-700), so the color applied to components may differ from
            your original seed. This ensures consistent contrast and
            accessibility throughout the design system.
          </Paragraph>
        </Blockquote>

        <Heading as="h3">Choose the Brand color</Heading>
        <div className="flex flex-col mb-8">
          <div className="flex gap-4 flex-col">
            {COLOR_GROUPS.map((group) => (
              <div key={group.label}>
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

          <ColorRamp shades={colorShades} />

          <div className="flex flex-col gap-5 ">
            <Heading as="h3" className="mt-8 mb-0">
              Example
            </Heading>
            <ThemePreview colors={colorShades} />
          </div>
          <Paragraph className="gi-not-prose my-7">
            Once you are done, click the <b>Download</b> button to export the
            complete theme as a CSS file, ready to use in your project.
          </Paragraph>
          <DownloadTheme colors={colorShades} />
        </div>
      </div>
    </ClientOnly>
  );
};
