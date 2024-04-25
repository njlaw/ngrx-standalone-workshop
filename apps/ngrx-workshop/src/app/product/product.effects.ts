import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from './product.service';
import { productsOpened } from './product-list/actions';
import { catchError, exhaustMap, filter, from, map, mergeMap, of, switchMap } from 'rxjs';
import { productApiActions } from './actions';
import { productDetailsActions } from './product-details/actions';
import { selectCurrentProductId } from './product.selectors';
import { Store } from '@ngrx/store';
import { cartActions } from '../cart/actions';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly store: Store,
  ) {
  }

  fetchProducts$ = createEffect(() => this.actions$.pipe(
      ofType(productsOpened),
      exhaustMap(() => this.productService.getProducts().pipe(
        map(products => productApiActions.productsFetchSuccess({ products })),
        catchError(() => of(productApiActions.productsFetchError({ errorMessage: 'Error fetching products' }))),
      ))
    )
  );

  fetchCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailsActions.pageOpened),
      concatLatestFrom(() => this.store.select(selectCurrentProductId).pipe(
        filter((id): id is string => id != null),
      )),
      switchMap(([ , id ]) => {
        return this.productService.getProduct(id).pipe(
          map((product) => productApiActions.singleProductFetchedSuccess({ product })),
          catchError(() => of(productApiActions.singleProductFetchedError({ errorMessage: `Failed to fetch product: ${ id }` }))),
        );
      }),
    )
  });

  fetchCartDetailsProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cartActions.fetchCartItemsSuccess),
      switchMap(({ cartItems }) =>
        from(cartItems).pipe(
          mergeMap(({ productId }) =>
            this.productService.getProduct(productId).pipe(
              map((product) => productApiActions.singleProductFetchedSuccess({ product })),
              catchError(() => of(productApiActions.singleProductFetchedError({
                errorMessage: 'Error Fetching Single Product',
              }))),
            )
          ),
        )
      ),
    );
  });
}
