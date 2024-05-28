"use client";

import { MainMenu } from "./main-menu";
import { Container } from "../chrome/container";
import { useMainMenuItems } from "./use-main-menu-items";

export function MainMenuConnected() {
  const mainMenuItems = useMainMenuItems();

  return mainMenuItems.length === 0 ? null : (
    <Container>
      <MainMenu items={mainMenuItems} />
    </Container>
  );
}
