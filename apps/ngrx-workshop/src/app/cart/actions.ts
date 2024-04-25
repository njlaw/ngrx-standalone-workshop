import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '@angular-monorepo/api-interfaces';

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    timerTick: emptyProps(),
    fetchCartItemsSuccess: props<{ cartItems: CartItem[] }>(),
    fetchCartItemsError: props<{ errorMessage: string }>(),
  },
});
