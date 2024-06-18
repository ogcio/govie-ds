'use client';

import { Container } from '../chrome/container';
import { MainMenu } from './main-menu';
import { useMainMenuItems } from './use-main-menu-items';

export function MainMenuConnected() {
  const mainMenuItems = useMainMenuItems();

  return mainMenuItems.length === 0 ? null : (
    <Container>
      <MainMenu items={mainMenuItems} />
    </Container>
  );
}
