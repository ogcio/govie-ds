<template>
  <Container class="py-12 md:py-16">
    <Stack direction="column" :gap="4" class="max-w-prose">
      <H1 size="lg">Page not found</H1>
      <Paragraph>If you typed the web address, check it is correct.</Paragraph>
      <Paragraph>If you pasted the web address, check you copied the entire address.</Paragraph>
      <Paragraph>
        You can go to the
        <RouterLink v-slot="{ href, navigate }" to="/" custom>
          <Link :href="href" @click="navigate">homepage</Link>
        </RouterLink>
        or
        <RouterLink v-slot="{ href, navigate }" to="/contact" custom>
          <Link :href="href" @click="navigate">contact us</Link>
        </RouterLink>
        if you need help.
      </Paragraph>
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import { Container, H1, Link, Paragraph, Stack } from '@ogcio/design-system-vue';
</script>
