import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { productApiActions } from '../product/actions';
import { tap } from 'rxjs';
import { cartActions } from '../cart/actions';

export const handleFetchErrors = createEffect((action$ = inject(Actions), snackBar = inject(MatSnackBar)) => action$.pipe(
  ofType(
    cartActions.addToCartError,
    cartActions.fetchCartItemsError,
    productApiActions.productsFetchError,
    productApiActions.singleProductFetchedError,
  ),
  tap(({ errorMessage }) => snackBar.open(errorMessage, 'Error', {
    duration: 2500,
  })),
), { dispatch: false, functional: true });
