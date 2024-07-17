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
            >
              <MenuIcon />
            </button>
          ) : null}
          <a
            className="border-b-lg border-emerald-800 hover:border-white"
            href={config.buildingBlocksHomeUrl}
          >
            <GovIELogo />
          </a>
        </div>
      </Container>
    </div>
  );
}
