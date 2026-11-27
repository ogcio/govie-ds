<template>
  <Page
    heading="Tools and frameworks"
    lead="The Design System meets your team where it already works. Every implementation shares the same tokens and the same visual result."
  >
    <PageSection anchor="libraries" heading="Component libraries">
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>HTML and CSS for server-rendered websites and content management systems</Text></li>
        <li><Text>React for single-page applications and Next.js websites</Text></li>
        <li><Text>Angular for enterprise applications</Text></li>
        <li><Text>Vue for teams that build with Vue, including this website</Text></li>
      </ul>
    </PageSection>

    <PageSection anchor="design-tools" heading="Design tools">
      <Paragraph>Designers work from a Figma library of foundations and components.</Paragraph>
    </PageSection>

    <PageSection anchor="tokens" heading="Design tokens and themes">
      <Paragraph>
        Colour, typography and spacing are defined once as design tokens. Themes let a department adapt the system to
        its needs without losing the shared government identity.
      </Paragraph>
      <ul class="space-y-4">
        <li>
          <Link href="https://ds.services.gov.ie/" target="_blank" rel="noreferrer noopener" class="font-bold">
            Browse the components on the Design System website (opens in a new tab)
          </Link>
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
