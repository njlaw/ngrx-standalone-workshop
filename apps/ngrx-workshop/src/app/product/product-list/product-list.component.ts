import { Component, OnInit } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";

import { Rating } from "@angular-monorepo/api-interfaces";
import { RatingService } from "../rating.service";

import { ProductModel } from "../../model/product";
import { StarsComponent } from "../../common/stars/stars.component";
import { SpinnerComponent } from "../../common/spinner/spinner.component";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { AsyncPipe, CommonModule } from "@angular/common";
import { createSelector, Store } from '@ngrx/store';
import { selectProducts } from '../product.selectors';
import * as actions from './actions';
import { productFeature } from '../product.reducer';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const selectProductListVm = createSelector({
  products: selectProducts,
  requestStatus: productFeature.selectProductsRequestStatus,
});

@Component({
  selector: "ngrx-workshop-home",
  standalone: true,
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  imports: [
    CommonModule,
    MatCardModule,
    StarsComponent,
    RouterLink,
    SpinnerComponent,
    AsyncPipe,
    MatProgressBarModule,
  ],
})
export class ProductListComponent implements OnInit {
  protected readonly productListVm$ = this.store.select(selectProductListVm);
  customerRatings$?: Observable<{ [productId: string]: Rating }>;

  constructor(
    private readonly store: Store,
    private readonly ratingService: RatingService
  ) {}

  ngOnInit() {
    this.store.dispatch(actions.productsOpened());

    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map((ratingsArray) =>
        // Convert from Array to Indexable.
        ratingsArray.reduce(
          (acc: { [productId: string]: Rating }, ratingItem) => {
            acc[ratingItem.productId] = ratingItem.rating;
            return acc;
          },
          {}
        )
      ),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }

  protected identifyProduct(_index: number, item: ProductModel) {
    return item.id;
  }
}
