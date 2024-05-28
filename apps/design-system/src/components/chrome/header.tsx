import { Container } from "./container";
import { Logo } from "../logos/logo";
import { MenuIcon } from "../icons/menu-icon";
import { config } from "@/lib/config";

export type HeaderProps = {
  onMobileMenuSelect?: () => void;
};

export function Header({ onMobileMenuSelect = () => {} }: HeaderProps) {
  return (
    <div className="bg-emerald-800 border-b-lg border-gold-500">
      <Container>
        <div className="flex items-center py-xl gap-lg text-white">
          <button
            className="block sm:hidden"
            onClick={() => onMobileMenuSelect()}
          >
            <MenuIcon />
          </button>
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
