<template>
  <div class="flex min-h-screen flex-col">
    <Header aria-label="Site header">
      <HeaderSection>
        <HeaderLogo>
          <LogoWhite :size="132" class="hidden md:block" />
          <LogoHarpWhite :size="32" class="block md:hidden" />
        </HeaderLogo>
        <HeaderTitle>Department of Engagement</HeaderTitle>
      </HeaderSection>
    </Header>

    <main class="flex-1 py-12">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Header, HeaderLogo, HeaderSection, HeaderTitle } from '@ogcio/design-system-vue';
import { LogoHarpWhite, LogoWhite } from '@ogcio/design-system-vue/logos';
</script>
