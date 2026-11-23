<template>
  <Footer aria-label="Site footer">
    <FooterSection variant="primary">
      <Stack direction="column" :gap="8" align="stretch">
        <Grid container :columns="{ base: 4, md: 8, lg: 12 }" :gap="6">
          <Grid :size="{ base: 4, md: 4, lg: 3 }">
            <Stack direction="column" :gap="4" align="stretch">
              <H2 size="xs">
                <RouterLink v-slot="{ href, navigate }" to="/services" custom>
                  <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Services</Link>
                </RouterLink>
              </H2>
              <Divider />
              <ul class="space-y-2">
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/services/onboarding" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Onboarding</Link>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/services/design-review" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Design reviews</Link>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/services/accessibility-audit" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate"
                      >Accessibility audits</Link
                    >
                  </RouterLink>
                </li>
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/services/training" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Training</Link>
                  </RouterLink>
                </li>
              </ul>
            </Stack>
          </Grid>
          <Grid :size="{ base: 4, md: 4, lg: 3 }">
            <Stack direction="column" :gap="4" align="stretch">
              <H2 size="xs">
                <RouterLink v-slot="{ href, navigate }" to="/design-system" custom>
                  <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Design System</Link>
                </RouterLink>
              </H2>
              <Divider />
              <ul class="space-y-2">
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/design-system/principles" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Principles</Link>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/design-system/benefits" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Benefits</Link>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/design-system/frameworks" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate"
                      >Tools and frameworks</Link
                    >
                  </RouterLink>
                </li>
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/design-system/adoption" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Adoption</Link>
                  </RouterLink>
                </li>
              </ul>
            </Stack>
          </Grid>
          <Grid :size="{ base: 4, md: 4, lg: 3 }">
            <Stack direction="column" :gap="4" align="stretch">
              <H2 size="xs">
                <RouterLink v-slot="{ href, navigate }" to="/about" custom>
                  <Link variant="inline" appearance="inherit" :href="href" @click="navigate">About us</Link>
                </RouterLink>
              </H2>
              <Divider />
              <ul class="space-y-2">
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/about/strategy" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Strategy</Link>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/about/structure" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Structure</Link>
                  </RouterLink>
                </li>
              </ul>
            </Stack>
          </Grid>
          <Grid :size="{ base: 4, md: 4, lg: 3 }">
            <Stack direction="column" :gap="4" align="stretch">
              <H2 size="xs">
                <RouterLink v-slot="{ href, navigate }" to="/help" custom>
                  <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Help</Link>
                </RouterLink>
              </H2>
              <Divider />
              <ul class="space-y-2">
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/help/accessibility" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate"
                      >Accessibility statement</Link
                    >
                  </RouterLink>
                </li>
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/help/privacy" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Privacy notice</Link>
                  </RouterLink>
                </li>
                <li>
                  <RouterLink v-slot="{ href, navigate }" to="/help/cookies" custom>
                    <Link variant="inline" appearance="inherit" :href="href" @click="navigate">Cookies</Link>
                  </RouterLink>
                </li>
              </ul>
            </Stack>
          </Grid>
        </Grid>

        <Divider />

        <Stack :direction="{ base: 'column', md: 'row' }" :gap="6" justify="between">
          <Stack direction="column" :gap="4">
            <RouterLink v-slot="{ href, navigate }" to="/contact" custom>
              <Link variant="inline" appearance="inherit" :href="href" class="self-start" @click="navigate">
                Contact
              </Link>
            </RouterLink>
            <Paragraph size="sm">
              The Department of Engagement is a fictional department. This website demonstrates the Government of
              Ireland Design System for Vue.
            </Paragraph>
          </Stack>
          <FooterLogo>
            <LogoGoldGreen :size="181" label="Government of Ireland" />
          </FooterLogo>
        </Stack>
      </Stack>
    </FooterSection>

    <FooterSection variant="utility">
      <Stack direction="row" justify="center">
        <Text size="sm" class="text-center">
          © {{ year }} Department of Engagement. Built with the Government of Ireland Design System.
        </Text>
      </Stack>
    </FooterSection>
  </Footer>
</template>

<script setup lang="ts">
import {
  Divider,
  Footer,
  FooterLogo,
  FooterSection,
  Grid,
  H2,
  Link,
  Paragraph,
  Stack,
  Text,
} from '@ogcio/design-system-vue';
import { LogoGoldGreen } from '@ogcio/design-system-vue/logos';

const year = new Date().getFullYear();
</script>
