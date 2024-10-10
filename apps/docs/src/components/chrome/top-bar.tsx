'use client';
import { Header } from '@govie-ds/react';
import { useState } from 'react';
import { MainMenuConnected } from '../navigation/main-menu-connected';
import { MobileMenuConnected } from '../navigation/mobile-menu-connected';

export function TopBar() {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: review showing main menu on the home page
  return (
    <div>
      <Header title={'Design System'} />
      <MainMenuConnected />
      <MobileMenuConnected
        isOpen={isOpen}
        onOpenChanged={() => setIsOpen((isOpen) => !isOpen)}
      />
    </div>
  );
}
