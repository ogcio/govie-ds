<template>
  <Article
    heading="Angular component library joins HTML, React and Vue"
    date="2026-09-30"
    lead="Teams that build with Angular can now use the same components as every other department, straight from the public library."
  >
    <PageSection anchor="announcement" heading="Four frameworks, one design">
      <Paragraph>
        Departments that build enterprise applications in Angular can now use the Design System directly in their code.
        The Angular library shares design tokens and styles with the HTML, React and Vue libraries, so every service
        looks the same whichever framework it uses.
      </Paragraph>
    </PageSection>
    <PageSection anchor="getting-started" heading="Getting started">
      <Paragraph>
        The library covers layout, typography, actions, header, footer and navigation. More components are being added.
      </Paragraph>
      <RouterLink v-slot="{ href, navigate }" to="/design-system/frameworks" custom>
        <Link :href="href" class="self-start font-bold" @click="navigate">See the tools and frameworks</Link>
      </RouterLink>
    </PageSection>
  </Article>
</template>

<script setup lang="ts">
import { Link, Paragraph } from '@ogcio/design-system-vue';
import Article from '../../components/Article.vue';
import PageSection from '../../components/PageSection.vue';
</script>
