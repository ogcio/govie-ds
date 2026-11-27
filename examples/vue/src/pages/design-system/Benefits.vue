<template>
  <Page
    heading="Benefits"
    lead="Moving to the Design System changes how quickly your department can deliver, how much it costs to maintain your services, and how confident people feel when they use them."
  >
    <PageSection anchor="efficiency" heading="Efficiency">
      <Paragraph>
        Teams start from a complete suite of components, patterns and guidelines instead of designing and building the
        basics again. Effort goes into the parts of the service that are unique to your department.
      </Paragraph>
    </PageSection>

    <PageSection anchor="consistency" heading="Consistency">
      <Paragraph>
        A unified design language gives people the same experience across every service, so what they learn on one
        government website works on the next.
      </Paragraph>
    </PageSection>

    <PageSection anchor="accessibility" heading="Accessibility">
      <Paragraph>
        Components are built and tested against WCAG 2.1 AA. Your services inherit that work and every fix made
        centrally reaches all departments when they update.
      </Paragraph>
    </PageSection>

    <PageSection anchor="performance" heading="Performance">
      <Paragraph>
        Optimised components and assets keep pages fast, including on older devices and slower mobile connections.
      </Paragraph>
    </PageSection>

    <PageSection anchor="responsive" heading="Responsive by default">
      <Paragraph>
        Layouts and components adapt to every screen size, from a phone in a waiting room to a desktop in an office.
      </Paragraph>
    </PageSection>

    <PageSection anchor="compliance" heading="Compliance">
      <Paragraph>
        Following the Design System keeps services aligned with government standards on identity and accessibility,
        which makes assurance simpler and faster.
      </Paragraph>
      <ul class="space-y-4">
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/design-system/adoption" custom>
            <Link :href="href" class="font-bold" @click="navigate">Adoption</Link>
          </RouterLink>
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
