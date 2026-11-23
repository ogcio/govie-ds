<template>
  <Page heading="Support" lead="Delivery teams can reach our team while they build, whatever stage the service is at.">
    <PageSection anchor="how-to-get-help" heading="How to get help">
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>Ask questions in the shared support channel</Text></li>
        <li><Text>Join the fortnightly drop-in sessions</Text></li>
        <li><Text>Request a new component or a change to an existing one</Text></li>
      </ul>
    </PageSection>

    <PageSection anchor="response-times" heading="Response times">
      <Paragraph>We answer support questions within two working days.</Paragraph>
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
