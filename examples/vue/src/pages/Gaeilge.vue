<template>
  <Container class="py-8 lg:py-12">
    <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="8">
      <Grid :size="{ base: 4, md: 8, lg: 8 }" class="mx-auto">
        <Page
          lang="ga"
          heading="Gaeilge"
          home-label="Baile"
          breadcrumb-label="Conair nascleanúna"
          lead="Táimid tiomanta dár seirbhísí agus dár n-ábhar a chur ar fáil i nGaeilge agus i mBéarla."
        >
          <PageSection anchor="abhar-gaeilge" heading="Ábhar Gaeilge">
            <Paragraph>
              Tá leaganacha Gaeilge de leathanaigh an tsuímh ghréasáin seo á n-ullmhú. Níl aon téacs ionsuite sna
              comhpháirteanna Vue, mar sin úsáideann na leathanaigh Ghaeilge an leagan amach agus na comhpháirteanna
              céanna lena lipéid féin.
            </Paragraph>
          </PageSection>
        </Page>
      </Grid>
    </Grid>
  </Container>
</template>

<script setup lang="ts">
import { Container, Grid, Paragraph } from '@ogcio/design-system-vue';
import Page from '../components/Page.vue';
import PageSection from '../components/PageSection.vue';
</script>
