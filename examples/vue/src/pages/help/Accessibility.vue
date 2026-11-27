<template>
  <Page heading="Accessibility statement" lead="We want as many people as possible to be able to use this website.">
    <PageSection anchor="standards" heading="Standards">
      <Paragraph>
        This website is built with components from the Government of Ireland Design System, which are designed to meet
        WCAG 2.1 AA.
      </Paragraph>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import { Paragraph } from '@ogcio/design-system-vue';
import Page from '../../components/Page.vue';
import PageSection from '../../components/PageSection.vue';
</script>
