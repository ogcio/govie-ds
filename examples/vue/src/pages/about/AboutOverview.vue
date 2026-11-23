<template>
  <Page
    heading="About us"
    lead="The Department of Engagement helps the public service deliver digital services that people recognise, trust and can use without help."
  >
    <PageSection anchor="mission" heading="Our mission">
      <Paragraph>
        We believe that every person in Ireland deserves public services that are simple, accessible and consistent,
        whichever department provides them.
      </Paragraph>
      <Paragraph>
        We work with public bodies to adopt the Government of Ireland Design System, to raise the quality of their
        services and to share what works across government.
      </Paragraph>
    </PageSection>

    <PageSection anchor="what-we-do" heading="What we do">
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>Support departments in moving their services to the Design System</Text></li>
        <li><Text>Set and assure standards for government digital services</Text></li>
        <li><Text>Champion accessibility and the use of plain language</Text></li>
        <li><Text>Bring delivery teams together to share knowledge</Text></li>
      </ul>
    </PageSection>

    <PageSection anchor="demonstration" heading="A demonstration department">
      <InsetText>
        <Paragraph>
          The Department of Engagement is fictional. This website demonstrates how a department website looks and works
          when it is built with the Government of Ireland Design System for Vue.
        </Paragraph>
      </InsetText>
    </PageSection>
  </Page>
</template>

<script setup lang="ts">
import { InsetText, Paragraph, Text } from '@ogcio/design-system-vue';
import Page from '../../components/Page.vue';
import PageSection from '../../components/PageSection.vue';
</script>
