import type { ComponentAnnotations, Renderer, StoryAnnotations } from 'storybook/internal/csf';

export type Story<T> = StoryAnnotations<Renderer, T>;

export type Meta<T> = ComponentAnnotations<Renderer, T>;
