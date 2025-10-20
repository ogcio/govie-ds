'use client';

import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { ClientOnly } from '../common/client-only';
import { DownloadTheme } from './download-theme';
import { Heading, Paragraph } from '@ogcio/design-system-react';
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
  const nested = shades[key];
  if (nested) {
    for (const scale of SCALES) {
      map[scale] = nested[scale];
    }
    return map;
  }
  return {};
}

function ColorRamp({
  activeKey,
  shades,
}: {
  activeKey: ColorKey;
  shades: any;
}) {
  const data = useMemo(
    () => extractShadesForKey(activeKey, shades),
    [activeKey, shades],
  );

  const hasAny = SCALES.some((s) => data?.[s]);
  if (!hasAny) return null;

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
        <Heading as="h5">How color shades work?</Heading>
        <Paragraph className="text-md text-neutral-600 -mt-2">
          The color you pick here is a <i>brand seed</i>. We use it to generate
          a full ramp from <b>50</b> (lightest) to <b>950</b> (darkest) for the
          selected group. Your pick does <u>not</u> automatically become{' '}
          <code>primary-500</code> (or any fixed step); instead, it’s positioned
          within the ramp and the named steps (e.g. <code>primary-500</code>)
          come from the generated shades.
        </Paragraph>
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

          <ColorRamp activeKey={'primary'} shades={colorShades} />

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
