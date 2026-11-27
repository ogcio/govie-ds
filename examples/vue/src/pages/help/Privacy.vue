<template>
  <Page heading="Privacy notice" lead="This demonstration website does not collect any personal information.">
    <PageSection anchor="what-we-collect" heading="What we collect">
      <Paragraph>We do not ask for, store or share any personal information on this website.</Paragraph>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import { Paragraph } from '@ogcio/design-system-vue';
import Page from '../../components/Page.vue';
import PageSection from '../../components/PageSection.vue';
</script>
