'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MainMenuConnected } from '../navigation/main-menu-connected';
import { MobileMenuConnected } from '../navigation/mobile-menu-connected';
import { Header } from './header';

export function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // TODO: review showing main menu on the home page
  return (
    <div>
      <Header
        showMobileMenu={pathname === '/' ? false : true}
        onMobileMenuSelect={() => setIsOpen((isOpen) => !isOpen)}
      />
      <MainMenuConnected />
      <MobileMenuConnected
        isOpen={isOpen}
        onOpenChanged={() => setIsOpen((isOpen) => !isOpen)}
      />
    </div>
  );
}
