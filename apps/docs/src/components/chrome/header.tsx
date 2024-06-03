import { Container } from './container';
import { Logo } from '../logos/logo';
import { MenuIcon } from '../icons/menu-icon';
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
    <div className="bg-emerald-800 border-b-lg border-gold-500">
      <Container>
        <div className="flex items-center py-xl gap-lg text-white">
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
            <Logo />
          </a>
        </div>
      </Container>
    </div>
  );
}
