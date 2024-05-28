"use client";
import { useState } from "react";
import { Header } from "./header";
import { MainMenuConnected } from "../navigation/main-menu-connected";
import { MobileMenuConnected } from "../navigation/mobile-menu-connected";

export function TopBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Header onMobileMenuSelect={() => setIsOpen((isOpen) => !isOpen)} />
      <MainMenuConnected />
      <MobileMenuConnected
        isOpen={isOpen}
        onOpenChanged={() => setIsOpen((isOpen) => !isOpen)}
      />
    </div>
  );
}
