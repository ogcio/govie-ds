'use client';

import {
  Container,
  Heading,
  Paragraph,
  Stack,
  Icon,
} from '@ogcio/design-system-react';

export default function SvgTestPage() {
  const iconExamples = [
    'check',
    'search',
    'home',
    'settings',
    'info',
    'warning',
    'error',
    'menu',
    'close',
    'arrow_back',
    'arrow_forward',
  ] as const;

  const socialIcons = [
    'social_bluesky',
    'social_facebook',
    'social_instagram',
    'social_linkedin',
    'social_threads',
    'social_tiktok',
    'social_x',
    'social_youtube',
  ] as const;

  return (
    <Container>
      <Stack direction="column" gap={8}>
        <Heading as="h1">Icon Component Test</Heading>

        {/* Basic Icons */}
        <section>
          <Heading as="h2">Basic Icons</Heading>
          <Paragraph>
            Using the Icon component from @ogcio/design-system-react
          </Paragraph>

          <Stack direction="row" gap={4} style={{ flexWrap: 'wrap', marginTop: '1rem' }}>
            {iconExamples.map((iconName) => (
              <div key={iconName} style={{ textAlign: 'center' }}>
                <Icon icon={iconName} size="lg" />
                <div style={{ fontSize: '0.75rem' }}>{iconName}</div>
              </div>
            ))}
          </Stack>
        </section>

        {/* Different Sizes */}
        <section>
          <Heading as="h2">Icon Sizes</Heading>
          <Stack direction="row" gap={4} style={{ alignItems: 'center', marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Icon icon="home" size="sm" />
              <div style={{ fontSize: '0.75rem' }}>sm (16px)</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Icon icon="home" size="md" />
              <div style={{ fontSize: '0.75rem' }}>md (24px)</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Icon icon="home" size="lg" />
              <div style={{ fontSize: '0.75rem' }}>lg (32px)</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Icon icon="home" size="xl" />
              <div style={{ fontSize: '0.75rem' }}>xl (48px)</div>
            </div>
          </Stack>
        </section>

        {/* Disabled State */}
        <section>
          <Heading as="h2">Disabled State</Heading>
          <Stack direction="row" gap={4} style={{ alignItems: 'center', marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Icon icon="check" size="lg" />
              <div style={{ fontSize: '0.75rem' }}>Normal</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Icon icon="check" size="lg" disabled />
              <div style={{ fontSize: '0.75rem' }}>Disabled</div>
            </div>
          </Stack>
        </section>

        {/* Social Icons */}
        <section>
          <Heading as="h2">Social Icons</Heading>
          <Stack direction="row" gap={4} style={{ flexWrap: 'wrap', marginTop: '1rem' }}>
            {socialIcons.map((iconName) => (
              <div key={iconName} style={{ textAlign: 'center' }}>
                <Icon icon={iconName} size="lg" />
                <div style={{ fontSize: '0.75rem' }}>{iconName.replace('social_', '')}</div>
              </div>
            ))}
          </Stack>
        </section>

        {/* Placeholder Icon */}
        <section>
          <Heading as="h2">Placeholder Icon</Heading>
          <Stack direction="row" gap={4} style={{ marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Icon icon="placeholder" size="lg" />
              <div style={{ fontSize: '0.75rem' }}>placeholder</div>
            </div>
          </Stack>
        </section>
      </Stack>
    </Container>
  );
}
