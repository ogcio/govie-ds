import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GiBox } from '@ogcio/design-system-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GiBox],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ogcio-demo';
}
