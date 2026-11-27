<template>
  <Page
    heading="Accessibility audits"
    lead="Our accessibility specialists test your service with assistive technology and against WCAG 2.1 AA."
  >
    <PageSection anchor="how-we-test" heading="How we test">
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>Automated checks across every page of the service</Text></li>
        <li><Text>Manual testing with screen readers, magnification and keyboard only</Text></li>
        <li><Text>Sessions with people who use assistive technology every day</Text></li>
      </ul>
    </PageSection>

    <PageSection anchor="after-the-audit" heading="After the audit">
      <Paragraph>
        Issues that come from Design System components are fixed centrally. Issues specific to your service come with
        clear guidance on how to fix them.
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
