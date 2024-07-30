import { MenuIcon } from '../icons/menu-icon';
import { GovIELogo } from '../logos/govie-logo';
import { Container } from './container';
import { config } from '@/lib/config';

export type HeaderProps = {
  showMobileMenu: boolean;
  onMobileMenuSelect?: () => void;
};

export function Header({
  showMobileMenu,
  onMobileMenuSelect = () => {},
}: HeaderProps) {
  return (
    <div className="bg-emerald-800">
      <Container>
        <div className="flex items-center py-lg gap-lg text-white">
          {showMobileMenu ? (
            <button
              className="block sm:hidden"
              onClick={() => onMobileMenuSelect()}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          ) : null}
          <div className="flex items-center gap-3xl">
            <a
              className="border-b-lg border-emerald-800 hover:border-white"
              href={config.buildingBlocksHomeUrl}
              aria-label="Home"
            >
              <GovIELogo />
            </a>
            <p className="text-xl mb-0">Design System</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
