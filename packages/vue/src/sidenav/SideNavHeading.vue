<template>
  <li :class="listItemClass">
    <CoreSideNavHeading v-bind="{ ...coreAttrs, id, dataTestId }">
      <slot />
    </CoreSideNavHeading>
  </li>
</template>

<script setup lang="ts">
import CoreSideNavHeading from '../atoms/sidenav/SideNavHeading.vue';
import type { Props as CoreProps } from '../atoms/sidenav/SideNavHeading.vue';
import { headingListItemClasses } from '../atoms/sidenav/SideNavItem.styles';
import { useCoreAttrs } from '../attrs';

defineOptions({ inheritAttrs: false });

export type Props = Omit<CoreProps, 'className' | 'styles'>;

defineProps<Props>();

const coreAttrs = useCoreAttrs();
const listItemClass = headingListItemClasses();
</script>
