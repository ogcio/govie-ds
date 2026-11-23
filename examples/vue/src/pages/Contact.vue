<template>
  <Container class="py-8 lg:py-12">
    <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="8">
      <Grid :size="{ base: 4, md: 8, lg: 8 }" class="mx-auto">
        <Page
          heading="Contact"
          lead="Get in touch with the Department of Engagement about onboarding, reviews, audits or training."
        >
          <PageSection anchor="email" heading="Email">
            <Paragraph>
              Email the team at
              <Link href="mailto:hello@engagement.example">hello@engagement.example</Link>
              and we will reply within two working days.
            </Paragraph>
          </PageSection>

          <PageSection anchor="opening-hours" heading="Opening hours">
            <Paragraph>Monday to Friday, 9am to 5pm, except public holidays.</Paragraph>
          </PageSection>

          <PageSection anchor="demonstration" heading="About this contact page">
            <InsetText>
              <Paragraph>
                This is a demonstration website. Messages sent to the example address are not received by anyone.
              </Paragraph>
            </InsetText>
          </PageSection>
        </Page>
      </Grid>
    </Grid>
  </Container>
</template>

<script setup lang="ts">
import { Container, Grid, InsetText, Link, Paragraph } from '@ogcio/design-system-vue';
import Page from '../components/Page.vue';
import PageSection from '../components/PageSection.vue';
</script>
