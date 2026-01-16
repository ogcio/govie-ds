import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { defineCustomElements } from '@ogcio/govie-component-library/loader';
import {
  GovieButton,
  GovieParagraph,
} from '@ogcio/govie-angular/dist/component-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GovieButton, GovieParagraph],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ogcio-demo';

  ngOnInit(): void {
    defineCustomElements();
  }
}
