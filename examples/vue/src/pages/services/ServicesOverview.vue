<template>
  <Page
    heading="Services"
    lead="We support departments, agencies and local authorities at every step of moving their digital services onto the Design System."
  >
    <PageSection anchor="our-services" heading="Our services">
      <ul class="space-y-4">
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/services/onboarding" custom>
            <Link :href="href" class="font-bold" @click="navigate">Onboarding</Link>
          </RouterLink>
          <Paragraph>A guided start for your team, from the first workshop to the first release.</Paragraph>
        </li>
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/services/design-review" custom>
            <Link :href="href" class="font-bold" @click="navigate">Design reviews</Link>
          </RouterLink>
          <Paragraph>A review of your service against government design standards.</Paragraph>
        </li>
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/services/accessibility-audit" custom>
            <Link :href="href" class="font-bold" @click="navigate">Accessibility audits</Link>
          </RouterLink>
          <Paragraph>Expert testing against WCAG 2.1 AA, with a clear plan to fix what we find.</Paragraph>
        </li>
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/services/training" custom>
            <Link :href="href" class="font-bold" @click="navigate">Training</Link>
          </RouterLink>
          <Paragraph>Practical sessions for designers, developers and content designers.</Paragraph>
        </li>
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/services/support" custom>
            <Link :href="href" class="font-bold" @click="navigate">Support</Link>
          </RouterLink>
          <Paragraph>Answers, advice and component requests while you build.</Paragraph>
        </li>
      </ul>
    </PageSection>

    <PageSection anchor="who-can-use" heading="Who can use these services">
      <Paragraph>
        Our services are free for every public service body in Ireland. Priority is given to services with a large
        number of users and to services that are being rebuilt.
      </Paragraph>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import { Link, Paragraph } from '@ogcio/design-system-vue';
import Page from '../../components/Page.vue';
import PageSection from '../../components/PageSection.vue';
</script>
