import { inject, provideAppInitializer } from '@angular/core';
import { Location } from '@angular/common';
import { provideRouter, withHashLocation } from '@angular/router';
import { applicationConfig } from '@storybook/angular-vite';

export function withRouter(paths: string[], { initialUrl }: { initialUrl?: string } = {}) {
  return applicationConfig({
    providers: [
      provideRouter(
        [...paths, '**'].map((path) => ({ path, children: [] })),
        withHashLocation(),
      ),
      ...(initialUrl ? [provideAppInitializer(() => inject(Location).replaceState(initialUrl))] : []),
    ],
  });
}
