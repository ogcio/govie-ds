import { Container } from "./container";
import { Logo } from "../logos/logo";
import { MenuIcon } from "../icons/menu-icon";

export type HeaderProps = {
  onMobileMenuSelect?: () => void;
};

export function Header({ onMobileMenuSelect = () => {} }: HeaderProps) {
  return (
    <div className="bg-emerald-800 border-b-lg border-gold-500">
      <Container>
        <div className="flex items-center py-lg gap-lg text-white">
          <button
            className="block sm:hidden"
            onClick={() => onMobileMenuSelect()}
          >
            <MenuIcon />
          </button>
          <Logo />
        </div>
      </Container>
    </div>
  );
}
