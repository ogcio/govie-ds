<template>
  <Article
    heading="Accessibility audits now available to every department"
    date="2026-09-12"
    lead="Any public body can now request a free accessibility audit of a service built on the Design System."
  >
    <PageSection anchor="audits" heading="Free audits for public bodies">
      <Paragraph>
        Our Accessibility and Inclusion Unit now offers audits to every public body. Each audit combines automated
        checks, manual testing and sessions with people who use assistive technology.
      </Paragraph>
      <RouterLink v-slot="{ href, navigate }" to="/services/accessibility-audit" custom>
        <Link :href="href" class="self-start font-bold" @click="navigate">Read about accessibility audits</Link>
      </RouterLink>
    </PageSection>
  </Article>
</template>

<script setup lang="ts">
import { Link, Paragraph } from '@ogcio/design-system-vue';
import Article from '../../components/Article.vue';
import PageSection from '../../components/PageSection.vue';
</script>
