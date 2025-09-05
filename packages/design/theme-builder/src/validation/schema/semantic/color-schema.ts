import { z } from 'zod';
import { createAliasSchema, createTokenSchema } from '../shared.js';

const colorStateKeys = [
  'default',
  'disabled',
  'hover',
  'focus',
  'visited',
  'selected',
];

const createInteractionStates = (name: string) =>
  z
    .object(
      Object.fromEntries(
        colorStateKeys.map((state) => [
          state,
          createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(name),
            name: state,
          }),
        ]),
      ),
    )
    .partial()
    .strict();

function createToneSchema(namePrefix: string, tones: string[] = []) {
  const commonTones = ['primary-outline', 'dark-outline', 'light-outline'];
  return z
    .object(
      Object.fromEntries(
        [...commonTones, ...tones].map((tone) => [
          tone,
          createInteractionStates(`${namePrefix}.${tone}`),
        ]),
      ),
    )
    .strict();
}

function createIntentSchema(
  namePrefix: string,
  intents: string[] = [],
  ignoreCommon = false,
) {
  const commonIntents = ignoreCommon
    ? []
    : ['info', 'success', 'error', 'warning'];

  return z
    .object(
      Object.fromEntries(
        [...commonIntents, ...intents].map((intent) => [
          intent,
          z.object({
            default: createTokenSchema({
              type: 'color',
              valueSchema: createAliasSchema(`${namePrefix}.${intent}.default`),
              name: namePrefix,
              optional: true,
            }),
          }),
        ]),
      ),
    )
    .strict();
}

