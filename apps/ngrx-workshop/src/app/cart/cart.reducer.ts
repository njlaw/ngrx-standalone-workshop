import { createReducer, on } from '@ngrx/store';
import { productDetailsActions } from '../product/product-details/actions';
import { CartItem } from '@angular-monorepo/api-interfaces';
import { cartActions } from './actions';

export const CART_FEATURE_KEY = 'cart';

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartReducer = createReducer(
  initialState,
  on(productDetailsActions.addToCard, (state, { productId }) => {
    const cartItemsClone = [ ...state.cartItems];
    const cartItemIndex = cartItemsClone.findIndex(cartItem => cartItem.productId === productId);

    if (cartItemIndex === -1) {
      cartItemsClone.push({
        productId,
        quantity: 1,
      });
    } else {
      cartItemsClone.splice(cartItemIndex, 1, {
        productId,
        quantity: cartItemsClone[cartItemIndex].quantity + 1,
      });
    }

    return {
      ...state,
      cartItems: cartItemsClone,
    };
  }),
  on(cartActions.fetchCartItemsSuccess, (state, { cartItems }) => ({
    ...state,
    cartItems: [...cartItems],
  })),
)
