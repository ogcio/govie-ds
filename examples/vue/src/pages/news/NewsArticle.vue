<template>
  <Article :heading="heading" :date="date" :lead="lead">
    <PageSection v-for="section in sections" :key="section.anchor" :anchor="section.anchor" :heading="section.heading">
      <Paragraph v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</Paragraph>
      <ul v-if="section.list" class="list-disc pl-6 space-y-2">
        <li v-for="item in section.list" :key="item">
          <Text>{{ item }}</Text>
        </li>
      </ul>
      <RouterLink v-if="section.link" v-slot="{ href, navigate }" :to="section.link.url" custom>
        <Link :href="href" class="self-start font-bold" @click="navigate">{{ section.link.label }}</Link>
      </RouterLink>
    </PageSection>
  </Article>
</template>

<script setup lang="ts">
import { Link, Paragraph, Text } from '@ogcio/design-system-vue';
import Article from '../../components/Article.vue';
import PageSection from '../../components/PageSection.vue';
import type { NewsItem } from './news';

defineProps<NewsItem>();
</script>
