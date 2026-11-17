<template>
  <CoreSideNav
    v-bind="coreAttrs"
    :id="id"
    :aria-label="ariaLabel"
    :ariaLabelledBy="ariaLabelledBy"
    :data-test-id="dataTestId"
  >
    <slot />
  </CoreSideNav>
</template>

<script setup lang="ts">
import CoreSideNav from '../atoms/sidenav/SideNav.vue';
import type { Props as CoreProps } from '../atoms/sidenav/SideNav.vue';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = Omit<CoreProps, 'className' | 'styles'>;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
