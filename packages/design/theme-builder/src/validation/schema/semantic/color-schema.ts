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
          inverted: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.inverted`),
            name: 'inverted',
          }),
          primary: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.primary`),
            name: 'primary',
          }),
          secondary: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.secondary`),
            name: 'secondary',
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
          subtle: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.subtle`),
            name: 'subtle',
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
          muted: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.muted`),
            name: 'muted',
          }),
          strong: createTokenSchema({
            type: 'color',
            valueSchema: createAliasSchema(`${namePrefix}.neutral.strong`),
            name: 'strong',
          }),
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
        primary: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(
            `${namePrefix}.icon.system.neutral.primary`,
          ),
          name: 'primary',
        }),
        inverted: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(
            `${namePrefix}.icon.system.neutral.inverted`,
          ),
          name: 'inverted',
        }),
        secondary: createTokenSchema({
          type: 'color',
          valueSchema: createAliasSchema(
            `${namePrefix}.icon.system.neutral.secondary`,
          ),
          name: 'secondary',
        }),
        interactive: z
          .object({
            disabled: createTokenSchema({
              type: 'color',
              valueSchema: createAliasSchema(
                `${namePrefix}.icon.system.neutral.interactive.disabled`,
              ),
              name: 'disabled',
            }),
            selected: createTokenSchema({
              type: 'color',
              valueSchema: createAliasSchema(
                `${namePrefix}.icon.system.neutral.interactive.selected`,
              ),
              name: 'selected',
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
            })
            .strict(),
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
