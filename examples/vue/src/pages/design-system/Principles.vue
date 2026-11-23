<template>
  <Page
    heading="Principles"
    lead="Four principles guide every component and pattern in the Design System. They apply equally to public-facing services and to internal tools."
  >
    <PageSection anchor="citizen-centred" heading="Citizen-centred design">
      <Paragraph>
        Prioritise the needs, expectations and experiences of the people who use the service throughout the design
        process.
      </Paragraph>
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>Research continuously to understand the diverse needs of users</Text></li>
        <li><Text>Build services that are intuitive and easy to navigate</Text></li>
        <li><Text>Use clear and simple language that everyone can understand</Text></li>
      </ul>
    </PageSection>

    <PageSection anchor="accessibility" heading="Accessibility and inclusivity">
      <Paragraph>Design services that work for everyone, regardless of their abilities or circumstances.</Paragraph>
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>Meet WCAG 2.1 AA as a minimum</Text></li>
        <li><Text>Test with people who use assistive technology</Text></li>
        <li><Text>Offer alternative formats and support for different needs</Text></li>
      </ul>
    </PageSection>

    <PageSection anchor="consistency" heading="Consistency and reliability">
      <Paragraph>Maintain a consistent and reliable experience across every government digital service.</Paragraph>
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>Use one design system for visual design, interaction and terminology</Text></li>
        <li><Text>Build on secure and dependable technology</Text></li>
        <li><Text>Review services regularly to keep standards high</Text></li>
      </ul>
    </PageSection>

    <PageSection anchor="transparency" heading="Transparency and trust">
      <Paragraph>Be open and honest in the way services are designed and delivered.</Paragraph>
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>Explain the purpose, benefits and limits of each service</Text></li>
        <li><Text>Say plainly how personal data is collected and used</Text></li>
        <li><Text>Keep content accurate and up to date</Text></li>
      </ul>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import { Paragraph, Text } from '@ogcio/design-system-vue';
import Page from '../../components/Page.vue';
import PageSection from '../../components/PageSection.vue';
</script>
