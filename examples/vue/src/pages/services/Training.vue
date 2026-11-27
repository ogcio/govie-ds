<template>
  <Page heading="Training" lead="Practical training helps your team make the most of the Design System from day one.">
    <PageSection anchor="courses" heading="Courses">
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>Introduction to the Design System, for everyone on the team</Text></li>
        <li><Text>Building with the component libraries, for developers</Text></li>
        <li><Text>Designing with the Figma library, for designers</Text></li>
        <li><Text>Writing for government services, for content designers</Text></li>
      </ul>
    </PageSection>

    <PageSection anchor="format" heading="Format">
      <Paragraph>
        Courses run online or in person and last half a day. We can also run a tailored workshop for your team.
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
