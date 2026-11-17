<template>
  <CoreSideNavGroup :open="open" :list-id="ariaControls" :aria-hidden="ariaHidden">
    <template #trigger>
      <CoreSideNavItemButton
        v-bind="{ ...coreAttrs, ariaHidden }"
        :disabled="disabled"
        :aria-expanded="!!open"
        :aria-controls="ariaControls"
        :on-click="onClick"
        :on-focus="(event: FocusEvent) => emit('focus', event)"
        :on-blur="(event: FocusEvent) => emit('blur', event)"
        :on-key-down="(event: KeyboardEvent) => emit('keydown', event)"
        :on-key-up="(event: KeyboardEvent) => emit('keyup', event)"
      >
        <slot name="label" />
      </CoreSideNavItemButton>
    </template>
    <template #actions>
      <slot name="actions" />
    </template>
    <slot />
  </CoreSideNavGroup>
</template>

<script setup lang="ts">
import CoreSideNavGroup from '../atoms/sidenav/SideNavGroup.vue';
import CoreSideNavItemButton from '../atoms/sidenav/SideNavItemButton.vue';
import type { Props as ButtonProps } from '../atoms/sidenav/SideNavItemButton.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  open?: boolean;
  disabled?: boolean;
  /** Also used as the `id` of the nested list. */
  ariaControls?: string;
  ariaHidden?: ButtonProps['ariaHidden'];
};

const props = withDefaults(defineProps<Props>(), {
  open: false,
  disabled: false,
  ariaControls: undefined,
  ariaHidden: undefined,
});

const emit = defineEmits<{
  /** Enables `v-model:open`. Emitted with the toggled value when the header is clicked. */
  'update:open': [open: boolean];
  click: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
}>();

const coreAttrs = useCoreAttrs();

// Controlled: the group never flips `open` itself, it asks the parent to via `update:open`.
const onClick = (event: MouseEvent) => {
  emit('click', event);
  emit('update:open', !props.open);
};
</script>
