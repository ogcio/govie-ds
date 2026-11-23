<template>
  <Page
    heading="Adoption"
    lead="Most departments move to the Design System in five steps. Our team supports you through each of them."
  >
    <PageSection anchor="steps" heading="The five steps">
      <ol class="list-decimal pl-6 space-y-2">
        <li><Text>Discover: review your current services and agree priorities with our team</Text></li>
        <li><Text>Plan: choose the framework, the theme and the first service to migrate</Text></li>
        <li><Text>Build: replace custom components with the Design System, page by page</Text></li>
        <li><Text>Assure: complete an accessibility audit and a service design review</Text></li>
        <li><Text>Launch and improve: release, measure and feed back into the Design System</Text></li>
      </ol>
    </PageSection>

    <PageSection anchor="support" heading="Support along the way">
      <Paragraph>
        Each department gets a named contact in our team, access to training for designers and developers, and a channel
        to raise questions or request new components.
      </Paragraph>
      <ul class="space-y-4">
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/services/onboarding" custom>
            <Link :href="href" class="font-bold" @click="navigate">Onboarding</Link>
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
