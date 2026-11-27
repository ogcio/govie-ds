<template>
  <Page
    heading="Strategy"
    lead="Our strategy supports Connecting Government 2030, the digital and ICT strategy for the Irish public service, and its ambition of digital government for all."
  >
    <PageSection anchor="goals" heading="Our goals">
      <ol class="list-decimal pl-6 space-y-2">
        <li><Text>Every new government service is built on the Design System</Text></li>
        <li><Text>Every service meets WCAG 2.1 AA before it launches</Text></li>
        <li><Text>People can complete government tasks online without help</Text></li>
        <li><Text>Departments share components and patterns instead of rebuilding them</Text></li>
      </ol>
    </PageSection>

    <PageSection anchor="user-first" heading="User first">
      <Paragraph>
        We take a user-first and business-first approach, so that digital services work for the people and the
        businesses who rely on them.
      </Paragraph>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import { Paragraph, Text } from '@ogcio/design-system-vue';
import Page from '../../components/Page.vue';
import PageSection from '../../components/PageSection.vue';
</script>
