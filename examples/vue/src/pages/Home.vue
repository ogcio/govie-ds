<template>
  <Container class="py-12 md:py-16">
    <Stack direction="column" :gap="12" align="stretch">
      <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="8">
        <Grid :size="{ base: 4, md: 8, lg: 7 }">
          <Stack direction="column" :gap="6">
            <Stack direction="column" :gap="2">
              <Text lang="ga" class="text-color-text-system-neutral-muted">An Roinn Rannpháirtíochta</Text>
              <H1 size="xl">Department of Engagement</H1>
            </Stack>
            <Paragraph size="lg">
              We help public bodies build digital services that people recognise, trust and can use without help, by
              bringing every department onto the Government of Ireland Design System.
            </Paragraph>
            <Stack direction="row" :gap="4" wrap>
              <RouterLink v-slot="{ href, navigate }" to="/services" custom>
                <LinkButton size="lg" :href="href" @click="navigate">Explore our services</LinkButton>
              </RouterLink>
              <RouterLink v-slot="{ href, navigate }" to="/design-system" custom>
                <LinkButton size="lg" variant="secondary" :href="href" @click="navigate">
                  About the Design System
                </LinkButton>
              </RouterLink>
            </Stack>
          </Stack>
        </Grid>

        <Grid :size="{ base: 4, md: 8, lg: 5 }">
          <Box class="p-6 rounded bg-color-surface-system-neutral-layer1">
            <Stack direction="column" :gap="6">
              <H2 size="sm">The Design System at a glance</H2>
              <dl class="grid grid-cols-2 gap-6">
                <div v-for="fact in facts" :key="fact.label" class="flex flex-col-reverse">
                  <dt>
                    <Text size="sm">{{ fact.label }}</Text>
                  </dt>
                  <dd class="text-4xl font-bold leading-tight text-color-text-tone-primary-flat-default">
                    {{ fact.value }}
                  </dd>
                </div>
              </dl>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <InsetText>
        <Paragraph>
          This is a demonstration website. The Department of Engagement is fictional: the site shows how a department
          website looks and works when it is built with the Government of Ireland
          <strong>Design System Vue.</strong>
        </Paragraph>
      </InsetText>

      <Box class="p-6 md:p-10 rounded bg-color-surface-system-neutral-layer1">
        <Stack direction="column" :gap="10" align="stretch">
          <Stack direction="column" :gap="4">
            <H2 size="lg">What the Design System gives your department</H2>
            <Paragraph size="lg">
              Every government website should look and work the same way, so that people can trust what they see and
              focus on the task they came to do.
            </Paragraph>
          </Stack>

          <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="6">
            <Grid v-for="benefit in benefits" :key="benefit.id" :size="{ base: 4, md: 4, lg: 4 }">
              <article class="h-full p-6 border-xs border-color-border-system-neutral-subtle rounded">
                <Stack direction="column" :gap="3" align="stretch" class="h-full">
                  <span class="text-color-icon-tone-primary-flat-default" aria-hidden="true">
                    <component :is="benefit.icon" :size="32" />
                  </span>
                  <H3 size="sm">{{ benefit.title }}</H3>
                  <Paragraph class="flex-1">{{ benefit.text }}</Paragraph>
                </Stack>
              </article>
            </Grid>
          </Grid>

          <RouterLink v-slot="{ href, navigate }" to="/design-system/benefits" custom>
            <Link :href="href" class="self-start inline-flex items-center gap-1 font-bold" @click="navigate">
              Benefits
              <ArrowRightIcon :size="20" />
            </Link>
          </RouterLink>
        </Stack>
      </Box>

      <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="10">
        <Grid :size="{ base: 4, md: 8, lg: 7 }">
          <Stack direction="column" :gap="6" align="stretch">
            <H2 size="lg">Services for public bodies</H2>
            <ul>
              <li class="py-4 border-b-xs border-color-border-system-neutral-muted first:pt-0">
                <Stack direction="column" :gap="1">
                  <H3 size="xs">
                    <RouterLink v-slot="{ href, navigate }" to="/services/onboarding" custom>
                      <Link :href="href" @click="navigate">Onboarding</Link>
                    </RouterLink>
                  </H3>
                  <Paragraph>
                    Onboarding gives your team everything it needs to start building with the Design System, with our
                    team alongside you for the first release.
                  </Paragraph>
                </Stack>
              </li>
              <li class="py-4 border-b-xs border-color-border-system-neutral-muted first:pt-0">
                <Stack direction="column" :gap="1">
                  <H3 size="xs">
                    <RouterLink v-slot="{ href, navigate }" to="/services/design-review" custom>
                      <Link :href="href" @click="navigate">Design reviews</Link>
                    </RouterLink>
                  </H3>
                  <Paragraph>
                    A design review checks that your service meets government design standards before it reaches the
                    public.
                  </Paragraph>
                </Stack>
              </li>
              <li class="py-4 border-b-xs border-color-border-system-neutral-muted first:pt-0">
                <Stack direction="column" :gap="1">
                  <H3 size="xs">
                    <RouterLink v-slot="{ href, navigate }" to="/services/accessibility-audit" custom>
                      <Link :href="href" @click="navigate">Accessibility audits</Link>
                    </RouterLink>
                  </H3>
                  <Paragraph>
                    Our accessibility specialists test your service with assistive technology and against WCAG 2.1 AA.
                  </Paragraph>
                </Stack>
              </li>
              <li class="py-4 border-b-xs border-color-border-system-neutral-muted first:pt-0">
                <Stack direction="column" :gap="1">
                  <H3 size="xs">
                    <RouterLink v-slot="{ href, navigate }" to="/services/training" custom>
                      <Link :href="href" @click="navigate">Training</Link>
                    </RouterLink>
                  </H3>
                  <Paragraph>
                    Practical training helps your team make the most of the Design System from day one.
                  </Paragraph>
                </Stack>
              </li>
              <li class="py-4 border-b-xs border-color-border-system-neutral-muted first:pt-0">
                <Stack direction="column" :gap="1">
                  <H3 size="xs">
                    <RouterLink v-slot="{ href, navigate }" to="/services/support" custom>
                      <Link :href="href" @click="navigate">Support</Link>
                    </RouterLink>
                  </H3>
                  <Paragraph>
                    Delivery teams can reach our team while they build, whatever stage the service is at.
                  </Paragraph>
                </Stack>
              </li>
            </ul>
            <RouterLink v-slot="{ href, navigate }" to="/services" custom>
              <Link :href="href" class="self-start inline-flex items-center gap-1 font-bold" @click="navigate">
                All services
                <ArrowRightIcon :size="20" />
              </Link>
            </RouterLink>
          </Stack>
        </Grid>

        <Grid :size="{ base: 4, md: 8, lg: 5 }">
          <Stack direction="column" :gap="6" align="stretch">
            <H2 size="lg">Latest news</H2>
            <article>
              <Stack direction="column" :gap="1">
                <Text size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-10-14">14 October 2026</time>
                </Text>
                <H3 size="xs">
                  <RouterLink v-slot="{ href, navigate }" to="/news/new-website-on-the-design-system" custom>
                    <Link :href="href" @click="navigate">
                      Department of Engagement launches its new website on the Design System
                    </Link>
                  </RouterLink>
                </H3>
              </Stack>
            </article>
            <article>
              <Stack direction="column" :gap="1">
                <Text size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-09-30">30 September 2026</time>
                </Text>
                <H3 size="xs">
                  <RouterLink v-slot="{ href, navigate }" to="/news/angular-library-joins-the-design-system" custom>
                    <Link :href="href" @click="navigate"> Angular component library joins HTML, React and Vue </Link>
                  </RouterLink>
                </H3>
              </Stack>
            </article>
            <article>
              <Stack direction="column" :gap="1">
                <Text size="sm" class="text-color-text-system-neutral-muted">
                  <time datetime="2026-09-12">12 September 2026</time>
                </Text>
                <H3 size="xs">
                  <RouterLink v-slot="{ href, navigate }" to="/news/accessibility-audits-for-every-department" custom>
                    <Link :href="href" @click="navigate"> Accessibility audits now available to every department </Link>
                  </RouterLink>
                </H3>
              </Stack>
            </article>
            <RouterLink v-slot="{ href, navigate }" to="/news" custom>
              <Link :href="href" class="self-start inline-flex items-center gap-1 font-bold" @click="navigate">
                All news
                <ArrowRightIcon :size="20" />
              </Link>
            </RouterLink>
          </Stack>
        </Grid>
      </Grid>

      <Box class="p-6 md:p-10 rounded bg-color-surface-system-primary-default text-color-text-tone-light-default">
        <Stack :direction="{ base: 'column', lg: 'row' }" :gap="8" justify="between">
          <Stack direction="column" :gap="4" class="max-w-prose">
            <H2 size="lg">Ready to move your service to the Design System?</H2>
            <Paragraph size="lg">
              Onboarding gives your team a guided start, from the first workshop to the first release.
            </Paragraph>
          </Stack>
          <RouterLink v-slot="{ href, navigate }" to="/services/onboarding" custom>
            <LinkButton size="lg" appearance="light" :href="href" @click="navigate">Start onboarding</LinkButton>
          </RouterLink>
        </Stack>
      </Box>
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import {
  Box,
  Container,
  Grid,
  H1,
  H2,
  H3,
  InsetText,
  Link,
  LinkButton,
  Paragraph,
  Stack,
  Text,
} from '@ogcio/design-system-vue';
import {
  AccessibilityIcon,
  AppsIcon,
  ArrowRightIcon,
  CandlestickChartIcon,
  CheckCircleIcon,
  SpaceDashboardIcon,
  SwapVerticalIcon,
} from '@ogcio/design-system-vue/icons';