function createTextSystemSchema(namePrefix: string) {
  return z
    .object({
      neutral: z
        .object({
          default: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.default`),
            name: 'default',
          }),
          muted: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.muted`),
            name: 'muted',
          }),
          interactive: z
            .object({
              default: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.default`,
                ),
                name: 'default',
              }),
              muted: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.muted`,
                ),
                name: 'muted',
              }),
              disabled: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.disabled`,
                ),
                name: 'disabled',
              }),
              'disabled-surface': createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.disabled-surface`,
                ),
                name: 'disabled-surface',
              }),
              hover: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.hover`,
                ),
                name: 'hover',
              }),
            })
            .strict(),
        })
        .strict(),
    })
    .strict();
}

function createSurfaceSystemSchema(namePrefix: string) {
  return z
    .object({
      neutral: z
        .object({
          default: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.default`),
            name: 'default',
          }),
          layer1: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.layer1`),
            name: 'layer1',
          }),
          layer2: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.layer2`),
            name: 'layer2',
          }),
          layer5: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.layer5`),
            name: 'layer5',
          }),
          layer11: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.layer11`),
            name: 'layer11',
          }),
          interactive: z
            .object({
              disabled: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.disabled`,
                ),
                name: 'disabled',
              }),
              hover: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.hover`,
                ),
                name: 'hover',
              }),
              selected: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.selected`,
                ),
                name: 'selected',
              }),
              'selected-disabled': createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.selected-disabled`,
                ),
                name: 'selected-disabled',
              }),
              'selected-subtle': createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.selected-subtle`,
                ),
                name: 'selected-subtle',
              }),
            })
            .strict(),
        })
        .strict(),
      primary: z
        .object({
          default: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema('surface.system.primary.default'),
            name: 'default',
          }),
          subtle: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema('surface.system.primary.subtle'),
            name: 'subtle',
          }),
          accent: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema('surface.system.primary.accent'),
            name: 'accent',
          }),
        })
        .strict(),
    })
    .strict();
}

function createIconSystemSchema(namePrefix: string) {
  return z.object({
    neutral: z
      .object({
        default: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(
            `${namePrefix}.icon.system.neutral.default`,
          ),
          name: 'default',
        }),
        muted: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(
            `${namePrefix}.icon.system.neutral.muted`,
          ),
          name: 'secondary',
        }),
        interactive: z
          .object({
            default: createTokenSchema({
              type: 'color',
              valueSchema: createAliasSchema(
                `${namePrefix}.icon.system.neutral.interactive.default`,
              ),
              name: 'default',
            }),
            hover: createTokenSchema({
              type: 'color',
              valueSchema: createAliasSchema(
                `${namePrefix}.icon.system.neutral.interactive.hover`,
              ),
              name: 'hover',
            }),
            focus: createTokenSchema({
              type: 'color',
              valueSchema: createAliasSchema(
                `${namePrefix}.icon.system.neutral.interactive.focus`,
              ),
              name: 'focus',
            }),
            selected: createTokenSchema({
              type: 'color',
              valueSchema: createAliasSchema(
                `${namePrefix}.icon.system.neutral.interactive.selected`,
              ),
              name: 'selected',
            }),
            disabled: createTokenSchema({
              type: 'color',
              valueSchema: createAliasSchema(
                `${namePrefix}.icon.system.neutral.interactive.disabled`,
              ),
              name: 'disabled',
            }),
            'selected-disabled': createTokenSchema({
              type: 'color',
              valueSchema: createAliasSchema(
                `${namePrefix}.icon.system.neutral.interactive.selected-disabled`,
              ),
              name: 'selected-disabled',
            }),
          })
          .strict(),
      })
      .strict(),
  });
}

function createBorderSystemSchema(namePrefix: string) {
  return z
    .object({
      neutral: z
        .object({
          default: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.default`),
            name: 'default',
          }),
          muted: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.muted`),
            name: 'muted',
          }),
          subtle: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.subtle`),
            name: 'subtle',
          }),
          interactive: z
            .object({
              default: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.default`,
                ),
                name: 'default',
              }),
              muted: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.muted`,
                ),
                name: 'muted',
              }),
              hover: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.hover`,
                ),
                name: 'hover',
              }),
              'hover-muted': createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.hover-muted`,
                ),
                name: 'hover',
              }),
              disabled: createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.disabled`,
                ),
                name: 'disabled',
              }),
              'disabled-surface': createTokenSchema({
                type: 'color',
                valueSchema: createAliasSchema(
                  `${namePrefix}.neutral.interactive.disabled-surface`,
                ),
                name: 'disabled-surface',
              }),
            })
            .strict(),
        })
        .strict(),
    })
    .strict();
}

export const colorSchema = z
  .object({
    text: z.object({
      tone: createToneSchema('text.tone', [
        'primary-fill',
        'dark-fill',
        'light-fill',
        'primary-outline',
        'primary-flat',
        'dark-outline',
        'light-outline',
        'dark-flat',
        'light-flat',
        'convention',
        'dark',
        'light',
      ]),
      intent: createIntentSchema('text.intent'),
      system: createTextSystemSchema('text.system'),
    }),
    surface: z.object({
      tone: createToneSchema('surface.tone', [
        'primary-fill',
        'dark-fill',
        'light-fill',
        'primary-outline',
        'primary-flat',
        'dark-outline',
        'light-outline',
        'dark-flat',
        'light-flat',
      ]),
      intent: createIntentSchema('surface.intent', ['focus']),
      system: createSurfaceSystemSchema('surface.system'),
    }),
    icon: z.object({
      tone: createToneSchema('icon.tone', [
        'primary-fill',
        'dark-fill',
        'light-fill',
        'primary-outline',
        'primary-flat',
        'dark-outline',
        'light-outline',
        'dark-flat',
        'light-flat',
        'convention',
        'dark',
        'light',
      ]),
      intent: createIntentSchema('icon.intent'),
      system: createIconSystemSchema('icon.system'),
    }),
    border: z.object({
      tone: createToneSchema('border.tone', [
        'convention',
        'dark',
        'light',
        'primary-accent',
      ]),
      intent: createIntentSchema('border.intent', ['focus']),
      system: createBorderSystemSchema('border.system'),
    }),
    shadow: z.object({
      intent: createIntentSchema('shadow.intent', ['focus'], true),
    }),
  })
  .strict();
