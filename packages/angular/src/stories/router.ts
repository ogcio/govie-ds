import { provideRouter, withHashLocation } from '@angular/router';
import { applicationConfig } from '@storybook/angular-vite';

export function withRouter(paths: string[]) {
  return applicationConfig({
    providers: [
      provideRouter(
        [...paths, '**'].map((path) => ({ path, children: [] })),
        withHashLocation(),
      ),
    ],
  });
}
