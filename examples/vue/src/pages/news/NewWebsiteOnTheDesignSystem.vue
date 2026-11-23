<template>
  <Article
    heading="Department of Engagement launches its new website on the Design System"
    date="2026-10-14"
    lead="Our new website is built entirely with the Vue component library of the Government of Ireland Design System."
  >
    <PageSection anchor="new-website" heading="A website that looks like government">
      <Paragraph>
        The Department of Engagement has launched its new website, built from the ground up on the Government of Ireland
        Design System.
      </Paragraph>
      <Paragraph>
        The header, navigation, typography, layout and footer all come from the Vue component library. Visitors who know
        other government websites will feel at home straight away.
      </Paragraph>
    </PageSection>
    <PageSection anchor="what-changed" heading="What has changed">
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>The familiar government header and footer on every page</Text></li>
        <li><Text>Section navigation and breadcrumbs that show where you are</Text></li>
        <li><Text>Pages that adapt to phones, tablets and desktops</Text></li>
        <li><Text>Accessible components tested against WCAG 2.1 AA</Text></li>
      </ul>
    </PageSection>
  </Article>
</template>

<script setup lang="ts">
import { Paragraph, Text } from '@ogcio/design-system-vue';
import Article from '../../components/Article.vue';
import PageSection from '../../components/PageSection.vue';
</script>
