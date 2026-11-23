<template>
  <Page
    heading="Design reviews"
    lead="A design review checks that your service meets government design standards before it reaches the public."
  >
    <PageSection anchor="what-we-review" heading="What we review">
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>Use of the Design System components and patterns</Text></li>
        <li><Text>Clarity of content and plain English</Text></li>
        <li><Text>The journey through the service, from start page to confirmation</Text></li>
        <li><Text>Consistency with other government services</Text></li>
      </ul>
    </PageSection>

    <PageSection anchor="outcome" heading="What you receive">
      <Paragraph>
        You receive a written report with prioritised recommendations, and a follow-up session to agree next steps.
      </Paragraph>
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
