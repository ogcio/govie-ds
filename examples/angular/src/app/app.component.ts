import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DsButton, BoxButton } from "@ogcio/design-system-angular";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, DsButton, BoxButton],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "ogcio-demo";

  handleButtonClick(variant: string) {
    alert(`${variant} button clicked`);
  }
}
