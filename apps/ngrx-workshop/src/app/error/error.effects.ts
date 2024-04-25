import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { productApiActions } from '../product/actions';
import { tap } from 'rxjs';
import { cartActions } from '../cart/actions';

export const handleFetchErrors = createEffect((action$ = inject(Actions), snackBar = inject(MatSnackBar)) => action$.pipe(
  ofType(
    cartActions.fetchCartItemsError,
    productApiActions.productsFetchError,
  ),
  tap(({ errorMessage }) => snackBar.open(errorMessage, 'Error', {
    duration: 2500,
  })),
), { dispatch: false, functional: true });
