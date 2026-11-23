<template>
  <Page
    heading="Help"
    lead="Find out how this website works, how we make it accessible and how we handle your information."
  >
    <PageSection anchor="topics" heading="Help topics">
      <ul class="space-y-4">
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/help/accessibility" custom>
            <Link :href="href" class="font-bold" @click="navigate">Accessibility statement</Link>
          </RouterLink>
          <Paragraph>How accessible this website is.</Paragraph>
        </li>
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/help/privacy" custom>
            <Link :href="href" class="font-bold" @click="navigate">Privacy notice</Link>
          </RouterLink>
          <Paragraph>What information we collect and why.</Paragraph>
        </li>
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/help/cookies" custom>
            <Link :href="href" class="font-bold" @click="navigate">Cookies</Link>
          </RouterLink>
          <Paragraph>Cookies on this website.</Paragraph>
        </li>
      </ul>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import { Link, Paragraph } from '@ogcio/design-system-vue';
import Page from '../../components/Page.vue';
import PageSection from '../../components/PageSection.vue';
</script>
