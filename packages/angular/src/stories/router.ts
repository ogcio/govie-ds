import { inject, provideAppInitializer } from '@angular/core';
import { Location, PlatformLocation } from '@angular/common';
import { provideRouter, withHashLocation } from '@angular/router';
import { applicationConfig } from '@storybook/angular-vite';

import { MockPlatformLocation } from '@angular/common/testing';

export function withRouter(paths: string[], { initialUrl }: { initialUrl?: string } = {}) {
  return applicationConfig({
    providers: [
      provideRouter(
        [...paths, '**'].map((path) => ({ path, children: [] })),
        withHashLocation(),
      ),
      { provide: PlatformLocation, useClass: MockPlatformLocation },
      ...(initialUrl ? [provideAppInitializer(() => inject(Location).replaceState(initialUrl))] : []),
    ],
  });
}
