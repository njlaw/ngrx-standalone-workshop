import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CartIconComponent } from "./cart/cart-icon/cart-icon.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Store } from '@ngrx/store';
import { selectRouteParams } from './router/router.selectors';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: "ngrx-workshop-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [MatToolbarModule, RouterOutlet, RouterLink, CartIconComponent, AsyncPipe, JsonPipe],
})
export class AppComponent {
  protected readonly routeParams$ = this.store.select(selectRouteParams);
  constructor(private readonly store: Store) {}
}
