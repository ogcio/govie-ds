import { Modifier, ModifierArguments } from '@popperjs/core/index.js';

export const createDynamicHeightModifier = (
  maxHeight?: number,
): Modifier<'dynamicHeight', any> => ({
  name: 'dynamicHeight',
  enabled: true,
  phase: 'main',
  fn({ state }: ModifierArguments<any>) {
    const popperRect = state.elements.popper.getBoundingClientRect();
    const placement = state.placement;
    const padding = 32;
    const isTop = placement.startsWith('top');

    const availableHeight = isTop
      ? popperRect.bottom - padding
      : window.innerHeight - popperRect.top - padding;

    const resolvedMaxHeight =
      typeof maxHeight === 'number' && availableHeight > maxHeight
        ? maxHeight
        : availableHeight;

    state.styles.popper = {
      ...state.styles.popper,
      overflowY: 'auto',
      maxHeight: `${resolvedMaxHeight}px`,
    };
  },
});
