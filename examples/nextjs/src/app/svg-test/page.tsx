'use client';

import { Container, Heading, Paragraph, Stack } from '@ogcio/design-system-react';

// Import React SVG components (still available for React apps)
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

// Import sprite utilities (framework-agnostic - works with HTML, Mitosis, vanilla JS, etc.)
import {
  getIconUse,
  ICONS_NAMES,
  ICONS_SPRITE,
  type IconName,
} from '@ogcio/design-system-svgs/icons';

import {
  getLogoUse,
  LOGOS_SPRITE,
} from '@ogcio/design-system-svgs/logos';

export default function SvgTestPage() {
  return (
    <Container>
      <Stack direction="column" gap={8}>
        <Heading as="h1">SVG Package Test</Heading>

        {/* Inline the sprite SVGs - this only needs to be done once per page */}
        <div dangerouslySetInnerHTML={{ __html: ICONS_SPRITE }} />
        <div dangerouslySetInnerHTML={{ __html: LOGOS_SPRITE }} />

        {/* Sprite-based Icons */}
        <section>
          <Heading as="h2">Sprite-based Icons (Recommended)</Heading>
          <Paragraph>
            These use SVG sprites with &lt;use href=&quot;#icon-name&quot;&gt;. No JS bundle bloat,
            native browser rendering, excellent caching.
          </Paragraph>

          <Heading as="h3" style={{ marginTop: '1rem' }}>Using getIconUse() helper</Heading>
          <Stack direction="row" gap={4} style={{ flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <span dangerouslySetInnerHTML={{ __html: getIconUse('check', { size: 32 }) }} />
              <div>check</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span dangerouslySetInnerHTML={{ __html: getIconUse('search', { size: 32 }) }} />
              <div>search</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span dangerouslySetInnerHTML={{ __html: getIconUse('home', { size: 32 }) }} />
              <div>home</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span dangerouslySetInnerHTML={{ __html: getIconUse('warning', { size: 32, ariaLabel: 'Warning' }) }} />
              <div>warning</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span dangerouslySetInnerHTML={{ __html: getIconUse('error', { size: 32 }) }} />
              <div>error</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span dangerouslySetInnerHTML={{ __html: getIconUse('info', { size: 32 }) }} />
              <div>info</div>
            </div>
          </Stack>

          <Heading as="h3" style={{ marginTop: '1rem' }}>Native SVG use (pure HTML)</Heading>
          <Paragraph>Styling via CSS currentColor - inherits text color</Paragraph>
          <Stack direction="row" gap={4} style={{ flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <div style={{ textAlign: 'center', color: '#0070f3' }}>
              <svg className="gi-icon" width="32" height="32" aria-hidden="true" focusable="false">
                <use href="#check" />
              </svg>
              <div>blue</div>
            </div>
            <div style={{ textAlign: 'center', color: '#e00' }}>
              <svg className="gi-icon" width="32" height="32" aria-hidden="true" focusable="false">
                <use href="#error" />
              </svg>
              <div>red</div>
            </div>
            <div style={{ textAlign: 'center', color: '#f5a623' }}>
              <svg className="gi-icon" width="32" height="32" aria-hidden="true" focusable="false">
                <use href="#warning" />
              </svg>
              <div>orange</div>
            </div>
            <div style={{ textAlign: 'center', color: '#22c55e' }}>
              <svg className="gi-icon" width="32" height="32" aria-hidden="true" focusable="false">
                <use href="#check_circle" />
              </svg>
              <div>green</div>
            </div>
          </Stack>

          <Heading as="h3" style={{ marginTop: '1rem' }}>Different sizes</Heading>
          <Stack direction="row" gap={4} style={{ alignItems: 'center', marginTop: '0.5rem' }}>
            <svg className="gi-icon" width="16" height="16" aria-hidden="true" focusable="false">
              <use href="#home" />
            </svg>
            <svg className="gi-icon" width="24" height="24" aria-hidden="true" focusable="false">
              <use href="#home" />
            </svg>
            <svg className="gi-icon" width="32" height="32" aria-hidden="true" focusable="false">
              <use href="#home" />
            </svg>
            <svg className="gi-icon" width="48" height="48" aria-hidden="true" focusable="false">
              <use href="#home" />
            </svg>
            <svg className="gi-icon" width="64" height="64" aria-hidden="true" focusable="false">
              <use href="#home" />
            </svg>
          </Stack>
        </section>

        {/* Social Icons via Sprite */}
        <section>
          <Heading as="h2">Social Icons (Sprite)</Heading>
          <Stack direction="row" gap={4} style={{ marginTop: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <svg className="gi-icon" width="32" height="32" aria-hidden="true" focusable="false">
                <use href="#social_linkedin" />
              </svg>
              <div>LinkedIn</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <svg className="gi-icon" width="32" height="32" aria-hidden="true" focusable="false">
                <use href="#social_facebook" />
              </svg>
              <div>Facebook</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <svg className="gi-icon" width="32" height="32" aria-hidden="true" focusable="false">
                <use href="#social_x" />
              </svg>
              <div>X</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <svg className="gi-icon" width="32" height="32" aria-hidden="true" focusable="false">
                <use href="#social_youtube" />
              </svg>
              <div>YouTube</div>
            </div>
          </Stack>
        </section>

        {/* Logos via Sprite */}
        <section>
          <Heading as="h2">Logos (Sprite)</Heading>
          <Stack direction="row" gap={8} style={{ marginTop: '1rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <svg className="gi-logo" width="64" height="64" aria-hidden="true" focusable="false">
                <use href="#logo-harp" />
              </svg>
              <div>logo-harp</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span dangerouslySetInnerHTML={{ __html: getLogoUse('logo-gold-white', { size: 120 }) }} />
              <div>logo-gold-white</div>
            </div>
          </Stack>
        </section>

        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #ccc' }} />

        {/* React Icon Components */}
        <section>
          <Heading as="h2">React Icon Components</Heading>
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
              <div>Warning</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Error size={32} fill="#e00" />
              <div>Error</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link size={32} />
              <div>Link</div>
            </div>
          </Stack>
        </section>

        {/* React Social Icons */}
        <section>
          <Heading as="h2">Social Icon Components (Legacy)</Heading>
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
          <Heading as="h2">React Logo Components (Legacy)</Heading>
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

        {/* Available Icons List */}
        <section>
          <Heading as="h2">All Available Icons ({ICONS_NAMES.length})</Heading>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            {ICONS_NAMES.map((name: IconName) => (
              <div key={name} style={{ fontSize: '0.75rem' }}>
                <svg className="gi-icon" width="24" height="24" aria-hidden="true" focusable="false">
                  <use href={`#${name}`} />
                </svg>
                <div style={{ wordBreak: 'break-all' }}>{name}</div>
              </div>
            ))}
          </div>
        </section>
      </Stack>
    </Container>
  );
}
