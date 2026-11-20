<template>
  <CoreSideNav v-bind="{ ...coreAttrs, id, ariaLabel, ariaLabelledBy, dataTestId }">
    <slot />
  </CoreSideNav>
</template>

<script setup lang="ts">
import CoreSideNav from '../atoms/sidenav/SideNav.vue';
import type { Props as CoreProps } from '../atoms/sidenav/SideNav.vue';
import { useCoreAttrs } from '../attrs.ts';

defineOptions({ inheritAttrs: false });

export type Props = Omit<CoreProps, 'className' | 'styles'>;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
</script>
