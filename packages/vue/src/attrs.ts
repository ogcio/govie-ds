import { computed, normalizeClass, useAttrs, type ComputedRef } from 'vue';

export function useCoreAttrs(): ComputedRef<Record<string, unknown>> {
  const attrs = useAttrs();

  return computed(() => {
    // `class` is mapped to the atom's `className` so `tv` merges it with the default classes.
    // `styles` is dropped because Vue's `style` already falls through to the atom's root element.
    const { class: vueClass, styles: _styles, ...rest } = attrs;
    return { ...rest, className: normalizeClass(vueClass) };
  });
}
