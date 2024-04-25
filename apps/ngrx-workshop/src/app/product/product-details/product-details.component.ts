import { AsyncPipe, CommonModule, CurrencyPipe, Location } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Rating } from "@angular-monorepo/api-interfaces";
import { BehaviorSubject, filter, map, switchMap } from "rxjs";

import { CartService } from "../../cart/cart.service";
import { RatingService } from "../rating.service";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { StarsComponent } from "../../common/stars/stars.component";
import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { MatCardModule } from "@angular/material/card";
import { ReviewsComponent } from "./reviews/reviews.component";
import { Store } from '@ngrx/store';
import { productDetailsActions } from './actions';
import { selectCurrentProduct, selectCurrentProductId } from '../product.selectors';

@Component({
  selector: "ngrx-workshop-product-details",
  standalone: true,
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    StarsComponent,
    MatProgressBarModule,
    SpinnerComponent,
    MatCardModule,
    ReviewsComponent,
    AsyncPipe,
    CurrencyPipe,
  ],
})
export class ProductDetailsComponent {
  readonly productId$ = this.store.select(selectCurrentProductId).pipe(
    filter((id): id is string => id != null),
  );

  readonly product$ = this.store.select(selectCurrentProduct);

  protected customerRating$ = new BehaviorSubject<number | undefined>(
    undefined
  );

  constructor(
    private readonly store: Store,
    private readonly ratingService: RatingService,
    private readonly cartService: CartService,
    private readonly location: Location
  ) {
    this.store.dispatch(productDetailsActions.pageOpened());
    this.productId$
      .pipe(switchMap((id) => this.ratingService.getRating(id)))
      .subscribe((productRating) =>
        this.customerRating$.next(productRating && productRating.rating)
      );
  }

  setRating(productId: string, rating: Rating) {
    this.ratingService
      .setRating({ productId, rating })
      .pipe(
        map((arr) =>
          arr.find((productRating) => productId === productRating.productId)
        ),
        filter(
          (productRating): productRating is NonNullable<typeof productRating> =>
            productRating != null
        ),
        map((productRating) => productRating.rating)
      )
      .subscribe((newRating) => this.customerRating$.next(newRating));
  }

  addToCart(productId: string) {
    this.store.dispatch(productDetailsActions.addToCart({ productId }));
    this.cartService.addProduct(productId);
  }

  back() {
    this.location.back();
  }
}
