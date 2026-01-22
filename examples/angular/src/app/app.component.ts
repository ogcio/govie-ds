import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  GovieButton,
  GovieParagraph,
  GovieBoxButton,
} from '@ogcio/govie-angular/dist/component-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GovieButton, GovieParagraph, GovieBoxButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'ogcio-demo';

  ngOnInit(): void {}

  handleButtonClick(variant: string) {
    alert(`${variant} button clicked`);
  }
}
