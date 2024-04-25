import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from './cart.service';
import { inject } from '@angular/core';
import { cartActions } from './actions';
import { catchError, map, mergeMap, of, switchMap, timer } from 'rxjs';
import { cartDetailsActions } from './cart-details/actions';
import { productDetailsActions } from '../product/product-details/actions';

const REFRESH_CART_ITEMS_INTERVAL_MS = 10000;

export const init = createEffect(() => timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
  map(() => cartActions.timerTick()),
), { functional: true });

export const addProductToCart = createEffect(() => {
  const cartService = inject(CartService);
  return inject(Actions).pipe(
    ofType(productDetailsActions.addToCart),
    mergeMap(({ productId }) => cartService.addProduct(productId).pipe(
      map(() => cartActions.addToCartSuccess()),
      catchError(() => of(cartActions.addToCartError({ productId, errorMessage: 'Failed to add item to cart' })))
    )),
  )
}, { functional: true })

export const fetchCartItems = createEffect(() => {
  const cartService = inject(CartService);
  return inject(Actions).pipe(
    ofType(cartActions.timerTick, cartDetailsActions.pageOpened, cartDetailsActions.purchaseSuccess),
    switchMap(() => cartService.getCartProducts().pipe(
      map(cartItems => cartActions.fetchCartItemsSuccess({ cartItems })),
      catchError(() => of(cartActions.fetchCartItemsError({ errorMessage: 'Error fetching cart items' }))),
    )),
  );
}, { functional: true });
