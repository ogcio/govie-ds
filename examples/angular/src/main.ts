import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

declare global {
  interface Window {
    GOVIEFrontend?: { initAll?: () => void };
  }
}

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    window.GOVIEFrontend?.initAll?.();
  })
  .catch((err) => console.error(err));
