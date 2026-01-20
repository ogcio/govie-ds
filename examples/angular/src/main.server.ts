import {
  bootstrapApplication,
  type BootstrapContext,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

export default (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, appConfig, context);
