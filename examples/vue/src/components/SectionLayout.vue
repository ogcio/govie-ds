<template>
  <Container class="py-8 lg:py-12">
    <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="8">
      <Grid :size="{ base: 4, md: 8, lg: 9 }">
        <RouterView />
      </Grid>
    </Grid>
  </Container>
</template>

<script setup lang="ts">
import { Container, Grid } from '@ogcio/design-system-vue';
import { provide } from 'vue';
import { sectionLayoutKey } from './sections';

provide(sectionLayoutKey, true);
</script>
