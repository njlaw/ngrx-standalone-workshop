import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from './product.service';
import { productsOpened } from './product-list/actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { productApiActions } from './actions';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
  ) {}

  fetchProducts$ = createEffect(() => this.actions$.pipe(
      ofType(productsOpened),
      exhaustMap(() => this.productService.getProducts().pipe(
        map(products => productApiActions.productsFetchSuccess({ products })),
        catchError(() => of(productApiActions.productsFetchError({ errorMessage: 'Error fetching products' }))),
      ))
    )
  );
}
