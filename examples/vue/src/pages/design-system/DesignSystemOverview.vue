<template>
  <Page
    heading="Design System"
    lead="The Government of Ireland Design System gives every department the same trusted identity, the same accessible components and the same patterns, so people recognise an official service the moment they arrive."
  >
    <PageSection anchor="why-it-matters" heading="Why a single design matters">
      <Paragraph>
        People move between departments all the time: registering a birth, renewing a licence, applying for a grant.
        When every service looks and behaves differently, people have to learn each one from scratch, and it becomes
        harder to tell a genuine government website from an imitation.
      </Paragraph>
      <Paragraph>
        A shared design makes official services recognisable. The harp, the colours, the typography and the page layout
        tell people they are in the right place. Buttons, links and forms that behave the same way everywhere tell them
        what will happen next.
      </Paragraph>
    </PageSection>

    <PageSection anchor="trust" heading="Consistency builds trust">
      <Paragraph>
        Trust is earned through repetition. Each time a person completes a task on a government website that feels
        familiar and works as expected, their confidence in the next service grows.
      </Paragraph>
      <Paragraph>
        Consistency also protects people. A predictable visual identity makes it easier to spot phishing pages and
        fraudulent websites that try to imitate public services.
      </Paragraph>
    </PageSection>

    <PageSection anchor="what-you-get" heading="What your department gets">
      <ul class="list-disc pl-6 space-y-2">
        <li><Text>Guidelines for content, layout, accessibility and design patterns</Text></li>
        <li><Text>Design tokens for colour, typography and spacing, ready for any theme</Text></li>
        <li><Text>A Figma library of foundations and components</Text></li>
        <li><Text>Component libraries for HTML, React, Angular and Vue</Text></li>
        <li><Text>A dedicated team that onboards your department and supports your delivery</Text></li>
      </ul>
    </PageSection>

    <PageSection anchor="this-website" heading="About this website">
      <Paragraph>
        This website is built entirely with the Vue component library of the Design System. The header, navigation,
        typography, layout and footer all come from the public library, exactly as they would in your own application.
      </Paragraph>
      <ul class="space-y-4">
        <li>
          <Link href="https://ds.services.gov.ie/" target="_blank" rel="noreferrer noopener" class="font-bold">
            Read the Design System documentation (opens in a new tab)
          </Link>
        </li>
        <li>
          <RouterLink v-slot="{ href, navigate }" to="/design-system/benefits" custom>
            <Link :href="href" class="font-bold" @click="navigate">Benefits</Link>
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
