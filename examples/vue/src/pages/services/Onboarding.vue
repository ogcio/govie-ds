<template>
  <Page
    heading="Onboarding"
    lead="Onboarding gives your team everything it needs to start building with the Design System, with our team alongside you for the first release."
  >
    <PageSection anchor="what-happens" heading="What happens">
      <ol class="list-decimal pl-6 space-y-2">
        <li><Text>An introductory workshop with your product, design and engineering leads</Text></li>
        <li><Text>A review of your current service and a plan for the first migration</Text></li>
        <li><Text>Hands-on pairing while your team builds the first pages</Text></li>
        <li><Text>A release review before your service goes live</Text></li>
      </ol>
    </PageSection>

    <PageSection anchor="how-long" heading="How long it takes">
      <Paragraph>
        Most teams are ready to release their first pages on the Design System within six to eight weeks of the
        introductory workshop.
      </Paragraph>
    </PageSection>

    <PageSection anchor="book" heading="Book a session">
      <Paragraph>Tell us about your service and your team, and we will arrange an introductory workshop.</Paragraph>
      <ul class="space-y-4">
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/contact" custom>
            <Link :href="href" class="font-bold" @click="navigate">Contact us</Link>
          </RouterLink>
        </li>
      </ul>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import { Link, Paragraph, Text } from '@ogcio/design-system-vue';
import Page from '../../components/Page.vue';
import PageSection from '../../components/PageSection.vue';
</script>
