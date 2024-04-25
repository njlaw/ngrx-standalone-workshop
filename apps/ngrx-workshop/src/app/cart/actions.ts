import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '@angular-monorepo/api-interfaces';

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    addToCartSuccess: emptyProps(),
    addToCartError: props<{ productId: string, errorMessage: string }>(),
    timerTick: emptyProps(),
    fetchCartItemsSuccess: props<{ cartItems: CartItem[] }>(),
    fetchCartItemsError: props<{ errorMessage: string }>(),
  },
});
