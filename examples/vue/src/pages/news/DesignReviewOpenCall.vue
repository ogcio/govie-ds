<template>
  <Article
    heading="Open call: put your service forward for a design review"
    date="2026-07-22"
    lead="We are inviting delivery teams to put their services forward for a service design review."
  >
    <PageSection anchor="open-call" heading="How to take part">
      <Paragraph>
        Teams preparing to launch or rebuild a service can apply for a review by the Service Standards Office. Reviews
        take two weeks and finish with a written report and a follow-up session.
      </Paragraph>
      <RouterLink v-slot="{ href, navigate }" to="/services/design-review" custom>
        <Link :href="href" class="self-start font-bold" @click="navigate">Read about service design reviews</Link>
      </RouterLink>
    </PageSection>
  </Article>
</template>

<script setup lang="ts">
import { Link, Paragraph } from '@ogcio/design-system-vue';
import Article from '../../components/Article.vue';
import PageSection from '../../components/PageSection.vue';
</script>
