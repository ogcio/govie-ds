<template>
  <Container class="py-8 lg:py-12">
    <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="8">
      <Grid :size="{ base: 4, md: 8, lg: 8 }" class="mx-auto">
        <Stack direction="column" :gap="8" align="stretch">
          <Stack direction="column" :gap="6" align="stretch">
            <H1 size="lg">News</H1>
            <Paragraph size="lg">Announcements and updates from the Department of Engagement.</Paragraph>

            <article>
              <Stack direction="column" :gap="2">
                <Text size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-10-14">14 October 2026</time>
                </Text>
                <H2 size="sm">
                  <RouterLink v-slot="{ href, navigate }" to="/news/new-website-on-the-design-system" custom>
                    <Link :href="href" @click="navigate">
                      Department of Engagement launches its new website on the Design System
                    </Link>
                  </RouterLink>
                </H2>
                <Paragraph>
                  Our new website is built entirely with the Vue component library of the Government of Ireland Design
                  System.
                </Paragraph>
              </Stack>
            </article>
            <Divider />
            <article>
              <Stack direction="column" :gap="2">
                <Text size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-09-30">30 September 2026</time>
                </Text>
                <H2 size="sm">
                  <RouterLink v-slot="{ href, navigate }" to="/news/angular-library-joins-the-design-system" custom>
                    <Link :href="href" @click="navigate">Angular component library joins HTML, React and Vue</Link>
                  </RouterLink>
                </H2>
                <Paragraph>
                  Teams that build with Angular can now use the same components as every other department, straight from
                  the public library.
                </Paragraph>
              </Stack>
            </article>
            <Divider />
            <article>
              <Stack direction="column" :gap="2">
                <Text size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-09-12">12 September 2026</time>
                </Text>
                <H2 size="sm">
                  <RouterLink v-slot="{ href, navigate }" to="/news/accessibility-audits-for-every-department" custom>
                    <Link :href="href" @click="navigate">Accessibility audits now available to every department</Link>
                  </RouterLink>
                </H2>
                <Paragraph>
                  Any public body can now request a free accessibility audit of a service built on the Design System.
                </Paragraph>
              </Stack>
            </article>
            <Divider />
            <article>
              <Stack direction="column" :gap="2">
                <Text size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-08-28">28 August 2026</time>
                </Text>
                <H2 size="sm">
                  <RouterLink v-slot="{ href, navigate }" to="/news/onboarding-milestone" custom>
                    <Link :href="href" @click="navigate">Public bodies complete Design System onboarding</Link>
                  </RouterLink>
                </H2>
                <Paragraph>
                  A new group of public bodies has completed onboarding and released their first pages on the Design
                  System.
                </Paragraph>
              </Stack>
            </article>
            <Divider />
            <article>
              <Stack direction="column" :gap="2">
                <Text size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-07-22">22 July 2026</time>
                </Text>
                <H2 size="sm">
                  <RouterLink v-slot="{ href, navigate }" to="/news/design-review-open-call" custom>
                    <Link :href="href" @click="navigate">Open call: put your service forward for a design review</Link>
                  </RouterLink>
                </H2>
                <Paragraph>
                  We are inviting delivery teams to put their services forward for a service design review.
                </Paragraph>
              </Stack>
            </article>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  </Container>
</template>

<script setup lang="ts">
import { Container, Divider, Grid, H1, H2, Link, Paragraph, Stack, Text } from '@ogcio/design-system-vue';
</script>