const benefits = [
  {
    id: 'efficiency',
    icon: SpaceDashboardIcon,
    title: 'Efficiency',
    text: 'Start from a complete suite of components, patterns and guidelines instead of rebuilding the basics.',
  },
  {
    id: 'consistency',
    icon: AppsIcon,
    title: 'Consistency',
    text: 'Give people the same experience on every government website, so what they learn once works everywhere.',
  },
  {
    id: 'accessibility',
    icon: AccessibilityIcon,
    title: 'Accessibility',
    text: 'Meet WCAG 2.1 AA with components that are built and tested for people of all abilities.',
  },
  {
    id: 'performance',
    icon: CandlestickChartIcon,
    title: 'Performance',
    text: 'Deliver fast pages with optimised components and assets, even on slower connections.',
  },
  {
    id: 'responsive',
    icon: SwapVerticalIcon,
    title: 'Responsive',
    text: 'Serve people on phones, tablets and desktops with layouts that adapt to every screen.',
  },
  {
    id: 'compliance',
    icon: CheckCircleIcon,
    title: 'Compliance',
    text: 'Stay aligned with government standards on identity and accessibility.',
  },
];

const facts = [
  { value: '1', label: 'shared identity for government websites' },
  { value: '4', label: 'component libraries: HTML, React, Angular and Vue' },
  { value: 'AA', label: 'WCAG 2.1 accessibility as the baseline' },
  { value: '2', label: 'official languages, Irish and English, plus any other locale' },
];
</script>
