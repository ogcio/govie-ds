<template>
  <CoreHeaderNav v-bind="coreAttrs">
    <slot />
  </CoreHeaderNav>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue';
import CoreHeaderNav, { type Props as CoreProps } from './atoms/header/HeaderNav.vue';
import { useCoreAttrs } from './attrs';

defineOptions({ inheritAttrs: false });

// The atom requires `ariaLabel`, and vue-tsc does not count the `aria-label` attribute towards it.
// TODO: replace the cast with a required `label` prop once the atom's `ariaLabel` is optional.
const coreAttrs = useCoreAttrs() as ComputedRef<CoreProps>;
</script>
