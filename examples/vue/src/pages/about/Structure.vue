<template>
  <Page
    heading="Structure"
    lead="The Department is organised into four divisions that work closely with delivery teams across the public service."
  >
    <PageSection anchor="digital-experience" heading="Digital Experience Division">
      <Paragraph>Leads onboarding for departments.</Paragraph>
    </PageSection>

    <PageSection anchor="accessibility-inclusion" heading="Accessibility and Inclusion Unit">
      <Paragraph>Carries out accessibility audits and promotes inclusive design across government.</Paragraph>
    </PageSection>

    <PageSection anchor="service-standards" heading="Service Standards Office">
      <Paragraph>Runs service design reviews.</Paragraph>
    </PageSection>

    <PageSection anchor="corporate-services" heading="Corporate Services">
      <Paragraph>Looks after finance, people and governance for the Department.</Paragraph>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import { Paragraph } from '@ogcio/design-system-vue';
import Page from '../../components/Page.vue';
import PageSection from '../../components/PageSection.vue';
</script>
