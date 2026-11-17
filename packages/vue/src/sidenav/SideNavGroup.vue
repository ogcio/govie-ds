<template>
  <CoreSideNavGroup :open="open" :list-id="ariaControls" :aria-hidden="ariaHidden">
    <template #trigger>
      <CoreSideNavItemButton
        v-bind="coreAttrs"
        :aria-hidden="ariaHidden"
        :disabled="disabled"
        :aria-expanded="!!open"
        :aria-controls="ariaControls"
        :on-click="toggle"
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
import type { Props as ItemButtonProps } from '../atoms/sidenav/SideNavItemButton.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = {
  /** Whether the nested list is shown. Use `v-model:open`, or leave it out to let the group manage itself. */
  open?: boolean;
  disabled?: boolean;
  /** Also used as the `id` of the nested list. */
  ariaControls?: string;
  ariaHidden?: ItemButtonProps['ariaHidden'];
};

// `open` is declared by `defineModel` below, so it is left out here to avoid declaring it twice.
withDefaults(defineProps<Omit<Props, 'open'>>(), {
  disabled: false,
  ariaControls: undefined,
  ariaHidden: undefined,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
}>();

const coreAttrs = useCoreAttrs();

const open = defineModel<boolean>('open', { default: false });

const toggle = (event: MouseEvent) => {
  emit('click', event);
  open.value = !open.value;
};
</script>
