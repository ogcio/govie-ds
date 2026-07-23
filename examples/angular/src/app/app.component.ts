import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '@ogcio/design-system-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ogcio-demo';
}
