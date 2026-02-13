'use client';

import {  Container, Heading, Paragraph, Stack } from '@ogcio/design-system-react';

// Import React SVG components
import {
  Check,
  ArrowBack,
  ArrowForward,
  Search,
  Menu,
  Home,
  Settings,
  Info,
  Warning,
  Error,
  Link,
  SocialLinkedin,
  SocialFacebook,
  SocialX,
} from '@ogcio/design-system-svgs/react/icons';

import {
  LogoHarp,
  LogoGoldWhite,
} from '@ogcio/design-system-svgs/react/logos';

import {
  FaviconDark,
  FaviconLight,
} from '@ogcio/design-system-svgs/react/favicons';

// Import HTML string utilities (framework-agnostic - works with Mitosis, vanilla JS, etc.)
import {
  getIconSvg,
  ICONS_MAP,
} from '@ogcio/design-system-svgs/icons';
import {
  getLogoSvg,
  
} from '@ogcio/design-system-svgs/logos';

export default function SvgTestPage() {
  return (
    <Container>
      <Stack direction="column" gap={8}>
        <Heading as="h1">SVG Package Test</Heading>

        {/* React Icon Components */}
        <section>
          <Heading as="h2">React Icon Components</Heading>
          <Paragraph>These are imported from @ogcio/design-system-svgs/react/icons</Paragraph>
          <Stack direction="row" gap={4} style={{ flexWrap: 'wrap', marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Check size={32} />
              <div>Check</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ArrowBack size={32} />
              <div>ArrowBack</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ArrowForward size={32} />
              <div>ArrowForward</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Search size={32} />
              <div>Search</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Menu size={32} />
              <div>Menu</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Home size={32} />
              <div>Home</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Settings size={32} />
              <div>Settings</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Info size={32} fill="#0070f3" />
              <div>Info (blue)</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Warning size={32} fill="#f5a623" />
              <div>Warning (yellow)</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Error size={32} fill="#e00" />
              <div>Error (red)</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link size={32} />
              <div>Link</div>
            </div>
          </Stack>
        </section>

        {/* Social Icons */}
        <section>
          <Heading as="h2">Social Icon Components</Heading>
          <Stack direction="row" gap={4} style={{ marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <SocialLinkedin size={32} />
              <div>LinkedIn</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <SocialFacebook size={32} />
              <div>Facebook</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <SocialX size={32} />
              <div>X</div>
            </div>
          </Stack>
        </section>

        {/* React Logo Components */}
        <section>
          <Heading as="h2">React Logo Components</Heading>
          <Paragraph>These are imported from @ogcio/design-system-svgs/react/logos</Paragraph>
          <Stack direction="row" gap={8} style={{ marginTop: '1rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <LogoHarp size={64} />
              <div>LogoHarp</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <LogoGoldWhite size={120} />
              <div>LogoGoldWhite</div>
            </div>
          </Stack>
        </section>

        {/* Favicon Components */}
        <section>
          <Heading as="h2">Favicon Components</Heading>
          <Stack direction="row" gap={4} style={{ marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <FaviconDark size={48} />
              <div>Dark</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaviconLight size={48} />
              <div>Light</div>
            </div>
          </Stack>
        </section>

        {/* HTML String Exports - for Mitosis, HTML package */}
        <section>
          <Heading as="h2">HTML String Exports (Framework-Agnostic)</Heading>
          <Paragraph>
            These use getIconSvg() and getLogoSvg() - ideal for Mitosis, or the HTML package
          </Paragraph>

          <Heading as="h3" style={{ marginTop: '1rem' }}>Icons via getIconSvg()</Heading>
          <Stack direction="row" gap={4} style={{ marginTop: '0.5rem' }}>
            <div
              style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{
                __html: getIconSvg('check', { size: 32 }),
              }}
            />
            <div
              style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{
                __html: getIconSvg('search', { size: 32, fill: '#0070f3' }),
              }}
            />
            <div
              style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{
                __html: getIconSvg('home', { size: 32, className: 'custom-icon' }),
              }}
            />
            <div
              style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{
                __html: getIconSvg('warning', { size: 32, fill: '#f5a623', ariaLabel: 'Warning icon' }),
              }}
            />
          </Stack>

          <Heading as="h3" style={{ marginTop: '1rem' }}>Logos via getLogoSvg()</Heading>
          <Stack direction="row" gap={4} style={{ marginTop: '0.5rem', alignItems: 'center' }}>
            <div
              style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{
                __html: getLogoSvg('logo-harp', { size: 64 }),
              }}
            />
            <div
              style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{
                __html: getLogoSvg('logo-gold-white', { size: 120 }),
              }}
            />
          </Stack>

          <Heading as="h3" style={{ marginTop: '1rem' }}>Raw SVG via ICONS_MAP / LOGOS_MAP</Heading>
          <Paragraph>Direct access to raw SVG strings (original size, no transformations)</Paragraph>
          <Stack direction="row" gap={4} style={{ marginTop: '0.5rem' }}>
            <div
              style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{
                __html: ICONS_MAP['info'],
              }}
            />
            <div
              style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{
                __html: getLogoSvg('figma', { size: 120 }),
              }}
            />
          </Stack>
        </section>
      </Stack>
    </Container>
  );
}
